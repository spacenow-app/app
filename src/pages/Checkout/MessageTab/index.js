import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import addMinutes from 'date-fns/addMinutes'
import { onGetBooking } from 'redux/ducks/booking'
import { onCreateMessage } from 'redux/ducks/message'
import { Wrapper, Title, Grid, Cell, Button, Box, Text, Loader, CheckInOut, TextArea, CardCheckout } from 'components'

const GridStyled = styled(Grid)`
  margin-top: 100px;
  grid-column-gap: 200px;

  @media only screen and (max-width: 1024px) {
    grid-column-gap: 35px;
  }

  @media only screen and (max-width: 991px) {
    grid-template-areas:
      'content content'
      'card card';
    margin-top: 0px;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    width: 100% !important;
    margin-bottom: 20px;
  }
`

const ButtonMessage = styled(Button)`
  @media only screen and (max-width: 991px) {
    width: 100% !important;
    margin: 40px 0;
  }
`

const BoxDesktop = styled(Box)`
  @media only screen and (max-width: 991px) {
    display: none;
  }
`

const BoxMobile = styled(Box)`
  display: none;
  @media only screen and (max-width: 991px) {
    display: block;
  }
`

const MessageTab = ({
  match,
  location,
  history,
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  resetForm,
  isValid,
  validateForm,
  ...props
}) => {
  const dispatch = useDispatch()
  const { object: reservation, isLoading: isLoadingGetBooking } = useSelector(state => state.booking.get)
  const { user } = useSelector(state => state.account.get)
  const { listing } = reservation || { listing: {} }
  const { isLoading: isLoadingCreate } = useSelector(state => state.message)

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

  const weekDay = format(new Date(reservation.checkIn), 'i')

  const checkInObj = reservation.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDay.toString()
  )

  const checkInTime =
    reservation.priceType === 'hourly'
      ? reservation.checkInHour
      : checkInObj.allday
      ? '24 hours'
      : format(new Date(checkInObj.openHour), 'h:mm a')

  const checkOutObj = reservation.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDay.toString()
  )
  const checkOutTime =
    reservation.priceType === 'hourly'
      ? reservation.checkOutHour
      : checkOutObj.allday
      ? '24 hours'
      : format(new Date(checkOutObj.closeHour), 'h:mm a')

  const _onSendMessage = async () => {
    validateForm()
    const sendValues = {
      hasFlexibleTime: false,
      period: reservation.period,
      reservations: reservation.reservations,
      checkInTime,
      checkOutTime,
      peopleQuantity: null,
      reason: '',
      content: values.message,
      listingId: reservation.listing.id,
      guestId: user.id,
      hostId: reservation.listing.userId,
      bookingPeriod: reservation.listing.bookingPeriod
    }
    isValid && (await dispatch(onCreateMessage(sendValues)))
    isValid && resetForm()
  }

  return (
    <Wrapper>
      <Helmet title="Checkout - Spacenow" />
      <GridStyled columns="repeat(auto-fit,minmax(300px,1fr))" areas={['content card']}>
        <Cell area="content">
          <BoxDesktop>
            <Title
              marginTop={{ _: '30px', medium: '0px' }}
              className="testTitle"
              type="h7"
              title={`${reservation.listing.settingsParent.subcategory.itemName} for ${reservation.period} ${_spelling(
                reservation.bookingPeriod,
                reservation.period
              ).toLowerCase()} in ${reservation.listing.location.address1}`}
              subtitle={`This reservation will expire after ${_getExpiry(reservation.createdAt)}`}
              subTitleMargin={21}
              weight="Montserrat-SemiBold"
            />
            <br />
            <CheckInOut
              checkIn={reservation.checkIn}
              checkOut={reservation.checkOut}
              checkInTime={checkInTime}
              checkOutTime={checkOutTime}
            />
          </BoxDesktop>
          <Box marginTop={{ _: '20px', medium: '60px' }}>
            <Title
              type="h7"
              title="Contact your host"
              subtitle={`Tell ${listing.user.profile.firstName} a little bit about your space requirements.`}
              subTitleMargin={21}
              weight="Montserrat-SemiBold"
            />
          </Box>
          <TextArea
            name="message"
            error={errors.message}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ButtonMessage
            size="sm"
            onClick={() => _onSendMessage()}
            style={{ float: 'right' }}
            mt="20px"
            isLoading={isLoadingCreate}
          >
            Send message
          </ButtonMessage>

          <BoxDesktop mt="100px" mb="25px" display="flex">
            <ButtonStyled onClick={() => history.replace(`pay`)}>Continue</ButtonStyled>
          </BoxDesktop>
        </Cell>
        <Cell area="card">
          <CardCheckout reservation={reservation} />

          <Text display="block" textAlign="center" mt="15px">
            No Cancellation
          </Text>
          <BoxMobile mt="30px" mb="25px" display="flex">
            <ButtonStyled onClick={() => history.replace(`pay`)}>Continue</ButtonStyled>
          </BoxMobile>
        </Cell>
      </GridStyled>
    </Wrapper>
  )
}

MessageTab.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  ...withFormik.propTypes
}

const formik = {
  displayName: 'Message_form',
  mapPropsToValues: props => {
    return {
      message: ''
    }
  },
  validationSchema: Yup.object().shape({
    message: Yup.string().required('Message is required.')
  }),
  enableReinitialize: true,
  isInitialValid: false
}

export default withFormik(formik)(MessageTab)
