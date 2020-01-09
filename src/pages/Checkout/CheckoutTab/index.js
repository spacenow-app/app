import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUserCards, deleteUserCard, pay } from 'redux/ducks/payment'
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

  @media only screen and (max-width: 1024px) {
    grid-column-gap: 35px;
  }

  @media only screen and (max-width: 991px) {
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
  @media only screen and (max-width: 991px) {
    margin-left: 190px;
  }
  @media only screen and (max-width: 425px) {
    margin-left: 60px;
  }
`

const CellMobile = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 2;
  }
`

const CheckoutPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()
  const [selectedCard, setSelectedCard] = useState({})
  const [savedCards, setSavedCards] = useState(false)
  const { isLoading: isLoadingGetCards, array: arrayCards } = useSelector(state => state.payment.cards)
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
    console.log('reservation', reservation.id)
    dispatch(onInsertVoucher(reservation.bookingId, voucherCode))
  }

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled columns="repeat(auto-fit,minmax(300px,1fr))" areas={['content card']}>
        <Cell area="content">
          <TitleStyled
            marginTop={{ _: '30px', medium: '0px' }}
            className="testTitle"
            type="h7"
            title="Pay with"
            weight="Montserrat-SemiBold"
          />
          <GridMobile columns={8} style={{ marginBottom: '40px' }}>
            <CellMobile width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/visa.png"
                width="50px"
                height="30px"
              />
            </CellMobile>
            <CellMobile width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/mastercard.png"
                width="50px"
                height="30px"
              />
            </CellMobile>
            <CellMobile width={1}>
              <Image
                src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/american.png"
                width="50px"
                height="30px"
              />
            </CellMobile>
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
          {!savedCards && <CreditCard match={match} dispatch={dispatch} history={history} />}

          {arrayCards.length > 0 && savedCards && (
            <Box mt="60px">
              {arrayCards.map((card, index) => (
                <Grid columns={12} style={{ margin: '40px 0' }} key={index}>
                  <Cell width={1}>
                    <Checkbox
                      onClick={_handleChangeCardSelect(card)}
                      checked={selectedCard.id === card.id}
                      style={{ marginTop: '5px' }}
                    />
                  </Cell>
                  <Cell width={2}>
                    {card.brand.toLowerCase() === 'visa' && (
                      <Image
                        src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/visa.png"
                        width="50px"
                        height="30px"
                      />
                    )}
                    {card.brand.toLowerCase() === 'mastercard' && (
                      <Image
                        src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/mastercard.png"
                        width="50px"
                        height="30px"
                      />
                    )}
                    {card.brand.toLowerCase().replace(' ', '') === 'americanexpress' && (
                      <Image
                        src="https://prod-spacenow-images.s3-ap-southeast-2.amazonaws.com/cards/american.png"
                        width="50px"
                        height="30px"
                      />
                    )}
                  </Cell>
                  <Cell width={4}>
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
                  </Cell>
                  <Cell width={3}>
                    {/* TODO: Change for default one */}
                    {index === 0 && (
                      <Box ml={{ _: '10px', medium: '0px' }}>
                        <Tag small bg="#EBEBEB">
                          DEFAULT
                        </Tag>
                      </Box>
                    )}
                  </Cell>
                  {index !== 0 && (
                    <Cell width={2}>
                      {card.isLoading ? (
                        <Loader icon width="20px" height="20px" />
                      ) : (
                        <IconButton onClick={_handleRemoveCard(card)}>
                          <Icon name="bin" style={{ fill: '#51C482' }} />
                        </IconButton>
                      )}
                    </Cell>
                  )}
                </Grid>
              ))}
              {!boolPromo && reservation.priceDetails.valueDiscount === 0 && (
                <Text onClick={() => setBoolPromo(true)} style={{ cursor: 'pointer' }}>
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
                    <Button size="sm" onClick={() => _handleApplyPromo()}>
                      Apply promo code
                    </Button>
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
