import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
import { onGetBooking } from 'redux/ducks/booking'
import { Wrapper, Title, Grid, Cell, TimeTable, Button, Box, Text, Loader, CheckInOut, CardCheckout } from 'components'

const GridStyled = styled(Grid)`
  grid-column-gap: 200px;
  margin-top: 100px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media only screen and (max-width: 1024px) {
    grid-column-gap: 35px;
  }

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-row-gap: 35px;
    grid-template-areas:
      'card card'
      'content content';
    margin-top: 40px;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    width: 100% !important;
  }
`

const InfoTab = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  const { listing } = reservation || { listing: {} }

  useEffect(() => {
    async function fetchData() {
      await dispatch(onGetBooking(match.params.id))
    }
    fetchData()
  }, [dispatch, match.params.id])

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

  if (isLoadingGetBooking) {
    return <Loader text="Loading data..." />
  }

  if (!reservation) {
    // toast.error('Booking not found.')
    history.replace('/')
    return null
  }

  if (reservation.bookingState === 'timeout') {
    toast.info('Reservation is timed-out.')
    history.replace('/')
    return null
  }

  if (reservation.bookingState !== 'approved' || reservation.paymentState === 'completed') {
    toast.info('Reservation is already paid.')
    history.replace('/')
    return null
  }

  const weekDay = format(new Date(reservation.checkIn), 'i') - 1

  const checkInObj = reservation.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDay.toString()
  )
  const checkInTime =
    reservation.priceType === 'hourly'
      ? reservation.checkInHour
      : checkInObj
      ? checkInObj.allday
        ? '24 hours'
        : format(new Date(checkInObj.openHour), 'h:mm a')
      : 'Closed'

  const weekDayOut = format(new Date(reservation.checkOut), 'i') - 1
  const checkOutObj = reservation.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDayOut.toString()
  )
  const checkOutTime =
    reservation.priceType === 'hourly'
      ? reservation.checkOutHour
      : checkOutObj
      ? checkOutObj.allday
        ? '24 hours'
        : format(new Date(checkOutObj.closeHour), 'h:mm a')
      : 'Closed'

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled areas={['content card']}>
        <Cell area="content">
          <Title
            marginTop={{ _: '30px', medium: '0px' }}
            className="testTitle"
            type="h7"
            title={`${reservation.listing.settingsParent.subcategory.itemName} for ${reservation.period} ${_spelling(
              reservation.priceType,
              reservation.period
            ).toLowerCase()} in ${
              reservation.listing.location.address1
                ? reservation.listing.location.address1
                : reservation.listing.location.city
            }`}
            subtitle={`This reservation will expire after ${_getExpiry(reservation.createdAt)}`}
            subTitleMargin="21"
            weight="Montserrat-SemiBold"
          />
          <br />
          <CheckInOut
            checkIn={reservation.checkIn}
            checkOut={reservation.checkOut}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
          />

          <Title m="60px 0" type="h7" title="Opening hours for this space" weight="Montserrat-SemiBold" />

          <TimeTable data={listing.accessDays.listingAccessHours} />

          <Box mt="100px" mb="25px" display="flex">
            <ButtonStyled onClick={() => history.replace(`pay`)}>Agree and continue</ButtonStyled>
          </Box>
        </Cell>
        <Cell area="card">
          <CardCheckout reservation={reservation} />
          <Text display="block" textAlign="center" mt="15px">
            No Cancellation
          </Text>
        </Cell>
      </GridStyled>
    </Wrapper>
  )
}

InfoTab.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default InfoTab
