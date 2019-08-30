import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import { isSameDay } from 'date-fns'

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
  Carousel,
  UserDetails,
  BookingCard,
  Checkbox,
  Button
} from 'components'

import DailyBooking from './DailyBooking'
import WeeklyBooking from './WeeklyBooking'
import MonthlyBooking from './MonthlyBooking'
import PendingBooking from './PenidngBooking'
import ContactHost from './ContactHost'

import {
  onGetListingById,
  onGetAllSpecifications,
  onGetAllRules,
  onCleanAvailabilitiesByListingId,
  onGetAvailabilitiesByListingId
} from 'redux/ducks/listing'

import { onCreateBooking, onGetPendingBooking } from 'redux/ducks/booking'

import GraphCancelattionImage from 'pages/Listing/SpacePage/CancellationTab/graph_cancellation.png'

const ImageStyled = styled.img`
  width: 100%;
`

const SpacePage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing.get)
  const { array: arrayRules, isLoading: isLoadingRules } = useSelector(state => state.listing.rules)
  const { isCleaned: isCleanedAvailabilities } = useSelector(state => state.listing.cleanAvailabilities)
  const { object: objectSpecifications } = useSelector(state => state.listing.specifications)
  const { array: availabilities } = useSelector(state => state.listing.availabilities)
  const { user } = useSelector(state => state.auth)
  const { isLoading: isLoadingOnCreateReservation } = useSelector(state => state.booking.create)
  const { object: pendingBooking } = useSelector(state => state.booking.pending)

  const [datesSelected, setDatesSelected] = useState([])
  const [date, setDate] = useState('')
  const [period, setPeriod] = useState(1)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, null, true))
    dispatch(onCleanAvailabilitiesByListingId(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    if (listing) {
      dispatch(onGetAllRules())
      dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
    }
    if (listing && user && user.id) dispatch(onGetPendingBooking(listing.id, user.id))
    if(isCleanedAvailabilities && listing) dispatch(onGetAvailabilitiesByListingId(listing.id))
  }, [dispatch, listing, isCleanedAvailabilities, user])


  if(listing && listing.user.provider === 'wework') {
    props.history.push(`/space/partner/${match.params.id}`)
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
    if (mon && tue && wed && thu && fri & !sat && !sun) return 'Weekdays'
    if (!mon && !tue && !wed && !thu && !fri & sat && sun) return 'Weekends'
    if (mon && tue && wed && thu && fri & sat && sun) return 'Everyday'
    if (!mon && !tue && !wed && !thu && !fri & !sat && !sun) return 'Closed'
    return 'Custom'
  }

  const _renderHighLights = obj => {
    const array = Object.keys(obj).map(i => obj[i])

    return array.slice(0, 3).map((el, index) => {
      if (el.field === 'capacity') {
        const value = el.value === 0 ? 'Not mentioned' : `${toPlural('Person', el.value)}`
        return (
          <Highlights key={el.field} title={el.label} name={value} icon="specification-capacity" last={index === 2} />
        )
      }
      if (el.field === 'size') {
        const value = el.value === 0 ? 'Not mentioned' : `${el.value} sqm`
        return <Highlights key={el.field} title={el.label} name={value} icon="specification-size" last={index === 2} />
      }
      if (el.field === 'meetingRooms') {
        const value = el.value === 0 ? 'None available' : `${el.value} available`
        return (
          <Highlights
            key={el.field}
            title={el.label}
            name={value}
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
      return <Highlights key={el.field} title={el.label} name={el.value} icon="category-desk" last={index === 2} />
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
      ? array.filter(el => el !== undefined).map(el => ({ source: el.name }))
      : []
  }

  const _onDateChangeArray = date => {
    const find = _.find(datesSelected, dateFromArray => isSameDay(new Date(dateFromArray), date))
    if (find) {
      _removeDate(date)
      return
    }
    const arraySorted = _.sortBy([...datesSelected, date], item => item)
    setDatesSelected(arraySorted)
  }

  const _onDateChange = date => {
    setDate(date)
  }

  const _removeDate = date => {
    const newArray = _.filter(datesSelected, dateFromArray => !isSameDay(new Date(dateFromArray), date))
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

  const _renderContentCard = bookingPeriod => {
    if (pendingBooking && pendingBooking.bookings.length > 0) {
      return (
        <PendingBooking 
          booking={pendingBooking.bookings[0]} 
          listing={listing.listingData} 
          dispatch={dispatch} />
        )
    }
    if (bookingPeriod === 'hourly') {
      return <ContactHost user={user} dispatch={dispatch} />
    }
    if (bookingPeriod === 'daily') {
      return (
        <div>
          <DailyBooking
            {...props}
            dispatch={dispatch}
            focus={!(datesSelected && datesSelected.length > 0)}
            onDateChange={_onDateChangeArray}
            datesSelected={datesSelected}
            removeDate={_removeDate}
            listingExceptionDates={availabilities}
            closingDays={_returnArrayAvailability(listing.accessDays)}
            listingData={listing.listingData}
          />
           {_isPeriodValid(listing.bookingPeriod) && datesSelected.length >= 1 && (
              <Box color={'error'} ml={'23px'}>
                {`Minimum ${listing.listingData.minTerm} days is required`}
              </Box>
            )}
        </div>
      )
    }
    if (bookingPeriod === 'weekly') {
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

    if (bookingPeriod === 'monthly') {
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
    if (bookingPeriod === 'hourly') return true
    if (bookingPeriod === 'weekly') {
      if (date > 0 && period > 0) {
        return false
      } else {
        return true
      }
    }
    if (bookingPeriod === 'monthly') {
      if (date > 0 && period > 0) {
        return false
      } else {
        return true
      }
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

  const _onSubmitBooking = () => {
    if (!user) {
      props.history.push(`/login?refer=/space/${listing.id}`)
      return 
    }
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
      isAbsorvedFee: listing.listingData.isAbsorvedFee
    }
    dispatch(onCreateBooking(object))
  }

  return (
    <Wrapper>
      <Helmet title="View Listing - Spacenow" />
      <Box display="grid" gridTemplateColumns="1fr 380px" gridColumnGap="15px" my="80px">
        <Box display="grid" gridRowGap="50px">

          <Carousel photos={_convertedArrayPhotos(listing.photos)} />

          <Grid justifyContent="space-between" columnGap="10px" columns={2}>
            <Box display="flex" justifyContent="start">
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
            </Box>
            <Cell style={{ justifySelf: 'end' }}>
              <Tag>
                {listing.listingData.bookingType ? `${capitalize(listing.listingData.bookingType)} Booking` : 'No data'}
              </Tag>
            </Cell>
          </Grid>

          <Grid columns={5}>
            <Cell width={3}>
              <Title
                type="h4"
                title={listing.title ? listing.title : 'Input Title'}
                subtitle={_getAddress(listing.location)}
                subTitleSize={18}
                subTitleMargin={20}
                noMargin
              />
            </Cell>
            <Cell width={2} center>
              <Title
                type="h4"
                title={`$ ${Math.round((listing.listingData.basePrice || 0) * 100) / 100} ${
                  listing.bookingPeriod
                }`}
                noMargin
                right
                style={{ marginTop: '5px' }}
              />
            </Cell>
          </Grid>

          <Box>
            <Title type="h5" title="Highlights" />
            <Grid columns={5}>
              <Highlights
                title="Minimum term"
                name={_changeToPlural(listing.bookingPeriod, listing.listingData.minTerm)}
                icon="specification-minimum-term"
              />
              <Highlights
                title="Opening Days"
                name={_getWeekName(listing.accessDays)}
                icon="specification-opening-days"
                error={_getWeekName(listing.accessDays) === 'Closed'}
              />
              {objectSpecifications && _renderHighLights(objectSpecifications)}
            </Grid>
          </Box>
              
          <Box>
            <Title type="h5" title="Access Type" />
            <Box
              display="grid"
              border="1px solid"
              borderRadius="10px"
              width="110px"
              height="130px"
              justifyContent="center"
              textAlign="center"
              fontFamily="MontSerrat-SemiBold"
              fontSize="14px"
              color={listing.listingData.accessType ? 'quartenary' : 'error'}
              borderColor={listing.listingData.accessType ? 'greyscale.4' : 'error'}
            >
              <Icon
                style={{ alignSelf: 'center', justifySelf: 'center' }}
                width="50px"
                fill={'#6ADC91'}
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

          {
            listing.listingData.description ? 
              <Box>
                <Title type="h5" title="Description" />
                <p>{listing.listingData.description}</p>
              </Box> : null
          }
          {
            listing.amenities.length > 0 && (
              <Box>
                <Title type="h5" title="Amenities" />
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="40px">
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
                </Box>
              </Box>
          )}

          {
            listing.rules.length > 0 && (
              <Box>
                <Title type="h5" title="Space Rules" />
                <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridRowGap="20px">
                  {isLoadingRules ? (
                    <Loader />
                  ) : (
                    arrayRules.map(item => (
                      <Checkbox
                        disabled
                        key={item.id}
                        label={item.itemName}
                        name="rules"
                        value={item.id}
                        checked={listing.rules.some(rule => rule.listSettingsId === item.id)}
                      />
                    ))
                  )}
                </Box>
              </Box>
            )
          }

          <Box>
            <Title
              type="h5"
              title="Availability"
            />
            <TimeTable data={listing.accessDays.listingAccessHours} error={_getWeekName(listing.accessDays) === 'Closed'} />
          </Box>
        </Box>

        <Box>
          <BookingCard
            titleComponent={
            <Title type="h5" title={listing.title} subtitle={_getAddress(listing.location)} subTitleMargin={10} noMargin/>
            }
            contentComponent={<div>
              {_renderContentCard(listing.bookingPeriod)}
              {listing.bookingPeriod !== 'hourly' && (pendingBooking ? (pendingBooking && pendingBooking.count === 0) : true)  && (
                <Button
                  onClick={e => _onSubmitBooking(e)}
                  isLoading={isLoadingOnCreateReservation}
                  disabled={_isPeriodValid(listing.bookingPeriod)}
                  fluid
                >
                  {listing.listingData.bookingType === 'request' ? 'Booking Request' : 'Book Now'}
                </Button>
              )}
              </div>
            }
            footerComponent={
              <UserDetails hostname={listing.user.profile.displayName} imageProfile={listing.user.profile.picture} joined="2019"/>
            }
          />
        </Box>
      </Box>

      <Box mt="100px">
        <Title type="h5" title="Location" />
        <Map position={{ lat: Number(listing.location.lat), lng: Number(listing.location.lng) }} />
      </Box>

      <Box my="100px">
        <Cell>
          <Title type="h5" title="Cancellation Policy" />
        </Cell>
        <Cell>
          <Grid columns={12}>
            <Cell width={4}>
              <Title
                noMargin
                type="h4"
                title="No Cancellation"
                subTitleSize={16}
                subtitle="Guest cannot cancel their booking. Note: This may affect the number of bookings received."
              />
            </Cell>
            <Cell width={8}>
              <ImageStyled alt="Cancellation Policy" src={GraphCancelattionImage} />
            </Cell>
          </Grid>
        </Cell>
      </Box>
    </Wrapper>
  )
}

SpacePage.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
}

export default SpacePage
