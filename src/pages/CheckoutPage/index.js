import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
import { convertedDate } from 'utils/date'
import { TypesModal, openModal } from 'redux/ducks/modal'
import { getUserCards, createUserCard, deleteUserCard, pay } from 'redux/ducks/payment'
import { onGetBooking } from 'redux/ducks/booking'
import {
  Wrapper,
  Title,
  Grid,
  Cell,
  UserDetails,
  BookingCard,
  ListDates,
  TimeTable,
  Button,
  Table,
  Checkbox,
  Box,
  Text,
  Caption,
  Icon,
  Loader,
  PriceDetail
} from 'components'

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-areas:
      'card card'
      'content content';
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

const CheckoutPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()
  const [selectedCard, setSelectedCard] = useState({})
  const { isLoading: isLoadingGetCards, array: arrayCards, isCreating } = useSelector(state => state.payment.cards)
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  const { isLoading: isPaying } = useSelector(state => state.payment.pay)
  const { listing } = reservation || { listing: {} }

  useEffect(() => {
    async function fetchData() {
      await dispatch(onGetBooking(match.params.id))
      await dispatch(getUserCards())
    }
    fetchData()
  }, [dispatch, match.params.id])

  const _addNewCard = () => {
    dispatch(
      openModal(TypesModal.MODAL_TYPE_ADD_CREDIT_CARD, {
        onConfirm: async values => {
          await dispatch(createUserCard(values))
        }
      })
    )
  }

  const _handleRemoveCard = card => async e => {
    e.preventDefault()
    await dispatch(deleteUserCard(card.id))
  }

  const _getExpiry = date => {
    const dateConverted = fromUnixTime(date / 1000)
    const expiry = addMinutes(dateConverted, 30)
    return format(new Date(expiry), 'Pp')
  }

  const _spelling = (periodType, reference) => {
    let label = 'Day'
    switch (periodType) {
      case 'weekly':
        label = 'Week'
        break
      case 'monthly':
        label = 'Month'
        break
      default:
        label = 'Day'
    }
    if (reference > 1) label = `${label}s`
    return label
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
    // toast.error('Booking not found.')
    history.replace('/')
    return null
  }

  if (reservation.bookingState === 'approved' || reservation.bookingState === 'requested') {
    toast.info('Reservation is already paid.')
    history.replace('/')
    return null
  }

  if (reservation.bookingState === 'timeout') {
    toast.info('Reservation is cancelled.')
    history.replace('/')
    return null
  }

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled columns="repeat(auto-fit,minmax(300px,1fr))" columnGap="35px" areas={['content card']}>
        <Cell area="content">
          <Title
            marginTop="0px"
            className="testTitle"
            type="h3"
            title="About your booking"
            subtitle={`This reservation will expire on ${_getExpiry(reservation.createdAt)}`}
            subTitleMargin={0}
          />

          {/* If booking period is daily */}
          {listing.bookingPeriod === 'daily' ? (
            <>
              <Caption type="large">Selected dates</Caption>
              <ListDates dates={reservation.reservations} />
            </>
          ) : (
              // <BookingDates reservationData={[]} />
              <></>
            )}

          <TimeTable data={listing.accessDays.listingAccessHours} />

          <Title type="h4" title="How would you like to pay?" />
          {arrayCards.length > 0 ? (
            <>
              <Text color="primary" fontSize="18px" fontFamily="semiBold">
                Card details
              </Text>
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>
                      <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                        Name on Card
                      </Text>
                    </th>
                    <th>
                      <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                        Brand
                      </Text>
                    </th>
                    <th>
                      <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                        Card Number
                      </Text>
                    </th>
                    <th>
                      <Text fontSize="14px" fontFamily="semiBold" style={{ whiteSpace: 'nowrap' }}>
                        Options
                      </Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrayCards.map(card => (
                    <tr key={card.id}>
                      <td>
                        <Checkbox onClick={_handleChangeCardSelect(card)} checked={selectedCard.id === card.id} />
                      </td>
                      <td>
                        <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                          {card.name}
                        </Text>
                      </td>
                      <td>
                        <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>
                          {card.brand}
                        </Text>
                      </td>
                      <td>
                        <Text fontSize="14px" style={{ whiteSpace: 'nowrap' }}>{`**** **** **** ${card.last4}`}</Text>
                      </td>
                      <td align="center">
                        {card.isLoading ? (
                          <Loader icon width="20px" height="20px" />
                        ) : (
                            <IconButton onClick={_handleRemoveCard(card)}>
                              <Icon name="bin" style={{ fill: '#51C482' }} />
                            </IconButton>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
              <Text>You don't have any credit cards yet, please add one :)</Text>
            )}

          <Button size="sm" onClick={_addNewCard} isLoading={isCreating}>
            Add Card
          </Button>

          <Box mt="50px" mb="25px" display="flex">
            <Button outline onClick={() => history.goBack()}>
              Edit Dates
            </Button>
            <Button ml="20px" disabled={!selectedCard.id} onClick={_payNow} isLoading={isPaying}>
              Pay Now
            </Button>
          </Box>
        </Cell>
        <Cell area="card">
          <BookingCard
            titleComponent={
              <>
                <Title type="h5" title="Hosted by" noMargin />
                <UserDetails
                  hostname={`${listing.user && listing.user.profile.firstName} ${listing.user &&
                    listing.user.profile.lastName} `}
                  imageProfile={listing.user && listing.user.profile.picture}
                  joined={format(convertedDate(listing.user && listing.user.profile.createdAt), 'yyyy')}
                />
              </>
            }
            contentComponent={
              <Box>
                <Title
                  subTitleMargin={0}
                  type="h4"
                  title={listing.title}
                  subtitle={`${listing.location.address ? `${listing.location.address}, ` : ''}
                        ${listing.location.city ? `${listing.location.city}, ` : ''}
                        ${listing.location.zipcode ? `${listing.location.zipcode}, ` : ''}
                        ${listing.location.state ? `${listing.location.state}, ` : ''}
                        ${listing.location.country ? listing.location.country : ''}`}
                />
                <PriceDetail
                  margin="0"
                  periodLabel={_spelling(reservation.listing.bookingPeriod, reservation.reservations.length)}
                  price={listing.listingData.basePrice}
                  isAbsorvedFee={listing.listingData.isAbsorvedFee}
                  days={reservation.reservations.length}
                  quantity={1}
                />
              </Box>
            }
            footerComponent={
              <Box display="grid" gridTemplateColumns="auto auto" bg="white" height="50px" p="15px" borderRadius="8px">
                <Text>Total</Text>
                <Text justifySelf="end" fontFamily="semiBold" color="primary">
                  {`${reservation.currency}$ ${reservation.totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                </Text>
              </Box>
            }
          />
          <Text display="block" textAlign="center" mt="15px">
            No Cancellation
          </Text>
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
