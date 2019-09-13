import React, { useEffect, useState } from 'react'
import { addMinutes, format, addHours, isAfter } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux'
import Helmet from 'react-helmet'
import { onGetBookingsByUser } from 'redux/ducks/account'
import { onDeclineBooking, onAcceptBooking } from 'redux/ducks/booking'
import { TypesModal, openModal } from 'redux/ducks/modal'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title, Wrapper, Dropdown } from 'components'
import { convertedDate } from 'utils/date'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const _bookingDetails = dispatch => (booking, userType) => {
  dispatch(
    openModal(TypesModal.MODAL_TYPE_BOOKING_DETAILS, {
      options: {
        title: 'Booking Details',
        text: ''
      },
      booking,
      userType
    })
  )
}

const _declineBooking = (dispatch) => (bookingId) => {
  dispatch(onDeclineBooking(bookingId))
}

const _acceptBooking = dispatch => bookingId => {
  dispatch(onAcceptBooking(bookingId))
}

const _handleRedirect = (id) => {
  window.location.href = `/space/${id}`
}

const _getTip = (status, userType) => {
  switch (status) {
    case 'expired':
      return userType === 'guest'
        ? 'Your host didn’t confirm in time. We’ll let them know they missed their chance. If you still want to book this space, please re-enquire.'
        : 'You missed the 24 hour window to reply to this booking. You can contact the guest to see if they want to re-enquire'
    case 'cancelled':
      return userType === 'guest'
        ? 'This booking has been cancelled by you or the host.'
        : 'This booking has been cancelled by you or the guest.'
    case 'pending':
      return userType === 'guest'
        ? 'You’ve started this booking, but you need to enter your payment details before we send your request to the host.'
        : 'A guest has created a booking, but hasn’t completed their payment. We’ll chase them up.'
    case 'requested':
      return userType === 'guest'
        ? 'Your booking is with the host for approval.'
        : 'Please either approve or reject this booking within 24 hours, or it’ll expire.'
    case 'approved':
      return userType === 'guest'
        ? 'Your booking is now in progress.'
        : 'This booking and its payments are currently in progress.'
    default:
      return userType === 'guest' ? 'This booking is now finished.' : 'This booking is now finished.'
  }
}

const BookingCard = (dispatch, item, index, userType) => {
  let expire = addHours(convertedDate(item.createdAt), 24)

  if (userType === 'guest') expire = addMinutes(convertedDate(item.createdAt), 30)

  if (userType === 'guest')
    expire = addMinutes(convertedDate(item.createdAt), 15)

  let expiryDate = format(expire, "dd/MM/yyyy") + ' at ' + format(expire, "HH:mm")

  return (
    <Card.Horizontal key={index}>
      <Card.Horizontal.Image src={item.listing.photos.length > 0 ? item.listing.photos[0].name : ""} handleClick={() => _handleRedirect(item.listingId)} />
      <Card.Horizontal.Body>
        <Card.Horizontal.Title
          noMargin
          subTitleMargin={0}
          type="h6"
          title={<Text>{item.listing.title || ''}</Text>}
          subtitle={
            <Text>{`${item.listing.location.address1}, ${item.listing.location.city} ${item.listing.location.state}`}</Text>
          }
        />
        <Card.Horizontal.Price
          noMargin
          subTitleMargin={0}
          type="h6"
          title={<Text>AUD ${item.totalPrice.toFixed(2)}</Text>}
        />
        {(item.bookingState === 'pending' || item.bookingState === 'requested') && (
          <Card.Horizontal.ExpireOn
            noMargin
            subTitleMargin={0}
            type="h6"
            title="Expires on"
            subtitle={<Text>{expiryDate}</Text>}
          />
        )}
      </Card.Horizontal.Body>
      <Card.Horizontal.Dropdown alignRight size="sm">
        <Card.Horizontal.Dropdown.Toggle>
          <Text color="primary" fontSize='12px'>Option</Text>
        </Card.Horizontal.Dropdown.Toggle>
        <Card.Horizontal.Dropdown.Menu>
          {(item.bookingState === 'pending' && userType === 'guest' && isAfter(new Date(), expire)) && <Card.Horizontal.Dropdown.Item onClick={() => _handleRedirect(item.listingId)}>Continue Booking</Card.Horizontal.Dropdown.Item>}
          <Card.Horizontal.Dropdown.Item onClick={() => _bookingDetails(dispatch)(item, userType)}>Booking Details</Card.Horizontal.Dropdown.Item>
          {(item.bookingState === 'pending' && userType === 'host') &&
            <>
              <Card.Horizontal.Dropdown.Item onClick={() => _declineBooking(dispatch)(item.bookingId)}>
                Decline Booking
              </Card.Horizontal.Dropdown.Item>
              <Card.Horizontal.Dropdown.Item onClick={() => _acceptBooking(dispatch)(item.bookingId)}>
                Accept Booking
              </Card.Horizontal.Dropdown.Item>
            </>
          }
        </Card.Horizontal.Dropdown.Menu>
      </Card.Horizontal.Dropdown>
      <Card.Horizontal.Footer>
        <Card.Horizontal.Tag
          small
          icon={
            <Icon width="24px" name={_parseCategoryIconName(item.listing.settingsParent.category.otherItemName, false)} />
          }
        >
          {item.listing.settingsParent.category.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Tag
          small
          icon={
            <Icon
              width="24px"
              name={_parseCategoryIconName(item.listing.settingsParent.subcategory.otherItemName, true)}
            />
          }
        >
          {item.listing.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.OverlayTrigger overlay={<Card.Horizontal.ToolTip>{_getTip(item.bookingState, userType)}</Card.Horizontal.ToolTip>}>
          <Card.Horizontal.Label bg={item.bookingState} color={'white'}>{item.bookingState}</Card.Horizontal.Label>
        </Card.Horizontal.OverlayTrigger>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const BookingPage = ({ ...props }) => {
  const dispatch = useDispatch()

  const [userType, setUserType] = useState('guest')
  const { user: { id } } = useSelector(state => state.account.get)
  const { isLoading, get: { bookings } } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetBookingsByUser(id))
  }, [dispatch, id])

  const _handleChange = userType => {
    setUserType(userType)
    dispatch(onGetBookingsByUser(id, userType))
  }

  if (isLoading) return <Loader text="Loading bookings process" />

  return (
    <Wrapper>
      <Helmet title="Your Bookings - Spacenow" />
      <Grid column="12">
        <Cell width={6}>
          <Title type="h4" title="Your Bookings" />
        </Cell>
        <Cell width={6} middle justifySelf={'end'}>
          <Dropdown alignRight size={'sm'}>
            <Dropdown.Toggle size="sm">
              <Text color="primary">User Type</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => _handleChange('guest')}>Guest</Dropdown.Item>
              <Dropdown.Item onClick={() => _handleChange('host')}>Host</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Cell>
      </Grid>

      {!bookings || bookings.count === 0 ? (
        <BackgroundImage text="We didn't find any booking :(" />
      ) : (
          <Grid columns={1} rowGap="30px">
            {[].concat(bookings.items).map((item, index) => BookingCard(dispatch, item, index, userType))}
          </Grid>
        )}
    </Wrapper>
  )
}

export default BookingPage
