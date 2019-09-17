import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { toPlural } from 'utils/strings'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  Tag,
  Icon,
  Text,
  Avatar,
  Box,
  Button,
  ListDates,
  DatesDetail,
  TimeTable,
  Loader
} from 'components'

import { onGetBooking, onGetListingInfo } from 'redux/ducks/booking'

import { onGetAllSpecifications } from 'redux/ducks/listing'

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
  }
`

const CellStyled = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 12;
  }
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    max-width: 350px;
    min-width: 350px;
  }
`

const CardContainer = styled.div`
  height: 530px;
  background: #ffffff 0% 0% no-repeat padding-box;
  /* border: 1px solid #ececec; */
  box-shadow: 0 0 5px 1px #eee;
  border-radius: 6px;
  opacity: 1;

  :hover {
    box-shadow: 0 0 5px 1px #ddd;
  }
`

const CardTitle = styled(Text)`
  display: block;
  font-family: 'MontSerrat-Bold';
  font-size: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`

const CardImage = styled.img`
  width: 100%;
  height: 280px;
  display: block;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: pointer;
  object-fit: cover;
`
const CardContent = styled.div`
  padding: 25px;
  line-height: 2;
`

const _getWeekName = days => {
  const { mon, tue, wed, thu, fri, sat, sun } = days
  if (mon && tue && wed && thu && fri & !sat && !sun) return 'Weekdays'
  if (!mon && !tue && !wed && !thu && !fri & sat && sun) return 'Weekends'
  if (mon && tue && wed && thu && fri & sat && sun) return 'Everyday'
  if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'Closed'
  return 'Custom'
}

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return photoCover.name
  }
  return object.photos[0].name
}

const _renderSpecifications = (spec, listingData) => {
  const _getInfo = el => {
    switch (el.field) {
      case 'capacity':
        return {
          icon: 'specification-capacity',
          value: el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        }
      case 'size':
        return {
          icon: 'specification-size',
          value: el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
        }
      case 'meetingRooms':
        return {
          icon: 'specification-meetingroom-quantity',
          value: el.value === 0 ? 'None available' : `${el.value} available`
        }
      case 'isFurnished':
        return {
          icon: el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes',
          value: el.value === 0 ? 'No' : 'Yes'
        }
      case 'carSpace':
        return {
          icon: 'category-desk',
          value: el.value === 0 ? 'None available' : `${el.value} available`
        }
      default:
        return {
          icon: '',
          value: ''
        }
    }
  }
  return Object.entries(spec)
    .slice(0, 3)
    .map((el, i) => {
      const specDataObject = el[1]
      const obj = {
        field: specDataObject.field,
        value: listingData[specDataObject.field]
      }

      return (
        <Box key={i}>
          <Icon name={_getInfo(obj).icon} width="22px" />
          <Text fontSize="10px" ml="10px">
            {_getInfo(obj).value}
          </Text>
        </Box>
      )
    })
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
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
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

  const startDate = booking && booking.reservations[0]
  const endDate = booking && booking.reservations[booking.reservations.length - 1]

  const _renderSpaceCard = () => {
    return (
      <>
        <CardContainer>
          <CardImage src={_getCoverPhoto(listing)} onClick={() => history.push(`/space/${listing.id}`)} />
          <CardContent>
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
            <CardTitle>{listing.title}</CardTitle>
            <Text display="block" fontFamily="regular" fontSize="14px" color="greyscale.1">
              {`${listing.location.address1}, ${listing.location.city}`}
            </Text>
            <Box
              my="10px"
              display="grid"
              gridTemplateColumns={
                objectSpecifications && Object.keys(objectSpecifications).length >= 3 ? 'auto auto auto' : 'auto auto'
              }
            >
              {objectSpecifications && _renderSpecifications(objectSpecifications, listing.listingData)}
            </Box>
            <Box display="grid" gridAutoFlow="column">
              <Text fontSize="14px">
                From:{' '}
                <Text fontSize="16px" fontFamily="bold">
                  {`${listing.listingData.currency}$${listing.listingData.basePrice}`}
                </Text>{' '}
                {listing.bookingPeriod}
              </Text>
              <Box justifySelf="end" display="flex" alignItems="center">
                <Avatar width="30px" height="30px" image={listing.user.profile && listing.user.profile.picture} />
                <Text fontSize="12px" ml="10px" fontFamily="medium">
                  {`${listing.user.profile && listing.user.profile.firstName}`}
                </Text>
              </Box>
            </Box>
          </CardContent>
        </CardContainer>
      </>
    )
  }

  return (
    <Wrapper>
      <Helmet title="Itinerary - Spacenow" />
      <Box mb="50px" mt={{ _: "20px", medium: "10px" }}>
        <Title title="You're all booked in." color="#6adc91" noMargin type="h2" />
        <Title title="Enjoy your space!" noMargin type="h2" />
      </Box>
      <GridStyled columns="420px auto" columnGap="45px">
        <Cell>
          {isListingLoading ? <Loader sm /> : _renderSpaceCard()}
          <Box mt="20px">
            <ButtonStyled outline onClick={() => history.push(`/account/booking`)}>
              View Bookings
            </ButtonStyled>
          </Box>
        </Cell>
        <Cell>
          <Grid columns={12} rows={'auto'} columnGap="20px">
            <CellStyled width={8}>
              <ButtonStyled fluid disabled color="#172439 !important">
                {`Reservation Code: ${booking.confirmationCode.toString()}`}
              </ButtonStyled>
            </CellStyled>
            <CellStyled width={4}>
              <ButtonStyled onClick={() => history.push(`/receipt/${booking.bookingId}`)} fluid>
                See your receipt
              </ButtonStyled>
            </CellStyled>
            {isListingLoading ? (
              <Loader sm />
            ) : (
                <>
                  <Cell width={12}>
                    <Title
                      type="h4"
                      title={listing.title}
                      subtitle={`${listing.location.city}, ${listing.location.country}`}
                      subTitleMargin={5}
                    />
                  </Cell>
                  <Cell width={12}>
                    <Title
                      type="h6"
                      title="Address"
                      noMargin
                      subtitle={`${listing.location.address1}, ${listing.location.city}, ${listing.location.zipcode}, ${listing.location.state}, ${listing.location.country}`}
                      subTitleMargin={5}
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

            <CellStyled width={10}>
              {isListingLoading ? (
                <Loader sm />
              ) : (
                  <Box my="30px">
                    <TimeTable
                      data={listing.accessDays.listingAccessHours}
                      error={_getWeekName(listing.accessDays) === 'Closed'}
                    />
                  </Box>
                )}
            </CellStyled>
          </Grid>
        </Cell>
      </GridStyled>
    </Wrapper>
  )
}

ItineraryPage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default ItineraryPage
