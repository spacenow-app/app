import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { isSameDay, format } from 'date-fns'
import StarRatingComponent from 'react-star-rating-component'

import { capitalize, toPlural } from 'utils/strings'

import {
  Wrapper,
  Title,
  Grid,
  Cell,
  TimeTable,
  Map,
  Tag,
  Box,
  Icon,
  Highlights,
  Loader,
  CarouselListing,
  Carousel,
  UserDetails,
  BookingCard,
  Checkbox,
  Button,
  Footer,
  CardSearch,
  Price,
  Review
} from 'components'

import {
  onGetListingById,
  onGetAllSpecifications,
  onCleanAvailabilitiesByListingId,
  onGetAvailabilitiesByListingId,
  onClaimListing
} from 'redux/ducks/listing'

import { onSearch } from 'redux/ducks/search'

import { onCreateBooking, onGetPendingBooking, onGetHourlyAvailability } from 'redux/ducks/booking'

import { openModal, TypesModal } from 'redux/ducks/modal'

import { sendMail } from 'redux/ducks/mail'

import { onGetPublicReviews } from 'redux/ducks/reviews'

import config from 'variables/config'

import WeeklyBooking from './WeeklyBooking'
import DailyBooking from './DailyBooking'
import MonthlyBooking from './MonthlyBooking'
import PendingBooking from './PenidngBooking'
import HourlyBooking from './HourlyBooking'

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
  }
`

const IconBoxStyled = styled.div`
  background: #6adc91;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  float: left;
  margin-right: 10px;
`

const ReportSpaceStyled = styled.span`
  font-family: Montserrat-SemiBold;
  font-size: 12px;
  cursor: pointer;
`

const BottomButtonMobile = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  border-top: 1px solid #c4c4c4;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`

const CellStyled = styled(Cell)`
  @media only screen and (max-width: 991px) {
    grid-column-end: span 12;
    &&& {
      h4 {
        text-align: left;
      }
    }
  }
`

const SimilarSpacesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 25px;
  grid-row-gap: 25px;

  @media (max-width: 945px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`

const TitleStarContainer = styled.div`
  font-size: 24px;
  margin-top: 27px;
`

const StarContainer = styled.div`
  // .dv-star-rating-empty-star {
  //   color: #fff !important;
  // }
`

const Label = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  color: #172439;
`

const ContainerMobile = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const SpacePage = ({ match, location, history, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
  const { isCleaned: isCleanedAvailabilities } = useSelector(state => state.listing.cleanAvailabilities)
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const { array: availabilities } = useSelector(state => state.listing.availabilities)
  const { user } = useSelector(state => state.account.get)
  const { isAuthenticated } = useSelector(state => state.auth)
  const { isLoading: isLoadingOnCreateReservation } = useSelector(state => state.booking.create)
  const { object: pendingBooking } = useSelector(state => state.booking.pending)
  const { similar: similarResults } = useSelector(state => state.search)
  const { public: publicReviews } = useSelector(state => state.reviews.get)

  const [datesSelected, setDatesSelected] = useState([])
  const [date, setDate] = useState('')
  const [period, setPeriod] = useState(1)
  const [imageHeight, setImageHeight] = useState(500)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('09:00')
  const [hourlyError, setHourlyError] = useState('')

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, null, true))
    dispatch(onCleanAvailabilitiesByListingId(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    listing && dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
    listing && user && user.id && dispatch(onGetPendingBooking(listing.id, user.id))
  }, [dispatch, listing, user])

  useEffect(() => {
    listing && dispatch(onGetAvailabilitiesByListingId(listing.id))
  }, [dispatch, listing, pendingBooking, isCleanedAvailabilities])

  useEffect(() => {
    if (location.state) {
      setDatesSelected(location.state.reservations)
      setDate(location.state.reservations[0])
      location.state.period && setPeriod(location.state.period)
    }
  }, [location])

  useEffect(() => {
    if (window.innerWidth <= 991) {
      setImageHeight(325)
    }
  }, [])

  useEffect(() => {
    listing &&
      dispatch(
        onSearch(listing.location.lat, listing.location.lng, false, listing.settingsParent.category.id.toString(), 3)
      )
  }, [dispatch, listing])

  useEffect(() => {
    listing && dispatch(onGetPublicReviews(listing.id))
  }, [dispatch, listing])

  if (listing && listing.user.provider === 'wework') {
    history.push(`/space/partner/${match.params.id}`)
  }

  if (isListingLoading) {
    return <Loader text="Loading listing view" />
  }

  const _getAddress = address => {
    const { address1 = '', city = '', zipcode = '', state = '', country = '' } = address
    const convertedAddress = `${address1 ? `${address1}, ` : ''} ${city ? `${city}, ` : ''} ${
      zipcode ? `${zipcode}, ` : ''
    } ${state ? `${state}, ` : ''} ${country ? `${country}` : ''}`
    return convertedAddress.replace(/\0.*$/g, '')
  }

  const _parseCategoryIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  const _getWeekName = days => {
    const { mon, tue, wed, thu, fri, sat, sun } = days
    if (mon && tue && wed && thu && fri && !sat && !sun) return 'Weekdays'
    if (!mon && !tue && !wed && !thu && !fri && sat && sun) return 'Weekends'
    if (mon && tue && wed && thu && fri && sat && sun) return 'Everyday'
    if (!mon && !tue && !wed && !thu && !fri && !sat && !sun) return 'Closed'
    return 'Custom'
  }

  const _onClaimListing = () => dispatch(onClaimListing(match.params.id, listing.title))

  const _renderHighLights = obj => {
    const array = Object.keys(obj).map(i => obj[i])

    return array.slice(0, 3).map((el, index) => {
      if (el.field === 'capacity') {
        const value = el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        return el.value === 0 ? null : (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-capacity" last={index === 2} />
        )
      }
      if (el.field === 'size') {
        const value = el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
        return el.value === 0 ? null : (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === 2} />
        )
      }
      if (el.field === 'meetingRooms') {
        const value = el.value === 0 ? 'None available' : `${el.value} available`
        return (
          <Highlights
            key={el.field}
            title={el.label}
            name={value.toString()}
            icon="specification-meetingroom-quantity"
            last={index === 2}
          />
        )
      }
      if (el.field === 'isFurnished') {
        const value = el.value === 0 ? 'No’' : 'Yes'
        const icon = el.value === 0 ? 'specification-furnished-no' : 'specification-furnished-yes'
        return <Highlights key={el.field} title={el.label} name={value} icon={icon} last={index === 2} />
      }
      if (el.field === 'carSpace') {
        // const value = el.value === 0 ? 'None available’' : `${el.value} available`
        // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
      }
      if (el.field === 'isFurnished') {
        // const value = el.value === 0 ? 'None available’' : `${el.value} available`
        // return <Highlights title={el.label} name={value} icon="category-desk" last={index === 2} />
      }
      return (
        <Highlights
          key={el.field}
          title={el.label}
          name={el.value.toString()}
          icon="category-desk"
          last={index === 2}
        />
      )
    })
  }

  const _changeToPlural = (string, number) => {
    if (!string) {
      return 'No Data'
    }
    if (string === 'daily') {
      return toPlural(capitalize('day'), number)
    }
    return toPlural(capitalize(string.slice(0, -2)), number)
  }

  const _convertedArrayPhotos = array => {
    return array.filter(el => el !== undefined).length > 0
      ? array
          .filter(el => el !== undefined)
          .map(el => ({
            source: `https://api-assets.prod.cloud.spacenow.com?width=800&heigth=500&format=jpeg&path=${el.name}`,
            isCover: el.isCover
          }))
      : []
  }

  const _onDateChangeArray = value => {
    const find = _.find(datesSelected, dateFromArray => isSameDay(new Date(dateFromArray), value))
    if (find) {
      _removeDate(value)
      return
    }
    const arraySorted = _.sortBy([...datesSelected, value], item => item)
    setDatesSelected(arraySorted)
  }

  const _onDateChange = value => setDate(value)

  const _removeDate = value => {
    const newArray = _.filter(datesSelected, dateFromArray => !isSameDay(new Date(dateFromArray), value))
    setDatesSelected(newArray)
  }

  const _handleChangePeriod = e => setPeriod(Number(e.target.value))

  const _returnArrayAvailability = accessDays => {
    const arr = []
    if (!accessDays.mon) arr.push(1)
    if (!accessDays.tue) arr.push(2)
    if (!accessDays.wed) arr.push(3)
    if (!accessDays.thu) arr.push(4)
    if (!accessDays.fri) arr.push(5)
    if (!accessDays.sat) arr.push(6)
    if (!accessDays.sun) arr.push(0)
    return arr
  }

  const _renderContentCard = (bookingPeriod, bookingType) => {
    if (pendingBooking && pendingBooking.items && pendingBooking.items.length > 0 && bookingType !== 'poa') {
      return (
        <PendingBooking
          booking={pendingBooking.items[0]}
          listing={listing.listingData}
          dispatch={dispatch}
          history={history}
        />
      )
    }
    if (bookingPeriod === 'hourly' && bookingType !== 'poa') {
      return (
        <>
          <HourlyBooking
            date={date}
            startTime={startTime}
            endTime={endTime}
            hoursQuantity={period}
            listingExceptionDates={availabilities}
            listingData={listing.listingData}
            onDateChange={_onDateChange}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            onSetStartTime={_onSetStartTime}
            onSetEndTime={_onSetEndTime}
            onCalcHourlyPeriod={_calcHourlyPeriod}
          />
          {hourlyError && (
            <Box color="error" ml="23px">
              {hourlyError}
            </Box>
          )}
        </>
      )
    }
    if (bookingPeriod === 'daily' && bookingType !== 'poa') {
      return (
        <div>
          <DailyBooking
            focus={!(datesSelected && datesSelected.length > 0)}
            onDateChange={_onDateChangeArray}
            datesSelected={datesSelected}
            removeDate={_removeDate}
            listingExceptionDates={availabilities}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            listingData={listing.listingData}
          />
          {_isPeriodValid(listing.bookingPeriod) && datesSelected.length >= 1 && (
            <Box color="error" ml="23px">
              {`Minimum ${listing.listingData.minTerm} days is required`}
            </Box>
          )}
        </div>
      )
    }
    if (bookingPeriod === 'weekly' && bookingType !== 'poa') {
      if (period < listing.listingData.minTerm) setPeriod(listing.listingData.minTerm)
      return (
        <WeeklyBooking
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          listingExceptionDates={availabilities}
          closingDays={_returnArrayAvailability(listing.accessDays)}
          listingData={listing.listingData}
        />
      )
    }
    if (bookingPeriod === 'monthly' && bookingType !== 'poa') {
      if (period < listing.listingData.minTerm) setPeriod(listing.listingData.minTerm)
      return (
        <MonthlyBooking
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          listingExceptionDates={availabilities}
          closingDays={_returnArrayAvailability(listing.accessDays)}
          listingData={listing.listingData}
        />
      )
    }
    return null
  }

  const _isPeriodValid = bookingPeriod => {
    if (user && user.userId === listing.userId) {
      return true
    }
    if (bookingPeriod === 'hourly') {
      return hourlyError !== '' || period <= 0 || !date
    }
    if (bookingPeriod === 'weekly') {
      if (date > 0 && period > 0) {
        return false
      }
      return true
    }
    if (bookingPeriod === 'monthly') {
      if (date > 0 && period > 0) {
        return false
      }
      return true
    }
    if (bookingPeriod === 'daily') {
      if (listing.listingData.minTerm > 0) {
        if (datesSelected.length >= listing.listingData.minTerm) {
          return false
        }
      } else {
        return !(datesSelected.length > 0)
      }
    }
    return true
  }

  const _onSubmitBooking = async () => {
    const object = {
      listingId: listing.id,
      hostId: listing.userId,
      guestId: (user && user.id) || null,
      basePrice: listing.listingData.basePrice,
      priceType: listing.bookingPeriod,
      currency: listing.listingData.currency,
      bookingType: listing.listingData.bookingType,
      reservations: listing.bookingPeriod === 'daily' ? datesSelected : [date],
      period: date ? period : datesSelected.length,
      isAbsorvedFee: listing.listingData.isAbsorvedFee,
      checkInHour: startTime,
      checkOutHour: endTime
    }
    if (!isAuthenticated) {
      history.push(`/auth/signin`, {
        from: {
          ...location,
          state: {
            period: object.period,
            reservations: object.reservations
          }
        }
      })
      return
    }
    dispatch(onCreateBooking(object, history))
  }

  const _reportSpace = () => {
    if (!isAuthenticated) {
      history.push(`/auth/signin`, { from: location })
      return
    }
    const options = {
      onConfirm: async values => {
        const sendData = values
        Object.assign(
          sendData,
          { spaceOwner: listing.user.profile.displayName },
          { spaceOwnerEmail: listing.user.email },
          { email: config.admin_email },
          { guest: `${user.profile.firstName} ${user.profile.lastName}` },
          { guestId: user.id },
          { spaceId: listing.id },
          { currentDate: format(new Date(), 'MMMM do, yyyy') }
        )

        const emailData = {
          template: 'report-listing',
          data: JSON.stringify(values)
        }

        await dispatch(sendMail(emailData))

        dispatch(
          openModal(TypesModal.MODAL_TYPE_WARN, {
            options: {
              title: 'Your report was sent, thank you!',
              text: 'Do not worry, we are on it.',
              handlerCallback: true,
              handlerTitle: 'Close'
            }
          })
        )
      }
    }
    dispatch(openModal(TypesModal.MODAL_TYPE_REPORT_LISTING, options))
  }

  const _calcHourlyPeriod = () => {
    if (date) {
      onGetHourlyAvailability(listing.id, date, startTime, endTime)
        .then(o => {
          setPeriod(o.hours)
          setHourlyError('')
          if (!o.isAvailable) {
            setHourlyError(`Not available in this period`)
          }
        })
        .catch(err => setHourlyError(err))
    }
  }

  const _onSetStartTime = value => setStartTime(value)

  const _onSetEndTime = value => setEndTime(value)

  const _getRatingAvg = () => {
    if (publicReviews) {
      const countReviews = publicReviews.length
      const totalRatings = publicReviews.map(o => o.rating).reduce((a, b) => a + b)
      return (totalRatings / countReviews).toFixed(2)
    }
    return 0
  }

  return (
    <>
      {imageHeight === 325 ||
      (listing.photos.length > 1 &&
        listing.settingsParent.category.otherItemName !== 'parking' &&
        listing.settingsParent.category.otherItemName !== 'storage') ? (
        <Box mb="30px">
          <CarouselListing photos={_convertedArrayPhotos(listing.photos)} />
        </Box>
      ) : null}
      <Wrapper>
        <Helmet title="View Listing - Spacenow" />
        <GridStyled columns="auto 350px" columnGap="35px" rowGap="30px">
          <Cell>
            <Grid columns={1} rowGap="15px">
              {listing.photos.length === 1 &&
                listing.settingsParent.category.otherItemName !== 'parking' &&
                listing.settingsParent.category.otherItemName !== 'storage' &&
                imageHeight !== 325 && <CarouselListing photos={_convertedArrayPhotos(listing.photos)} />}

              {imageHeight !== 325 &&
              (listing.settingsParent.category.otherItemName === 'parking' ||
                listing.settingsParent.category.otherItemName === 'storage') ? (
                <Carousel photos={_convertedArrayPhotos(listing.photos)} />
              ) : null}

              <Grid columns={12}>
                <Cell width={8} style={{ display: 'flex' }}>
                  <Box>
                    <Tag
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
                </Cell>
                {listing.listingData.bookingType && listing.listingData.bookingType !== 'poa' && (
                  <Cell width={4} style={{ justifySelf: 'end' }}>
                    <Tag>{capitalize(listing.listingData.bookingType)} Booking</Tag>
                  </Cell>
                )}
              </Grid>
              <Grid columns={12}>
                <CellStyled width={7}>
                  <Title
                    type="h4"
                    title={listing.title}
                    subtitle={_getAddress(listing.location)}
                    subTitleSize={18}
                    subTitleMargin={20}
                    noMargin
                  />
                </CellStyled>
                <CellStyled width={5} center>
                  <Price
                    currency={listing.listingData.currency}
                    price={listing.listingData.basePrice}
                    currencySymbol="$"
                    bookingPeriod={listing.bookingPeriod}
                    bookingType={listing.listingData.bookingType}
                    size="28px"
                    right
                  />
                </CellStyled>
              </Grid>

              <Box>
                <Title type="h5" title="Highlights" />
                <Grid columns="repeat(auto-fit, minmax(120px, 1fr))" rowGap="50px">
                  <Highlights
                    title="Minimum term"
                    name={_changeToPlural(
                      listing.bookingPeriod,
                      listing.listingData.minTerm ? listing.listingData.minTerm.toString() : '1'
                    )}
                    icon="specification-minimum-term"
                  />
                  <Highlights
                    title="Opening Days"
                    name={_getWeekName(listing.accessDays)}
                    icon="specification-opening-days"
                  />
                  {objectSpecifications && _renderHighLights(objectSpecifications)}
                </Grid>
              </Box>

              {listing.listingData.accessType && (
                <Box>
                  <Title
                    type="h5"
                    title="Access Information"
                    subtitle="How you’ll gain access to this space. Your host will provide the following upon successful bookings:"
                  />
                  <Box
                    display="grid"
                    width="110px"
                    height="130px"
                    justifyContent="center"
                    textAlign="center"
                    fontFamily="MontSerrat-SemiBold"
                    fontSize="14px"
                    color={listing.listingData.accessType ? 'quartenary' : 'error'}
                    border={listing.listingData.accessType ? '1px solid #c4c4c4' : 'error'}
                    borderRadius="10px"
                  >
                    <Icon
                      style={{ alignSelf: 'center', justifySelf: 'center' }}
                      width="50px"
                      fill="#6ADC91"
                      name={
                        listing.listingData.accessType &&
                        `access-type-${listing.listingData.accessType
                          .toLowerCase()
                          .split(' ')
                          .join('-')}`
                      }
                    />
                    {listing.listingData.accessType ? <>{listing.listingData.accessType}</> : 'No Data'}
                  </Box>
                </Box>
              )}

              {listing.listingData.description ? (
                <Box>
                  <Title type="h5" title="Description" />
                  <p>{listing.listingData.description}</p>
                </Box>
              ) : null}

              {listing.amenities.length > 0 && (
                <Box>
                  <Title type="h5" title="Amenities" />
                  <Grid columns="repeat(auto-fit, minmax(200px, auto))" rowGap="20px">
                    {listing.amenities.map(item => {
                      return (
                        <Box key={item.id} display="grid" gridTemplateColumns="auto 1fr" gridColumnGap="20px">
                          <Box width="54px" height="54px" borderRadius="100%" bg="primary">
                            <Icon
                              name={`amenitie-${item.settingsData.otherItemName}`}
                              width="70%"
                              height="100%"
                              style={{ display: 'block', margin: 'auto' }}
                            />
                          </Box>
                          <span style={{ alignSelf: 'center' }}>{item.settingsData.itemName}</span>
                        </Box>
                      )
                    })}
                  </Grid>
                </Box>
              )}

              {publicReviews && publicReviews.length > 0 && (
                <>
                  <Box display="grid" gridTemplateColumns="200px auto">
                    <Title type="h5" title={`Reviews (${publicReviews.length})`} />
                    <TitleStarContainer>
                      <StarRatingComponent
                        name="ratingOverall"
                        starCount={5}
                        value={4}
                        starColor="#6ADC91"
                        editing={false}
                      />
                    </TitleStarContainer>
                  </Box>
                  <ContainerMobile>
                    <Box display="grid" gridTemplateColumns="auto 1fr auto 1fr" gridColumnGap="20px">
                      <Label>Cleanliness</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarContainer>
                          <StarRatingComponent
                            name="ratingCleanliness"
                            starCount={5}
                            value={2}
                            starColor="#6ADC91"
                            editing={false}
                          />
                        </StarContainer>
                      </Cell>
                      <Label>Value</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarContainer>
                          <StarRatingComponent
                            name="ratingValue"
                            starCount={5}
                            value={2}
                            starColor="#6ADC91"
                            editing={false}
                          />
                        </StarContainer>
                      </Cell>
                      <Label>Check-in</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarContainer>
                          <StarRatingComponent
                            name="ratingCheckIn"
                            starCount={5}
                            value={2}
                            starColor="#6ADC91"
                            editing={false}
                          />
                        </StarContainer>
                      </Cell>
                      <Label>Location</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarContainer>
                          <StarRatingComponent
                            name="ratingLocation"
                            starCount={5}
                            value={2}
                            starColor="#6ADC91"
                            editing={false}
                          />
                        </StarContainer>
                      </Cell>
                    </Box>
                  </ContainerMobile>
                  {publicReviews.map(o => {
                    return (
                      <Review
                        id={o.id}
                        userName={o.author.profile && o.author.profile.firstName}
                        userPicture={o.author.profile && o.author.profile.picture}
                        date={new Date(o.createdAt)}
                        comment={o.reviewContent}
                        rating={o.rating}
                      />
                    )
                  })}
                </>
              )}

              {listing.rules.length > 0 && (
                <Box>
                  <Title type="h5" title="Space Rules" />
                  <Grid columns="repeat(auto-fit, minmax(200px, auto))" rowGap="20px">
                    {listing.rules.map(item => {
                      return <Checkbox disabled key={item.id} label={item.settingsData.itemName} name="rules" checked />
                    })}
                  </Grid>
                </Box>
              )}

              <Box>
                <Title type="h5" title="Availability" />
                <TimeTable
                  data={listing.accessDays.listingAccessHours}
                  error={_getWeekName(listing.accessDays) === 'Closed'}
                />
              </Box>
            </Grid>
          </Cell>
          <Cell id="booking-card">
            <BookingCard
              style={{ position: 'sticky', top: '1px' }}
              titleComponent={
                <Title
                  type="h5"
                  title={listing.title}
                  subtitle={_getAddress(listing.location)}
                  subTitleMargin={10}
                  noMargin
                />
              }
              contentComponent={
                <>
                  {_renderContentCard(listing.bookingPeriod)}
                  {(pendingBooking ? pendingBooking && pendingBooking.count === 0 : true) && (
                    <Button
                      onClick={e => _onSubmitBooking(e)}
                      isLoading={isLoadingOnCreateReservation}
                      disabled={_isPeriodValid(listing.bookingPeriod) || (user && user.id === listing.user.id)}
                      fluid
                    >
                      {listing.listingData.bookingType === 'request' ? 'Booking Request' : 'Reserve'}
                    </Button>
                  )}
                </>
              }
              footerComponent={
                <>
                  <UserDetails
                    hostname={`${listing.user.profile.firstName} ${listing.user.profile.lastName}`}
                    imageProfile={listing.user.profile.picture}
                    provider={listing.user.provider}
                    onClaim={_onClaimListing}
                    joined="2019"
                  />
                  <Box mt="15px">
                    <IconBoxStyled>
                      <Icon name="flag" width="10px" height="100%" style={{ paddingBottom: '5px' }} />
                    </IconBoxStyled>
                    <ReportSpaceStyled onClick={_reportSpace}>Report space</ReportSpaceStyled>
                  </Box>
                </>
              }
            />
          </Cell>
        </GridStyled>

        <Box mt="45px">
          <Title type="h5" title="Location" />
          <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
        </Box>

        {similarResults.length === 3 && (
          <Box mt="45px">
            <Title type="h5" title="See more similar spaces" />
            <SimilarSpacesContainer>
              {similarResults.map(item => {
                return <CardSearch item={item} key={item.id} />
              })}
            </SimilarSpacesContainer>
          </Box>
        )}

        <Footer />

        <BottomButtonMobile>
          <Grid columns={2} style={{ alignItems: 'center' }}>
            <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
              <Price
                currency={listing.listingData.currency}
                price={listing.listingData.basePrice}
                currencySymbol="$"
                bookingPeriod={listing.bookingPeriod}
                bookingType={listing.listingData.bookingType}
                size="18px"
                left
                lightPeriod
              />
            </Cell>
            <Cell justifySelf="self-end">
              <Button
                size="sm"
                onClick={() => {
                  document.getElementById('booking-card').scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Reserve
              </Button>
            </Cell>
          </Grid>
        </BottomButtonMobile>
      </Wrapper>
    </>
  )
}

SpacePage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default SpacePage
