import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onGetBookingsByUser } from 'redux/ducks/account'
import { TypesModal, openModal } from 'redux/ducks/modal'
import { Card, Text, Icon, Loader, BackgroundImage, Grid, Cell, Title } from 'components'
import { Dropdown } from 'react-bootstrap'

const _parseCategoryIconName = (name, isSub) => {
  let prefix = 'category-'
  if (isSub) prefix = 'sub-category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const BookingCard = (dispatch, item, index) => {

  const _cancelBooking = () => {
    dispatch(
      openModal(TypesModal.MODAL_TYPE_CONFIRM, {
        options: {
          title: 'Cancel Booking?',
          text: 'Do you really want to cancel this booking?'
        },
        onConfirm: values => {
          console.log(values)
        }
      })
    )
  }

  return (
    <Card.Horizontal key={index}>
      <Card.Horizontal.Image src={item.listing.photos.length > 0 ? item.listing.photos[0].name : ""} />
      <Card.Horizontal.Body>
        <Card.Horizontal.Title noMargin subTitleMargin={0} type={"h6"} title={<Text>{item.listing.title || ''}</Text>} subtitle={<Text>{`${item.listing.location.address1}, ${item.listing.location.city} ${item.listing.location.state}`}</Text>} />
        <Card.Horizontal.Price noMargin subTitleMargin={0} type={"h6"} title={<Text>AUD ${item.totalPrice.toFixed(2)}</Text>} />
      </Card.Horizontal.Body>
      <Card.Horizontal.Dropdown alignRight>
        <Card.Horizontal.Dropdown.Toggle size="sm">
          <Text color="primary">Option</Text>
        </Card.Horizontal.Dropdown.Toggle>
        <Card.Horizontal.Dropdown.Menu>
          <Card.Horizontal.Dropdown.Item onClick={() => _cancelBooking(item.id)}>Cancel Booking</Card.Horizontal.Dropdown.Item>
          <Card.Horizontal.Dropdown.Item href="#/action-2">Another action</Card.Horizontal.Dropdown.Item>
          <Card.Horizontal.Dropdown.Item href="#/action-3">Something else</Card.Horizontal.Dropdown.Item>
        </Card.Horizontal.Dropdown.Menu>
      </Card.Horizontal.Dropdown>
      <Card.Horizontal.Footer>
        <Card.Horizontal.Tag small icon={<Icon width="24px" name={_parseCategoryIconName(item.listing.settingsParent.category.otherItemName, false)} />}>
          {item.listing.settingsParent.category.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.Tag small icon={<Icon width="24px" name={_parseCategoryIconName(item.listing.settingsParent.subcategory.otherItemName, true)} />}>
          {item.listing.settingsParent.subcategory.itemName}
        </Card.Horizontal.Tag>
        <Card.Horizontal.OverlayTrigger overlay={<Card.Horizontal.ToolTip>asdf adf asdf asdf asdf asdf</Card.Horizontal.ToolTip>}>
          <Card.Horizontal.Label bg={item.bookingState} color={'white'}>{item.bookingState}</Card.Horizontal.Label>
        </Card.Horizontal.OverlayTrigger>
      </Card.Horizontal.Footer>
    </Card.Horizontal>
  )
}

const BookingPage = ({ ...props }) => {

  const dispatch = useDispatch();

  const { user: { id } } = useSelector(state => state.auth)
  const { isLoading, get: { bookings } } = useSelector(state => state.account)

  useEffect(() => {
    dispatch(onGetBookingsByUser(id))
  }, [dispatch, id])

  const _handleChange = (userType) => {
    dispatch(onGetBookingsByUser(id, userType))
  }

  if (isLoading) return <Loader text="Loading bookings process" />
  if (bookings)
    if (bookings.count === 0)
      return <BackgroundImage text="We didn't find any booking :(" />
    else
      return (
        <>
          <Grid column="12">
            <Cell width={6}>
              <Title type="h4" title="Your Bookings" />
            </Cell>
            <Cell width={6} center middle left="none">
              <Dropdown alignRight>
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
          <Grid columns={1} rowGap={`30px`}>
            {[].concat(bookings.items).map((item, index) => BookingCard(dispatch, item, index))}
          </Grid>
        </>
      )
  else return null;
}

export default BookingPage;