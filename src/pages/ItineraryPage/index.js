import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { cropPicture } from 'utils/images'
import { format } from 'date-fns'
import { onCreateMessage } from 'redux/ducks/message'
import ReactToPrint from 'react-to-print'
import { openModal, TypesModal } from 'redux/ducks/modal'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  Tag,
  Icon,
  Text,
  Box,
  Button,
  Loader,
  CheckInOut,
  BookingPriceDetail
} from 'components'

import { onGetBooking, onGetListingInfo } from 'redux/ducks/booking'

import { onGetAllSpecifications } from 'redux/ducks/listing'

const GridStyled = styled(Grid)`
  grid-column-gap: 200px;

  @media only screen and (max-width: 1024px) {
    grid-column-gap: 35px;
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
    margin-top: 0px !important;
  }
`

const GridButtons = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0px !important;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    // max-width: 350px;
    // min-width: 350px;
  }
`

const CardContainer = styled.div`
  height: auto;
  background-color: #f7f7f7;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;
  margin-top: 100px;

  :hover {
    box-shadow: 0 0 5px 1px #ddd;
  }
`

const CardTitle = styled(Text)`
  display: block;
  font-family: 'MontSerrat-Medium';
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  display: block;
  border-radius: 6px;
  cursor: pointer;
  object-fit: cover;
`
const CardContent = styled.div`
  padding: 40px;
  line-height: 2;
`

const TitleStyled = styled(Title)`
  @media only screen and (max-width: 991px) {
    text-align: center !important;
  }
`

const CellDesktop = styled(Cell)`
  @media only screen and (max-width: 991px) {
    display: none;
  }
`

const CellMobile = styled(Cell)`
  display: none;
  @media only screen and (max-width: 991px) {
    display: block;
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

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return cropPicture(photoCover.name)
  }
  return cropPicture(object.photos[0].name)
}

