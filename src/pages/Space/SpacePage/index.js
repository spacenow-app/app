/* eslint-disable eqeqeq */
import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { isSameDay, format } from 'date-fns'

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
  Button,
  Footer,
  CardSearch,
  Price,
  Link,
  Review,
  StarRatingComponent,
  Pagination,
  Text
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

import { onCreateMessage } from 'redux/ducks/message'

// import GraphCancelattionImage from 'pages/Listing/SpaceDetailsPage/CancellationTab/graph_cancellation.png'
import { onGetPublicReviews } from 'redux/ducks/reviews'

import config from 'variables/config'

import WeeklyBooking from './WeeklyBooking'
import DailyBooking from './DailyBooking'
import MonthlyBooking from './MonthlyBooking'
import PendingBooking from './PenidngBooking'
import HourlyBooking from './HourlyBooking'
import GenericForm from './GenericForm'
// import RequestForm from './RequestForm'

const GridStyled = styled(Grid)`
  @media only screen and (max-width: 991px) {
    grid-template-columns: 100%;
  }
`

const IconBoxStyled = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
  margin-top: 5px;
`

const ReportSpaceStyled = styled.span`
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

const ContainerPagination = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`

const SpacePage = ({ match, location, history, ...props }) => {
  const reviewRef = createRef()

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
  const { public: publicReviews, totalPages } = useSelector(state => state.reviews.get)

  const [datesSelected, setDatesSelected] = useState([])
  const [date, setDate] = useState('')
  const [period, setPeriod] = useState(1)
  const [imageHeight, setImageHeight] = useState(500)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('09:00')
  const [message, setMessage] = useState('')
  const [hourlyError, setHourlyError] = useState('')
  const [focusInput, setFocusInput] = useState(false)
  const [isValid, setIsValid] = useState(true)

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

  const _getSuburb = address => {
    const { city = '' } = address
    const convertedAddress = `${city ? `${city}` : ''}`
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
    let array = Object.keys(obj).map(i => obj[i])
    array = array.filter(el => el.value !== 0)
    const arrayLen = array.length
    let last = 2
    if (arrayLen < 3) {
      last = arrayLen - 1
    }
    return array.slice(0, 3).map((el, index) => {
      if (el.field === 'capacity') {
        const value = el.value == 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        return el.value == 0 ? null : (
          <Highlights
            key={el.field}
            title={el.label}
            name={value}
            icon="specification-capacity"
            last={index === last}
          />
        )
      }
      if (el.field === 'size') {
        const value = el.value == 0 ? 'Not mentioned' : `${el.value} sqm`
        return el.value == 0 ? null : (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === last} />
        )
      }
      if (el.field === 'meetingRooms') {
        const value = el.value == 0 ? 'None available' : `${el.value} available`
        return (
          <Highlights
            key={el.field}
            title={el.label}
            name={value.toString()}
            icon="specification-meetingroom-quantity"
            last={index === last}
          />
        )
      }
      if (el.field === 'isFurnished') {
        const value = el.value == 0 ? 'No' : 'Yes'
        const icon = el.value == 0 ? 'specification-furnished-no' : 'specification-furnished-yes'
        return <Highlights key={el.field} title={el.label} name={value} icon={icon} last={index === last} />
      }
      if (el.field === 'carSpace') {
        const value = el.value == 0 ? 'None available' : `${el.value} available`
        return el.value == 0 ? null : (
          <Highlights title={el.label} name={value} icon="specification-car-park" last={index === last} />
        )
      }
      if (el.field === 'spaceType') {
        const value = el.value == 0 ? 'None available' : `${el.value}`
        return (
          <Highlights
            title={el.label}
            name={value}
            icon={value === 'Covered' ? 'specification-covered' : 'specification-uncovered'}
            last={index === last}
          />
        )
      }
      return (
        <Highlights
          key={el.field}
          title={el.label}
          name={el.value.toString()}
          icon="category-desk"
          last={index === last}
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

  const _onDayPickerHide = () => {
    setFocusInput(false)
  }

  const _onDateChange = value => { 
    setDate(value) 
  }

  const _removeDate = value => {
    const newArray = _.filter(datesSelected, dateFromArray => !isSameDay(new Date(dateFromArray), value))
    setDatesSelected(newArray)
  }

  const _handleChangePeriod = e => {
    setPeriod(Number(e.target.value))
  }

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
    if (listing.user.provider === 'generic') {
      return <GenericForm {...props} listing={listing} dispatch={dispatch} />
    }
    if (pendingBooking && pendingBooking.items && pendingBooking.items.length > 0 && bookingType !== 'poa') {
      return (
        <PendingBooking
          booking={pendingBooking.items[0]}
          bookingType={bookingType}
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
            inputFocus={focusInput}
            date={date}
            startTime={startTime}
            endTime={endTime}
            hoursQuantity={period}
            listingExceptionDates={availabilities}
            listingData={listing.listingData}
            onDateChange={_onDateChange}
            onDayPickerHide={_onDayPickerHide}
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
        <React.Fragment>
          <DailyBooking
            focus={!(datesSelected && datesSelected.length > 0)}
            inputFocus={focusInput}
            onDateChange={_onDateChangeArray}
            onDayPickerHide={_onDayPickerHide}
            setDatesSelected={setDatesSelected}
            datesSelected={datesSelected}
            removeDate={_removeDate}
            listingExceptionDates={availabilities}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            listingData={listing.listingData}
            message={message}
            handleMessageChange={_handleMessageChange}
          />
          {!isValid && (
            <Box color="error" ml="23px">
              {`Minimum ${listing.listingData.minTerm} days is required`}
            </Box>
          )}
        </React.Fragment>
      )
    }
    if (bookingPeriod === 'weekly' && bookingType !== 'poa') {
      if (period < listing.listingData.minTerm) setPeriod(listing.listingData.minTerm)
      return (
        <WeeklyBooking
          inputFocus={focusInput}
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          onDayPickerHide={_onDayPickerHide}
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
          inputFocus={focusInput}
          period={period}
          handleChangePeriod={_handleChangePeriod}
          date={date}
          onDateChange={_onDateChange}
          onDayPickerHide={_onDayPickerHide}
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
      return typeof date !== "object"
    }
    if (bookingPeriod === 'monthly') {
      return typeof date !== "object"
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
    if (_isPeriodValid(listing.bookingPeriod)) {
      setFocusInput(true)
      setIsValid(false)
      return
    }
    setIsValid(true)

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
      checkOutHour: endTime,
      message: message
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
          { hostName: listing.user.profile.displayName },
          { hostEmail: listing.user.email },
          { email: config.admin_email },
          { guest: `${user.profile.firstName} ${user.profile.lastName}` },
          { guestEmail: user.email },
          { guestId: user.id },
          { spaceId: listing.id },
          { currentDate: format(new Date(), 'EEEE d MMMM, yyyy') },
          { listingPhoto: _convertedArrayPhotos(listing.photos)[0].source },
          { listingTitle: listing.title },
          { listingAddress: `${listing.location.address1}, ${listing.location.city}` },
          { basePrice: listing.listingData.basePrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') },
          { priceType: listing.bookingPeriod },
          { category: listing.settingsParent.category.otherItemName }
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

  const _contactHost = () => {
    const options = {
      onConfirm: _sendMessage
    }
    dispatch(openModal(TypesModal.MODAL_TYPE_SEND_MESSAGE, options))
  }

  const _sendMessage = content => {
    const values = {
      content,
      listingId: listing.id,
      guestId: user.id,
      hostId: listing.userId
    }
    dispatch(onCreateMessage(values))
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

  const _handleMessageChange = e => {
    setMessage(e.target.value)
  }

  const _getRatingAvg = field => {
    if (publicReviews) {
      const countReviews = publicReviews.length
      const totalRatings = publicReviews.map(o => o[`rating${field}`]).reduce((a, b) => a + b)
      return (totalRatings / countReviews).toFixed(2)
    }
    return 0
  }

  const _onPagionationChange = page => {
    reviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    dispatch(onGetPublicReviews(listing.id, page))
  }

  const _renderTextAccessInfo = accessType => {
    if (accessType === 'Person') {
      return <Text fontFamily="MontSerrat-Regular">You will be greeted at reception. Please present your email*</Text>
    }
    if (accessType === 'Swipe Card') {
      return <Text fontFamily="MontSerrat-Regular">You will need to collect a swipe card. Deposit may apply*</Text>
    }
    if (accessType === 'Host') {
      return <Text fontFamily="MontSerrat-Regular">You will be in contact with your host upon booking.</Text>
    }
    if (accessType === 'Keys') {
      return <Text fontFamily="MontSerrat-Regular">You will need to pick up keys. Deposit may apply*</Text>
    }
    if (accessType === 'Secure Code') {
      return <Text fontFamily="MontSerrat-Regular">You will need to type your secure code to access the space.</Text>
    }
    return <Text fontFamily="MontSerrat-Regular">Details of entry will be issued upon successful booking.</Text>
  }

  const _renderTitleAccessInfo = accessType => {
    if (accessType === 'Person') {
      return <Text lineHeight={1}>{accessType} at reception</Text>
    }
    if (accessType === 'Host') {
      return <Text lineHeight={1}>{accessType} will meet you</Text>
    }
    return <Text lineHeight={1}>{accessType}</Text>
  }

  return (
    <>
      {imageHeight == 325 ||
      (listing.photos.length > 1 &&
        listing.settingsParent.category.otherItemName !== 'parking' &&
        listing.settingsParent.category.otherItemName !== 'storage') ? (
        <Box mb="30px">
          <CarouselListing photos={_convertedArrayPhotos(listing.photos)} />
        </Box>
      ) : null}
      <Wrapper>
        <Helmet title={`${listing.title} / ${_getSuburb(listing.location)}`} />
        <GridStyled columns="auto 350px" columnGap="35px" rowGap="30px">
          <Cell>
            <Grid columns={1} rowGap="15px">
              {listing.photos.length == 1 &&
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
                <CellStyled width={12}>
                  <Title
                    type="h4"
                    title={listing.title}
                    subtitle={_getAddress(listing.location)}
                    subTitleSize={18}
                    subTitleMargin={20}
                    noMargin
                  />
                </CellStyled>
                {/* <CellStyled width={5} center>
                  <Price
                    currency={listing.listingData.currency}
                    price={listing.listingData.basePrice}
                    currencySymbol="$"
                    bookingPeriod={listing.bookingPeriod}
                    bookingType={listing.listingData.bookingType}
                    size="28px"
                    right
                  />
                </CellStyled> */}
              </Grid>

              <Box>
                <Title type="h5" title="Highlights" />
                <Grid columns="repeat(auto-fit, minmax(120px, 1fr))" rowGap="50px">
                  <Highlights
                    title="Minimum term"
                    name={_changeToPlural(
                      listing.bookingPeriod,
                      listing.listingData.minTerm ? listing.listingData.minTerm : 1
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
                    subtitle="How you’ll gain access to this space. Your host will provide the following upon successful booking:"
                  />
                  <Box
                    display="grid"
                    width="278px"
                    height="170px"
                    gridTemplateRows="repeat(3, auto)"
                    padding="20px"
                    fontFamily="MontSerrat-SemiBold"
                    fontSize="14px"
                    color={listing.listingData.accessType ? 'quartenary' : 'error'}
                    border={listing.listingData.accessType ? '1px solid #c4c4c4' : 'error'}
                    borderRadius="10px"
                  >
                    <Box mb="10px">
                      <Icon
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
                    </Box>
                    {_renderTitleAccessInfo(listing.listingData.accessType)}
                    {_renderTextAccessInfo(listing.listingData.accessType)}
                  </Box>
                </Box>
              )}

              {listing.listingData.description ? (
                <Box>
                  <Title type="h5" title="Description" />
                  {listing.listingData.description.split('\n').map(o => (
                    <p>{o}</p>
                  ))}
                </Box>
              ) : null}
              {isAuthenticated && (
                <Box mt="20px" fontFamily="bold">
                  <Link to="#" onClick={_contactHost} style={{ textDecoration: 'underline' }}>
                    Contact host
                  </Link>
                </Box>
              )}

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
                  <Box display="grid" gridTemplateColumns="200px auto" ref={reviewRef}>
                    <Title type="h5" title={`Reviews (${publicReviews.length})`} />
                    <TitleStarContainer>
                      <StarRatingComponent name="ratingOverall" value={_getRatingAvg('Overall')} editing={false} />
                    </TitleStarContainer>
                  </Box>
                  <ContainerMobile>
                    <Box display="grid" gridTemplateColumns="auto 1fr auto 1fr" gridColumnGap="20px">
                      <Label>Cleanliness</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarRatingComponent
                          name="ratingCleanliness"
                          value={_getRatingAvg('Cleanliness')}
                          editing={false}
                        />
                      </Cell>
                      <Label>Value</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarRatingComponent name="ratingValue" value={_getRatingAvg('Value')} editing={false} />
                      </Cell>
                      <Label>Check-in</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarRatingComponent name="ratingCheckIn" value={_getRatingAvg('CheckIn')} editing={false} />
                      </Cell>
                      <Label>Location</Label>
                      <Cell style={{ alignContent: 'center', justifyContent: 'left', display: 'grid' }}>
                        <StarRatingComponent name="ratingLocation" value={_getRatingAvg('Location')} editing={false} />
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

              <ContainerPagination>
                <Pagination
                  totalPages={totalPages}
                  totalRecords={publicReviews.length}
                  onPageChanged={_onPagionationChange}
                />
              </ContainerPagination>

              {listing.rules.length > 0 && (
                <Box width="80%">
                  <Title type="h5" title="Space Rules" />
                  <Grid columns="repeat(auto-fit, minmax(200px, auto))" rowGap="20px">
                    {listing.rules.map(item => {
                      // return <Checkbox disabled key={item.id} label={item.settingsData.itemName} name="rules" checked />
                      return <Text>{item.settingsData.itemName} </Text>
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
                <>
                  <Price
                    price={listing.listingData.basePrice}
                    currencySymbol="$"
                    bookingPeriod={listing.bookingPeriod}
                    bookingType={listing.listingData.bookingType}
                    size="28px"
                    periodSize="11px"
                    left
                    lightPeriod
                    lightPrice
                  />
                  {publicReviews && publicReviews.length > 0 && (
                    <Box mb="-20px">
                      <Grid columns={12} alignContent="center">
                        <Cell width={4}>
                          <StarRatingComponent name="ratingOverall" value={_getRatingAvg('Overall')} editing={false} />
                        </Cell>
                        <Cell width={6}>
                          <Text fontSize="9px">
                            ({publicReviews.length} Review{(publicReviews.length > 1 && 's') || ''})
                          </Text>
                        </Cell>
                      </Grid>
                    </Box>
                  )}
                </>
              }
              contentComponent={
                <>
                  {_renderContentCard(listing.bookingPeriod, listing.listingData.bookingType)}
                  {(pendingBooking ? pendingBooking && pendingBooking.count == 0 : true) && (
                    <>
                      {listing.user.provider !== 'generic' && (
                        <Button
                          onClick={e => _onSubmitBooking(e)}
                          isLoading={isLoadingOnCreateReservation}
                          // disabled={_isPeriodValid(listing.bookingPeriod) || (user && user.id == listing.user.id)}
                          fluid
                        >
                          {listing.listingData.bookingType === 'request' ? 'Booking Request' : 'Reserve'}
                        </Button>
                      )}
                      <Box width="100%" textAlign="center">
                        <Text fontSize="11px">You won't be charged at this point</Text>
                      </Box>
                    </>
                  )}
                </>
              }
              footerComponent={
                <UserDetails
                  hostname={`${listing.user.profile.firstName} ${listing.user.profile.lastName}`}
                  imageProfile={listing.user.profile.picture}
                  provider={listing.user.provider}
                  onClaim={_onClaimListing}
                />
              }
              bottomComponent={
                <Grid columns={24} columnGap="1px">
                  <Cell width={7} />
                  <Cell width={2}>
                    <IconBoxStyled>
                      <Icon name="flag" width="10px" height="100%" style={{ paddingBottom: '5px' }} />
                    </IconBoxStyled>
                  </Cell>
                  <Cell width={15}>
                    <ReportSpaceStyled onClick={_reportSpace}>Report this listing</ReportSpaceStyled>
                  </Cell>
                </Grid>
              }
            />
          </Cell>
        </GridStyled>

        <Box mt="45px">
          <Title type="h5" title="Location" />
          <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
        </Box>

        {similarResults.length == 3 && (
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
