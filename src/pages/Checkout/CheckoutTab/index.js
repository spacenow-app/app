import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUserCards, deleteUserCard, pay, onUpdateDefaultCard } from 'redux/ducks/payment'
import { onGetBooking, onInsertVoucher } from 'redux/ducks/booking'
import _ from 'lodash'
import {
  Wrapper,
  Title,
  Grid,
  Cell,
  Button,
  Checkbox,
  Box,
  Text,
  Icon,
  Loader,
  Select,
  CardCheckout,
  CreditCard,
  Tag,
  Image,
  Input
} from 'components'

const GridStyled = styled(Grid)`
  margin-top: 100px;
  grid-column-gap: 200px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media only screen and (max-width: 1024px) {
    grid-column-gap: 35px;
  }

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr !important;
    grid-row-gap: 35px;
    grid-template-areas:
      'card card'
      'content content';
    margin-top: -20px;
  }
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  display: inline;
  margin: 0;
  padding: 0;

  :hover,
  :focus {
    text-decoration: none;
    outline: none;
  }
`

const LinkStyled = styled.a`
  color: #6adc91;

  :hover {
    color: #6adc91;
  }
`

const MobileContainer = styled.div`
  @media only screen and (max-width: 991px) {
    display: none !important;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    width: 100% !important;
  }
`

const TitleStyled = styled(Title)`
  @media only screen and (max-width: 991px) {
    text-align: center !important;
  }
`

const GridMobile = styled(Grid)`
  grid-template-columns: repeat(8, 1fr);
  @media only screen and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
    // margin-left: 190px;
  }
  @media only screen and (max-width: 425px) {
    // margin-left: 60px;
  }
`

const CellLogoStart = styled(Cell)`
  @media only screen and (max-width: 991px) {
    justify-self: end;
  }
`

const CellLogoCenter = styled(Cell)`
  @media only screen and (max-width: 991px) {
    justify-self: center;
  }
`

const CellLogoEnd = styled(Cell)`
  @media only screen and (max-width: 991px) {
    justify-self: start;
  }
`

const GridCards = styled(Grid)`
  padding-bottom: 20px;
  border-bottom: 1px solid #c0c0c0c0;

  @media only screen and (max-width: 425px) {
    padding: 20px;
    border-radius: 10px;
    border: ${props => (props.selected ? '1px solid #6adc91' : '1px solid #c0c0c0')};
  }
`

const CellCardLogo = styled(Cell)`
  @media only screen and (max-width: 425px) {
    grid-column-end: span 5;
    margin-bottom: 15px;
  }
`

const CellHideMobile = styled(Cell)`
  @media only screen and (max-width: 425px) {
    display: none;
  }
`

const CellHideDesktop = styled(Cell)`
  display: none;
  @media only screen and (max-width: 425px) {
    display: block;
  }
`

const CheckoutPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()
  const [selectedCard, setSelectedCard] = useState({})
  const [savedCards, setSavedCards] = useState(false)
  const { isLoading: isLoadingGetCards, array: arrayCards } = useSelector(state => state.payment.cards)
  const { defaultCard } = useSelector(state => state.payment)
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  const { error: voucherError } = useSelector(state => state.booking.get)
  const { isLoading: isPaying } = useSelector(state => state.payment.pay)
  const { newCard } = useSelector(state => state.payment)

  const [boolPromo, setBoolPromo] = useState(false)
  const [voucherCode, setVoucherCode] = useState('')

  useEffect(() => {
    async function fetchData() {
      await dispatch(onGetBooking(match.params.id))
      await dispatch(getUserCards())
    }
    fetchData()
  }, [dispatch, match.params.id])

  useEffect(() => {
    arrayCards && arrayCards.length >= 1 && _.isEmpty(newCard) && setSavedCards(true)
    setSelectedCard(arrayCards[0]) //  TODO: change for default one
  }, [arrayCards, newCard])

  const _handleRemoveCard = card => async e => {
    e.preventDefault()
    await dispatch(deleteUserCard(card.id))
  }

  const _handleChangeCardSelect = card => e => {
    e.preventDefault()
    if (selectedCard.id === card.id) {
      setSelectedCard({})
      return
    }
    setSelectedCard(card)
  }

  const _payNow = async () => {
    await dispatch(pay(selectedCard.id, match.params.id, history))
  }

  if (isLoadingGetBooking || isLoadingGetCards) {
    return <Loader text="Loading data..." />
  }

  if (!reservation) {
    toast.error('Booking not found.') // remove
    history.replace('/')
    return null
  }

  if (reservation.bookingState !== 'approved' || reservation.paymentState === 'completed') {
    toast.info('Reservation is already paid.')
    history.replace('/')
    return null
  }

  if (reservation.bookingState === 'timeout') {
    toast.info('Reservation is cancelled.')
    history.replace('/')
    return null
  }

  const _handleChangeDropdown = e => {
    if (e.target.value === 'saved') setSavedCards(true)
    else setSavedCards(false)
  }

  const _setVoucherCode = e => {
    setVoucherCode(e.target.value)
  }

  const _handleApplyPromo = () => {
    dispatch(onInsertVoucher(reservation.bookingId, voucherCode))
  }

  const updateDefaultCard = cardId => {
    dispatch(onUpdateDefaultCard(cardId))
  }

  console.log(arrayCards)

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled areas={['content card']}>
        <Cell area="content">
          <TitleStyled
            marginTop={{ _: '30px', medium: '0px' }}
            className="testTitle"
            type="h7"
            title="Pay with"
            weight="Montserrat-SemiBold"
          />
          <GridMobile style={{ marginBottom: '40px' }}>
            <CellLogoStart width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/visa.png"
                width="50px"
                height="30px"
              />
            </CellLogoStart>
            <CellLogoCenter width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/mastercard.png"
                width="50px"
                height="30px"
              />
            </CellLogoCenter>
            <CellLogoEnd width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/american.png"
                width="50px"
                height="30px"
              />
            </CellLogoEnd>
          </GridMobile>
          <Select
            size="sm"
            label="Payment options"
            onChange={val => _handleChangeDropdown(val)}
            value={savedCards ? 'saved' : 'card'}
          >
            <option value="card">Credit card</option>
            {arrayCards.length > 0 && <option value="saved">Saved card</option>}
          </Select>
          {!savedCards && <CreditCard match={match} dispatch={dispatch} history={history} reservation={reservation} />}

          {arrayCards.length > 0 && savedCards && (
            <>
              <Box mt="60px">
                <Title title="Your saved cards" type="h6" weight="Montserrat-Medium" noMargin />
              </Box>
              <Box mt="50px">
                {arrayCards.map((card, index) => (
                  <GridCards
                    columns={12}
                    style={{ margin: '20px 0', cursor: 'pointer' }}
                    key={index}
                    selected={selectedCard.id === card.id}
                    onClick={_handleChangeCardSelect(card)}
                  >
                    <CellHideMobile width={1}>
                      <Checkbox
                        onClick={_handleChangeCardSelect(card)}
                        checked={selectedCard.id === card.id}
                        style={{ marginTop: '5px' }}
                      />
                    </CellHideMobile>
                    <CellCardLogo width={2}>
                      {card.brand.toLowerCase() === 'visa' && (
                        <Image
                          src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/visa.png"
                          width="60px"
                          height="30px"
                        />
                      )}
                      {card.brand.toLowerCase() === 'mastercard' && (
                        <Image
                          src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/mastercard.png"
                          width="60px"
                          height="30px"
                        />
                      )}
                      {card.brand.toLowerCase().replace(' ', '') === 'americanexpress' && (
                        <Image
                          src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/american.png"
                          width="60px"
                          height="30px"
                        />
                      )}
                    </CellCardLogo>
                    <CellHideMobile width={5}>
                      <Text fontSize="14px" color="#646464" style={{ whiteSpace: 'nowrap' }}>
                        {/* {card.brand}{' '} */}
                        <Text
                          fontSize="14px"
                          color="#646464"
                          style={{ whiteSpace: 'nowrap' }}
                        >{`**** **** **** ${card.last4}`}</Text>
                      </Text>
                      <br />
                      <Text fontSize="14px" color="#646464">{`Expiry: ${card.exp_month}/${card.exp_year}`}</Text>
                    </CellHideMobile>

                    <CellHideMobile width={3}>
                      {card.id === defaultCard && (
                        <Box ml={{ _: '20px', medium: '0px' }}>
                          <Tag small bg="#EBEBEB" noBorder borderRadius="3px">
                            DEFAULT
                          </Tag>
                        </Box>
                      )}
                      {card.id !== defaultCard && (
                        <Box ml={{ _: '20px', medium: '0px' }} onClick={() => updateDefaultCard(card.id)}>
                          <Tag small bg="#EBEBEB" noBorder borderRadius="3px" hover="#6ADC91">
                            MAKE DEFAULT
                          </Tag>
                        </Box>
                      )}
                    </CellHideMobile>
                    <CellHideDesktop width={6}>
                      {card.id === defaultCard && (
                        <Box ml={{ _: '20px', medium: '0px' }}>
                          <Tag small bg="#EBEBEB" noBorder borderRadius="3px" right>
                            DEFAULT
                          </Tag>
                        </Box>
                      )}
                      {card.id !== defaultCard && (
                        <Box ml={{ _: '20px', medium: '0px' }} onClick={() => updateDefaultCard(card.id)}>
                          <Tag small bg="#EBEBEB" noBorder borderRadius="3px" hover="#6ADC91" right>
                            MAKE DEFAULT
                          </Tag>
                        </Box>
                      )}
                    </CellHideDesktop>
                    {card.id !== defaultCard && (
                      <Cell width={1}>
                        {card.isLoading ? (
                          <Loader icon width="20px" height="20px" />
                        ) : (
                          <IconButton onClick={_handleRemoveCard(card)}>
                            <Icon name="bin" style={{ fill: '#51C482' }} />
                          </IconButton>
                        )}
                      </Cell>
                    )}

                    {/* MOBILE IMPLEMENTATION  */}
                    <CellHideDesktop width={6}>
                      <Text fontSize="14px" color="#646464" style={{ whiteSpace: 'nowrap' }}>
                        {/* {card.brand}{' '} */}
                        <Text
                          fontSize="14px"
                          color="#646464"
                          style={{ whiteSpace: 'nowrap' }}
                        >{`**** **** **** ${card.last4}`}</Text>
                      </Text>
                      <br />
                      <Text fontSize="14px" color="#646464">{`Expiry: ${card.exp_month}/${card.exp_year}`}</Text>
                    </CellHideDesktop>
                  </GridCards>
                ))}
                <br />
                {!boolPromo && reservation.priceDetails.valueDiscount === 0 && (
                  <Text onClick={() => setBoolPromo(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    Enter a promo code
                  </Text>
                )}
                {boolPromo && (
                  <Grid columns={1} rowGap="10px">
                    {reservation.priceDetails.valueDiscount === 0 && (
                      <Input
                        size="sm"
                        label="Enter promo code"
                        placeholder="Promo code"
                        value={voucherCode}
                        onChange={e => _setVoucherCode(e)}
                      />
                    )}
                    {voucherError && (
                      <Text fontSiz="19px" style={{ color: '#E05252' }}>
                        x The promo code you entered is invalid or out of date
                      </Text>
                    )}
                    {!voucherError && reservation.priceDetails.valueDiscount > 0 && (
                      <Text fontSiz="19px" style={{ color: '#2DA577' }}>
                        &#10004; The code you entered was successful
                      </Text>
                    )}
                    {reservation.priceDetails.valueDiscount === 0 && (
                      <ButtonStyled size="sm" onClick={() => _handleApplyPromo()}>
                        Apply promo code
                      </ButtonStyled>
                    )}
                  </Grid>
                )}

                <Box mt="80px">
                  <Text fontSize="14px">
                    I agree to the house rules , cancellation policy and{' '}
                    <LinkStyled href="https://spacenow.com/terms-conditions/" target="_blank" style={{}}>
                      terms and conditions{' '}
                    </LinkStyled>
                    of spacenow.
                  </Text>
                </Box>
                <Box mt="80px" mb="25px" display="flex">
                  <ButtonStyled onClick={_payNow} isLoading={isPaying}>
                    Confirm and pay
                  </ButtonStyled>
                </Box>
              </Box>
            </>
          )}
        </Cell>
        <Cell area="card">
          <MobileContainer>
            <CardCheckout reservation={reservation} />

            <Text display="block" textAlign="center" mt="15px">
              No Cancellation
            </Text>
          </MobileContainer>
        </Cell>
      </GridStyled>
    </Wrapper>
  )
}

CheckoutPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default CheckoutPage
