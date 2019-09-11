import React from 'react'

import { addMinutes, format } from 'date-fns'
import styled from 'styled-components'

import { openModal, TypesModal } from 'redux/ducks/modal'
import { onTimeoutBooking } from 'redux/ducks/booking'

import { ListDates, PriceDetail, Grid, Cell, Button, Box, DatesDetail } from 'components'

const TitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  font-size: 12px;
`
const SubTitleStyled = styled.span`
  font-size: 11px;
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

const _renderContentCard = booking => {
  const expiry = addMinutes(new Date(booking.createdAt), 30)
  const expiryDate = `${format(expiry, 'dd/MM/yyyy')  } at ${  format(expiry, 'HH:mm')}`
  const startDate = booking.reservations[0]
  const endDate = booking.reservations[booking.reservations.length - 1]

  return (
    <Grid columns={1} rowGap="20px">
      <Cell>
        <TitleStyled>You have an incomplete reservation for this listing. What would you like to do?</TitleStyled>
        <SubTitleStyled>{`This reservation will expire on ${expiryDate}`}</SubTitleStyled>
      </Cell>

      {booking.priceType === 'daily' ? (
        <Box m="0">
          <ListDates dates={booking.reservations} />
        </Box>
      ) : (
        <DatesDetail
          startDate={startDate}
          endDate={endDate}
          period={booking.period}
          priceType={booking.priceType}
          alignLeft
        />
      )}
    </Grid>
  )
}

const _onContinueBooking = (booking, dispatch, history) => {
  if (new Date() >= addMinutes(booking.createdAt, '30')) {
    dispatch(onTimeoutBooking(booking.bookingId))

    const options = {
      options: {
        title: 'Booking Timed-out!',
        text: 'Unfortunately the booking was timed-out. What would you like to do?',
        buttonCancelText: 'Book again',
        buttonConfirmText: 'Go to my dashboard'
      },
      onConfirm: () => {
        history.push(`/account/booking`)
      }
    }
    dispatch(openModal(TypesModal.MODAL_TYPE_CONFIRM, options))
  } else {
    history.push(`/checkout/${booking.bookingId}`)
  }
}

const _onCancelBooking = (booking, dispatch) => {
  const options = {
    options: {
      title: 'Cancel booking?',
      text: 'Are you sure you want to cancel this current booking?',
      buttonConfirmText: 'Yes, cancel booking',
      buttonCancelText: 'No, keep booking'
    },
    onConfirm: () => {
      dispatch(onTimeoutBooking(booking.bookingId))
    }
  }
  dispatch(openModal(TypesModal.MODAL_TYPE_CONFIRM, options))
}

const PendingBooking = ({ booking, listing, dispatch, history }) => (
  <Grid columns={1} rowGap="20px">
    {_renderContentCard(booking)}
    <PriceDetail
      periodLabel={spelling(booking.priceType, booking.period)}
      price={listing.basePrice}
      isAbsorvedFee={listing.isAbsorvedFee}
      days={booking.period}
      quantity={1}
    />
    <Grid columns={2}>
      <Cell md={6}>
        <Button fluid error onClick={() => _onCancelBooking(booking, dispatch)}>
          Cancel
        </Button>
      </Cell>
      <Cell md={6}>
        <Button fluid onClick={() => _onContinueBooking(booking, dispatch, history)}>
          Continue
        </Button>
      </Cell>
    </Grid>
  </Grid>
)
export default PendingBooking
