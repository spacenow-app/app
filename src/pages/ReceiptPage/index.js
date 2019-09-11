import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import ReactToPrint from 'react-to-print'

import { Wrapper, Title, Grid, Cell, Box, Button, ListDates, DatesDetail, Loader, PriceDetail } from 'components'

import { onGetBooking, onGetListingInfo } from 'redux/ducks/booking'

const CellStyled = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 12;
  }
`

const ReservationCodeStyled = styled.div`
  background-color: #ebebeb;
  border-radius: 30px;
  text-align: center;
  padding: 15px;
  height: 50px;
  margin-top: 21px;
`

function spelling(periodType, reference) {
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

const ReceiptPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { object: booking, isLoading: isBookingLoading } = useSelector(state => state.booking.get)
  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.booking.listing)

  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    booking && dispatch(onGetListingInfo(booking.listingId))
  }, [dispatch, booking])

  const componentRef = useRef()

  if (isBookingLoading) {
    return <Loader text="Loading receipt" />
  }

  if (booking && booking.bookingState === 'pending') {
    history.replace('/account/booking')
    toast.warning(`Reservation ${booking.confirmationCode} still 'pending'.`)
  }

  if (booking && user && booking.guestId !== user.id) {
    history.replace('/account/booking')
  }

  return (
    <Wrapper mb="80px">
      <Helmet title="Receipt - Spacenow" />
      <>
        <ComponentToPrint listing={listing} booking={booking} isListingLoading={isListingLoading} ref={componentRef} />
        <ReactToPrint
          trigger={() => <Button>Print receipt</Button>}
          content={() => componentRef.current}
          pageStyle={{ padding: '40px' }}
        />
      </>
    </Wrapper>
  )
}

class ComponentToPrint extends React.Component {
  render() {
    const { listing, booking, isListingLoading } = this.props

    const startDate = booking && booking.reservations[0]
    const endDate = booking && booking.reservations[booking.reservations.length - 1]

    return (
      <>
        <Grid columns={12} rows="auto" rowGap="12px">
          <Cell width={12}>
            <Box mb="35px">
              <Title title="Receipt" color="#6adc91" />
            </Box>
          </Cell>
          <CellStyled width={4}>
            <ReservationCodeStyled>{`Reservation Code: ${booking.confirmationCode.toString()}`}</ReservationCodeStyled>
          </CellStyled>
          {isListingLoading ? (
            <Loader sm />
          ) : (
            <>
              <Cell width={12}>
                <Title
                  type="h3"
                  title={listing.title}
                  subtitle={`${listing.location.city}, ${listing.location.country}`}
                  subTitleMargin={5}
                  subTitleSize={18}
                />
              </Cell>
              <Cell width={12}>
                <Title
                  type="h6"
                  title="Address"
                  noMargin
                  subtitle={`${listing.location.address1}, ${listing.location.city}, ${listing.location.zipcode}, ${listing.location.state}, ${listing.location.country}`}
                  subTitleMargin={5}
                  subTitleSize={18}
                />
              </Cell>
            </>
          )}
          <CellStyled width={10}>
            {booking.priceType === 'daily' ? (
              <Box m="0">
                <Title type="h6" title="Selected dates" />
                <ListDates dates={booking.reservations} />
              </Box>
            ) : (
              <Box mt="20px">
                <DatesDetail
                  startDate={startDate}
                  endDate={endDate}
                  period={booking.period}
                  priceType={booking.priceType}
                />
              </Box>
            )}
          </CellStyled>

          <CellStyled width={4}>
            {isListingLoading ? (
              <Loader sm />
            ) : (
              <Box my="30px">
                <PriceDetail
                  periodLabel={spelling(booking.priceType, booking.period)}
                  price={booking.basePrice}
                  isAbsorvedFee={listing.listingData.isAbsorvedFee}
                  days={booking.period}
                  quantity={1}
                />
              </Box>
            )}
          </CellStyled>
        </Grid>
      </>
    )
  }
}

ComponentToPrint.propTypes = {
  booking: PropTypes.object,
  listing: PropTypes.object
}

ReceiptPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default ReceiptPage
