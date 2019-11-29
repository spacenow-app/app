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
  PriceDetail,
  CheckInOut
} from 'components'

const GridStyled = styled(Grid)`
  margin-top: 50px;
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

const InfoPage = ({ match, location, history, ...props }) => {
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
    // const diff = -differenceInMinutes(new Date(), expiry)
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
      case 'hourly':
        label = 'Hour'
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

  // async function getCheckInOutTime(listingId, date) {
  //   const weekDay = moment(date).day()
  //   const accessDay = await ListingAccessDays.findOne({
  //     where: { listingId: listingId }
  //   })
  //   const accessHours = await ListingAccessHours.findOne({
  //     where: {
  //       listingAccessDaysId: accessDay.id,
  //       weekday: `${weekDay}`
  //     }
  //   })
  //   return accessHours
  // }

  // let checkInObj = await getCheckInOutTime(listingObj.id, bookingObj.checkIn)

  const weekDay = format(new Date(reservation.checkIn), 'i')

  const checkInObj = reservation.listing.accessDays.listingAccessHours.find(res => res.weekday == weekDay)

  const checkInTime =
    reservation.priceType === 'hourly'
      ? reservation.checkInHour
      : checkInObj.allday === 1
      ? '24 hours'
      : format(new Date(checkInObj.openHour), 'h:mm a')

  const checkOutObj = reservation.listing.accessDays.listingAccessHours.find(res => res.weekday == weekDay)
  const checkOutTime =
    reservation.priceType === 'hourly'
      ? reservation.checkOutHour
      : checkOutObj.allday === 1
      ? '24 hours'
      : format(new Date(checkOutObj.closeHour), 'h:mm a')

  console.log(reservation)
  console.log(match)

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled columns="repeat(auto-fit,minmax(300px,1fr))" columnGap="35px" areas={['content card']}>
        <Cell area="content">
          <Title
            marginTop="0px"
            className="testTitle"
            type="h4"
            title={`${reservation.listing.settingsParent.subcategory.itemName} for ${reservation.period} ${_spelling(
              reservation.bookingPeriod,
              reservation.period
            ).toLowerCase()} in ${reservation.listing.location.address1}`}
            subtitle={`This reservation will expire after ${_getExpiry(reservation.createdAt)}`}
            subTitleMargin="21px"
          />
          <br />
          <CheckInOut
            checkIn={reservation.checkIn}
            checkOut={reservation.checkOut}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
          />

          {/* If booking period is daily */}
          {listing.bookingPeriod === 'daily' ? (
            <>
              {/* <Caption type="large">Selected dates</Caption>
              <ListDates dates={reservation.reservations} /> */}
            </>
          ) : (
            // <BookingDates reservationData={[]} />
            <></>
          )}

          <Title marginTop="60px" type="h4" title="Opening hours for this space" />

          <TimeTable data={listing.accessDays.listingAccessHours} />

          <Box mt="100px" mb="25px" display="flex">
            {/* <Button outline onClick={() => history.goBack()}>
              Edit Dates
            </Button> */}
            <Button onClick={() => history.replace(`message`)}>Agree and continue</Button>
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
                  periodLabel={_spelling(reservation.listing.bookingPeriod, reservation.period)}
                  price={listing.listingData.basePrice}
                  isAbsorvedFee={listing.listingData.isAbsorvedFee}
                  days={reservation.period}
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

InfoPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default InfoPage