const _parseCategoryIconName = (name, isSub) => {
  const prefix = isSub ? 'sub-category-' : 'category-'
  return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

const ItineraryPage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { object: booking, isLoading: isBookingLoading } = useSelector(state => state.booking.get)
  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.booking.listing)
  const { bookingState } = useSelector(state => state.payment.pay)

  useEffect(() => {
    dispatch(onGetBooking(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    booking && dispatch(onGetListingInfo(booking.listingId))
  }, [dispatch, booking])

  useEffect(() => {
    listing && dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
  }, [dispatch, listing])

  const componentRef = useRef()

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

  if (isBookingLoading) {
    return <Loader text="Loading itinerary" />
  }

  if (bookingState === 'pending') {
    history.push('/account/booking')
    toast.warning(`Reservation ${booking.confirmationCode} still 'pending'.`)
    return null
  }

  if (!bookingState && booking && booking.bookingState === 'pending') {
    history.push('/account/booking')
    toast.warning(`Reservation ${booking.confirmationCode} still 'pending'.`)
    return null
  }

  if (booking && booking.bookingState === 'timeout') {
    toast.info('Reservation is cancelled.')
    history.push('/')
    return null
  }

  if (booking && user && booking.guestId !== user.id) {
    history.push('/account/booking')
    return null
  }

  const _onSendMessage = async () => {
    const values = {
      hasFlexibleTime: false,
      period: booking.period,
      reservations: booking.reservations,
      checkInTime,
      checkOutTime,
      peopleQuantity: null,
      reason: '',
      listingId: booking.listing.id,
      guestId: booking.guestId,
      hostId: booking.listing.userId,
      bookingPeriod: booking.listing.bookingPeriod
    }
    const options = {
      onConfirm: async content => {
        await dispatch(onCreateMessage({ ...values, content }))
      },
      hostName: booking.listing.user.profile.firstName
    }
    dispatch(openModal(TypesModal.MODAL_TYPE_SEND_MESSAGE, options))
  }

  const weekDay = format(new Date(booking.checkIn), 'i')

  const checkInObj = booking.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDay.toString()
  )
  const checkInTime =
    booking.priceType === 'hourly'
      ? booking.checkInHour
      : checkInObj.allday
      ? '24 hours'
      : format(new Date(checkInObj.openHour), 'h:mm a')

  const checkOutObj = booking.listing.accessDays.listingAccessHours.find(
    res => res.weekday.toString() === weekDay.toString()
  )
  const checkOutTime =
    booking.priceType === 'hourly'
      ? booking.checkOutHour
      : checkOutObj.allday
      ? '24 hours'
      : format(new Date(checkOutObj.closeHour), 'h:mm a')

  const _renderSpaceCard = () => {
    return (
      <>
        <CardContainer>
          <CardImage src={_getCoverPhoto(listing)} onClick={() => history.push(`/space/${listing.id}`)} />
          <Box bg="#6ADC91" width="100%" textAlign="center" p="10px" pt="13px" pborderRadius="3px" mt="-3px">
            <Text>BOOKING COMPLETED</Text>
          </Box>
          <CardContent>
            <Box borderBottom="1px solid #c4c4c4" pb="30px" mb="30px">
              <CardTitle>{listing.title}</CardTitle>
              <Grid columns={12}>
                <Cell width={1}>
                  <Icon name="calendar" fill="#172439" width="15px" />
                </Cell>
                <Cell width={4}>
                  <Text fontSize={{ _: '14px', medium: '16px' }}>
                    {format(new Date(booking.checkIn), 'd LLL yyyy')}
                  </Text>
                </Cell>
                <Cell width={1}>
                  <Icon name="full-left-arrow" fill="#172439" width="15px" style={{ transform: 'rotate(180deg)' }} />
                </Cell>
                <Cell width={1}>
                  <Icon name="calendar" fill="#172439" width="15px" />
                </Cell>
                <Cell width={4}>
                  <Text fontSize={{ _: '14px', medium: '16px' }}>
                    {format(new Date(booking.checkOut), 'd LLL yyyy')}
                  </Text>
                </Cell>
              </Grid>
            </Box>
            <Box borderBottom="1px solid #c4c4c4" pb="30px" mb="30px">
              <Box>
                <Text fontSize="14px" fontFamily="MontSerrat-SemiBold">
                  Check-in
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px">{`${checkInTime} ${format(new Date(booking.checkIn), 'EEE, d LLLL')}`}</Text>
              </Box>
              <br />
              <Box>
                <Text fontSize="14px" fontFamily="MontSerrat-SemiBold">
                  Check-out
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px">{`${checkOutTime} ${format(new Date(booking.checkOut), 'EEE, d LLLL')}`}</Text>
              </Box>
            </Box>
            <Box borderBottom="1px solid #c4c4c4" pb="30px" mb="30px">
              <Box>
                <Text fontSize="14px" fontFamily="MontSerrat-SemiBold">
                  Address
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px">{`${listing.location.address1}, ${listing.location.city}, ${listing.location.zipcode}, ${listing.location.state}, ${listing.location.country}`}</Text>
              </Box>
            </Box>
            <Box>
              <Box>
                <Text fontSize="14px" fontFamily="MontSerrat-SemiBold">
                  Total cost
                </Text>
              </Box>
              <Box>
                <Text fontSize="14px">{`AUD $${booking.priceDetails.total
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Text>
              </Box>
            </Box>
          </CardContent>
        </CardContainer>
      </>
    )
  }

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <Cell>
          <Box mb="20px" mt={{ _: '20px', medium: '100px' }} borderBottom="1px solid #E2E2E2" pb="30px">
            <TitleStyled title="Booking Receipt" noMargin type="h4" weight="Montserrat-SemiBold" />
          </Box>
          <Grid columns={12} rows="auto" columnGap="20px">
            {isListingLoading ? (
              <Loader sm />
            ) : (
              <>
                <CellMobile width={12}>
                  <CardImage
                    src={_getCoverPhoto(booking.listing)}
                    onClick={() => history.push(`/space/${booking.listing.id}`)}
                  />
                </CellMobile>
                <Cell width={12}>
                  <Title
                    type="h5"
                    title={listing.title}
                    subtitle={`${listing.location.city}, ${listing.location.country}`}
                    subTitleMargin={10}
                    weight="Montserrat-SemiBold"
                  />
                </Cell>
                <Cell width={12}>
                  <Box display="flex" justifyContent="start" mb="15px">
                    <Box>
                      <Tag
                        small
                        icon={
                          <Icon
                            width="24px"
                            name={_parseCategoryIconName(listing.settingsParent.category.otherItemName, false)}
                          />
                        }
                      >
                        {listing.settingsParent.category.itemName}
                      </Tag>
                    </Box>
                    <Box margin="0 10px">
                      <Tag
                        small
                        icon={
                          <Icon
                            width="24px"
                            name={_parseCategoryIconName(listing.settingsParent.subcategory.otherItemName, true)}
                          />
                        }
                      >
                        {listing.settingsParent.subcategory.itemName}
                      </Tag>
                    </Box>
                  </Box>
                </Cell>
                <Cell width={12}>
                  <BoxDesktop>
                    <Title
                      type="h7"
                      title={`${listing.settingsParent.subcategory.itemName} for ${booking.period} ${_spelling(
                        booking.bookingPeriod,
                        booking.period
                      ).toLowerCase()} in ${listing.location.address1}`}
                      weight="Montserrat-SemiBold"
                    />
                  </BoxDesktop>
                  <BoxMobile mb="30px" mt="10px">
                    <Box>
                      <Text fontSize="14px" fontFamily="MontSerrat-SemiBold">
                        Address
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="14px">{`${listing.location.address1}, ${listing.location.city}, ${listing.location.zipcode}, ${listing.location.state}, ${listing.location.country}`}</Text>
                    </Box>
                  </BoxMobile>
                </Cell>
                <Cell width={12}>
                  <CheckInOut
                    checkIn={booking.checkIn}
                    checkOut={booking.checkOut}
                    checkInTime={checkInTime}
                    checkOutTime={checkOutTime}
                  />
                </Cell>
                <Cell width={10}>
                  <BookingPriceDetail
                    margin="50px 0"
                    periodLabel={_spelling(booking.listing.bookingPeriod, booking.period)}
                    valuePerQuantity={booking.priceDetails.valuePerQuantity}
                    valueFee={booking.priceDetails.valueFee}
                    valueDiscount={booking.priceDetails.valueDiscount}
                    valueVoucher={booking.priceDetails.valueVoucher}
                    total={booking.priceDetails.total}
                    days={booking.period}
                    dividerTotal
                    totalSize="20px"
                    fontSize="16px"
                    noHeader
                  />
                </Cell>
              </>
            )}
          </Grid>
        </Cell>
      )
    }
  }

  return (
    <Wrapper>
      <Helmet title="Receipt - Spacenow" />
      <GridStyled columns="auto 420px">
        <ComponentToPrint listing={listing} booking={booking} isListingLoading={isListingLoading} ref={componentRef} />
        <CellDesktop>{isListingLoading ? <Loader sm /> : _renderSpaceCard()}</CellDesktop>
      </GridStyled>
      <GridButtons columns={5} style={{ marginBottom: '30px', marginTop: '-100px' }}>
        <Cell width={1}>
          <Box mt="20px">
            <ButtonStyled onClick={() => _onSendMessage()}>Message host</ButtonStyled>
          </Box>
        </Cell>
        <Cell width={1}>
          <Box mt="20px">
            <ReactToPrint
              trigger={() => <ButtonStyled outline>Print receipt</ButtonStyled>}
              content={() => componentRef.current}
              pageStyle={{ padding: '40px' }}
            />
          </Box>
        </Cell>
      </GridButtons>
    </Wrapper>
  )
}

ItineraryPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default ItineraryPage
