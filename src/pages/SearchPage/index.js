import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'
import { isSameDay } from 'date-fns'
import _ from 'lodash'
import { capitalize } from 'utils/strings'

import {
  NavBar,
  Line,
  Title,
  Text,
  Input,
  Button,
  Box,
  Checkbox,
  MapSearch,
  Slider,
  Switch,
  Loader,
  DatePicker,
  Calendar
} from 'components'

import { Manager, Reference, Popper } from 'react-popper'
import numeral from 'numeral'

import { onSearch, onQuery } from 'redux/ducks/search'

import { cropPicture } from 'utils/images'

import ListResults from './ListResults'

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto 1fr;
  grid-column-gap: 15px;
  padding: 0 20px;

  @media only screen and (max-width: 575px) {
    display: ${props => (props.show ? 'grid' : 'none')};
    grid-gap: 10px;
    padding: 0 20px;
    grid-template-columns: none;

    button {
      width: 100% !important;
    }
  }
`

const ContainerResults = styled.div`
  display: grid;
  grid-template-columns: ${({ showMap }) => (showMap ? 'auto 1fr' : 'auto')};
  grid-column-gap: ${({ showMap }) => (showMap ? '40px' : '0')};
  width: 100%;
  height: calc(100vh - 245px);
  top: 312px;
  padding: 0 20px;

  @media (max-width: 945px) {
    grid-template-columns: 100%;
  }
`

const ContainerMap = styled.div`
  // margin-bottom: 20px;
  margin-top: -50px;

  .gm-style-iw-c {
    padding: 0 !important;
  }

  .gm-style-iw-d {
    overflow: hidden !important;
  }

  @media (max-width: 945px) {
    display: none;
  }
`

const ItemSwitchStyled = styled.div`
  height: 65px;
  border-radius: 6px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#c4c4c4')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  width: 189px;
  margin-top: 35px;
  margin-bottom: 35px;
`

const SwitchStyled = styled.div`
  display: grid;
  justify-self: end;
  height: 42px;
  border-radius: 6px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#c4c4c4')};
  padding: 9px 25px;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;

  @media (max-width: 945px) {
    display: none;
  }
`

const CalendarContainerDesktop = styled.div`
  @media only screen and (max-width: 991px) {
    display: none;
  }
`

const DatePickerMobile = styled(DatePicker)`
  display: none;
  @media only screen and (max-width: 991px) {
    display: block;
    padding: 10px;
  }
`

const getParamOrDefault = (location, param, defaultValue) => {
  const queryParams = new URLSearchParams(location)
  const value = queryParams.get(param)
  if (value === '' || value === 'undefined' || !value) return defaultValue
  return value
}

const cleaningLocation = value => {
  if (!value) return 'Sydney, AU'
  return value.replace('+', ' ')
}

const SearchPage = ({ history, location }) => {
  const dispatch = useDispatch()
  const refResults = useRef()

  const queryLat = getParamOrDefault(location.search, 'lat', '-33.8688197')
  const queryLng = getParamOrDefault(location.search, 'lng', '151.2092955')
  const queryCategory = getParamOrDefault(location.search, 'category', null)
  const queryLocation = cleaningLocation(getParamOrDefault(location.search, 'location', 'Sydney, AU'))

  const [selectedSpace, setSelectedSpace] = useState(null)
  const [shouldShowFilter, setShouldShowFilter] = useState(false)
  const [markers, setMarkers] = useState([])
  const [filterPrice, setFilterPrice] = useState([0, 0])
  const [filterInstantBooking, setFilterInstantBooking] = useState(false)
  const [showFilterBar, setShowFilterBar] = useState(false)
  const [filterDuration, setFilterDuration] = useState({
    hourly: false,
    daily: false,
    weekly: false,
    monthly: false
  })
  const [filterCategory, setFilterCategory] = useState({
    workspace: /workspace/i.test(queryCategory),
    meetingSpace: /meetingSpace/i.test(queryCategory),
    eventSpace: /eventSpace/i.test(queryCategory),
    parking: /parking/i.test(queryCategory),
    storage: /storage/i.test(queryCategory),
    retailAndHospitality: /retailAndHospitality/i.test(queryCategory)
  })
  const [showMap, setShowMap] = useState(true)
  const [filterSelectedDates, setFilterSelectedDates] = useState([])

  const { searchKey, result: searchResults, pagination, frequencies } = useSelector(
    state => state.search.get,
    shallowEqual
  )
  const isLoading = useSelector(state => state.search.isLoading)

  useLayoutEffect(() => {
    window.addEventListener('wheel', _onHandleScroll, true)
    return () => window.removeEventListener('wheel', _onHandleScroll, true)
  }, [])

  const _onHandleScroll = event => {
    event.deltaY > 0
      ? (refResults.current.scrollTop = refResults.current.scrollTop + event.deltaY)
      : (refResults.current.scrollTop = refResults.current.scrollTop + event.deltaY)
  }

  useEffect(() => {
    async function fetchData() {
      await dispatch(onSearch(queryLat, queryLng, queryCategory))
    }
    fetchData()
  }, [dispatch, queryLat, queryLng, queryCategory, queryLocation])

  useEffect(() => {
    setMarkers(
      searchResults.map(item => ({
        id: item.id,
        lat: +item.location.lat,
        lng: +item.location.lng,
        photo: _getCoverPhoto(item),
        title: item.title,
        price: item.listingData.basePrice,
        currency: item.listingData.currency || 'AUD',
        period: item.bookingPeriod,
        bookingType: item.listingData.bookingType,
        host: {
          photo: (item.host.profile && item.host.profile.picture) || '',
          name: (item.host.profile && item.host.profile.firstName) || 'User'
        }
      }))
    )
  }, [searchResults])

  const _toggleHover = object => {
    if (!object) {
      setSelectedSpace(null)
      return
    }
    setSelectedSpace({
      id: object.id,
      lat: +object.location.lat,
      lng: +object.location.lng,
      photo: _getCoverPhoto(object),
      title: object.title,
      price: `${object.listingData.currency || 'AUD'}$${object.listingData.basePrice}`,
      period: object.bookingPeriod,
      host: {
        photo: (object.host.profile && cropPicture(object.host.profile.picture)) || '',
        name: (object.host.profile && object.host.profile.firstName) || 'User'
      }
    })
  }

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

  const _onClickMarkerMap = object => {
    setSelectedSpace(object)
  }

  const _onChangeInputPrice = (e, type) => {
    const number = numeral(e.target.value)
    if (type === 'min') setFilterPrice([number.value(), filterPrice[1]])
    if (type === 'max') setFilterPrice([filterPrice[0], number.value()])
  }

  const _onQueryFilter = () => {
    const filters = {
      filterCategory,
      filterDuration,
      filterInstantBooking,
      filterPrice,
      filterSelectedDates
    }
    dispatch(onQuery(searchKey, filters))
    setShouldShowFilter(null)
  }

  const _onPagionationChange = page => {
    const filters = {
      filterCategory,
      filterDuration,
      filterInstantBooking,
      filterPrice,
      filterSelectedDates
    }
    if (!searchKey) {
      return
    }
    refResults.current.scrollTop = 0
    dispatch(onQuery(searchKey, filters, page))
  }

  const _onClickSelectDay = (day, { selected }) => {
    const copySelectedDates = [...filterSelectedDates]
    if (selected) {
      const selectedIndex = copySelectedDates.findIndex(selectedDay => isSameDay(selectedDay, day))
      copySelectedDates.splice(selectedIndex, 1)
    } else {
      copySelectedDates.push(day)
    }
    const arraySorted = _.sortBy([...copySelectedDates], item => item)
    setFilterSelectedDates(arraySorted)
  }

  const _parseCategory = category => {
    let response = category
    for (let i = 0; i < category.length; i += 1) {
      if (category[i] === category[i].toUpperCase()) {
        response = category.replace(category[i], ` ${category[i]}`)
        return capitalize(response)
      }
    }
    return capitalize(response)
  }

  const modifiers = {
    preventOverflow: { enabled: false },
    hide: { enabled: false }
  }

  return (
    <>
      <Box>
        <NavBar shownSearch history={history} />
        <Line marginTop={0} />
        <Box display={{ _: 'block', small: 'none' }} mx="20px" mb="20px">
          <Button fluid size="sm" onClick={() => setShowFilterBar(!showFilterBar)}>
            {showFilterBar ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>
        <FilterBar show={showFilterBar}>
          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button
                    outline
                    size="sm"
                    ref={ref}
                    onClick={() => {
                      if (shouldShowFilter === 'dates') setShouldShowFilter(false)
                      else setShouldShowFilter('dates')
                    }}
                  >
                    Dates
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'dates' && (
              <Popper placement="top-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <Box
                      ref={ref}
                      style={{ ...style, zIndex: 5000000 }}
                      width={{ _: '90vw', small: 'auto' }}
                      data-placement={placement}
                    >
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        marginTop="10px"
                        zIndex="2000001"
                      >
                        <div>
                          <CalendarContainerDesktop>
                            <Calendar
                              fromMonth={new Date()}
                              handleDayClick={_onClickSelectDay}
                              selectedDays={filterSelectedDates}
                              disabledDays={[]}
                              daysOfWeek={[]}
                              colorSelected="#6adc91"
                            />
                          </CalendarContainerDesktop>
                          <DatePickerMobile
                            date={null}
                            handleDateChange={_onClickSelectDay}
                            hideOnDayClick={false}
                            placeholder="Choose Dates"
                            colorSelected="#6adc91"
                            dayPickerProps={{
                              selectedDays: filterSelectedDates,
                              modifiers: {
                                disabled: [
                                  {
                                    daysOfWeek: []
                                  },
                                  {
                                    before: new Date()
                                  }
                                ]
                              }
                            }}
                          />
                        </div>
                        <Box display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button
                    outline
                    size="sm"
                    ref={ref}
                    onClick={() => {
                      if (shouldShowFilter === 'category') setShouldShowFilter(false)
                      else setShouldShowFilter('category')
                    }}
                  >
                    Category
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'category' && (
              <Popper placement="top-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <Box
                      ref={ref}
                      style={{ ...style, zIndex: 5000000 }}
                      width={{ _: '90vw', small: 'auto' }}
                      data-placement={placement}
                    >
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        marginTop="10px"
                        zIndex="2000001"
                      >
                        <div>
                          <Checkbox
                            label={<Text fontFamily="bold">Workspace</Text>}
                            checked={filterCategory.workspace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, workspace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking for a desk, office or coworking space
                          </Text>
                          <Checkbox
                            label={<Text fontFamily="bold">Meeting space</Text>}
                            checked={filterCategory.meetingSpace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, meetingSpace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking for a space to hold a meeting
                          </Text>
                          <Checkbox
                            label={<Text fontFamily="bold">Event space</Text>}
                            checked={filterCategory.eventSpace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, eventSpace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking for a space to hold an event
                          </Text>
                          <Checkbox
                            label={<Text fontFamily="bold">Parking</Text>}
                            checked={filterCategory.parking}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, parking: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking for a place to park my vehicle
                          </Text>
                          <Checkbox
                            label={<Text fontFamily="bold">Storage</Text>}
                            checked={filterCategory.storage}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, storage: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking for a place to store items or goods
                          </Text>
                          <Checkbox
                            label={<Text fontFamily="bold">Retail & Hospitality</Text>}
                            checked={filterCategory.retailAndHospitality}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, retailAndHospitality: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="20px">
                            I’m looking to rent a place for business
                          </Text>
                        </div>
                        <Box display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button
                    outline
                    size="sm"
                    ref={ref}
                    onClick={() => {
                      if (shouldShowFilter === 'duration') setShouldShowFilter(false)
                      else setShouldShowFilter('duration')
                    }}
                  >
                    Frequency
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'duration' && (
              <Popper placement="top-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <Box
                      ref={ref}
                      style={{ ...style, zIndex: 5000000 }}
                      width={{ _: '90vw', small: 'auto' }}
                      data-placement={placement}
                    >
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        marginTop="10px"
                        zIndex="2000001"
                      >
                        <div>
                          {frequencies.includes('hourly') && (
                            <>
                              <Checkbox
                                label={<Text fontFamily="bold">Hourly</Text>}
                                checked={filterDuration.hourly}
                                handleCheckboxChange={(e, { checked }) =>
                                  setFilterDuration({ ...filterDuration, hourly: !checked })
                                }
                              />
                              <Text display="block" ml="28px" mb="20px">
                                I want to find space on a hourly basis
                              </Text>
                            </>
                          )}
                          {frequencies.includes('daily') && (
                            <>
                              <Checkbox
                                label={<Text fontFamily="bold">Daily</Text>}
                                checked={filterDuration.daily}
                                handleCheckboxChange={(e, { checked }) =>
                                  setFilterDuration({ ...filterDuration, daily: !checked })
                                }
                              />
                              <Text display="block" ml="28px" mb="20px">
                                I want to find space on a daily basis
                              </Text>
                            </>
                          )}
                          {frequencies.includes('weekly') && (
                            <>
                              <Checkbox
                                label={<Text fontFamily="bold">Weekly</Text>}
                                checked={filterDuration.weekly}
                                handleCheckboxChange={(e, { checked }) =>
                                  setFilterDuration({ ...filterDuration, weekly: !checked })
                                }
                              />
                              <Text display="block" ml="28px" mb="20px">
                                I want to find space on a weekly basis
                              </Text>
                            </>
                          )}
                          {frequencies.includes('monthly') && (
                            <>
                              <Checkbox
                                label={<Text fontFamily="bold">Monthly</Text>}
                                checked={filterDuration.monthly}
                                handleCheckboxChange={(e, { checked }) =>
                                  setFilterDuration({ ...filterDuration, monthly: !checked })
                                }
                              />
                              <Text display="block" ml="28px" mb="20px">
                                I want to find space on a monthly basis
                              </Text>
                            </>
                          )}
                        </div>
                        <Box display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button
                    outline
                    size="sm"
                    ref={ref}
                    onClick={() => {
                      if (shouldShowFilter === 'price') setShouldShowFilter(false)
                      else setShouldShowFilter('price')
                    }}
                  >
                    Price
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'price' && (
              <Popper placement="bottom-start" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <Box
                      ref={ref}
                      style={{ ...style, zIndex: 5000000 }}
                      width={{ _: '90vw', small: 'auto' }}
                      data-placement={placement}
                    >
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        marginTop="10px"
                        zIndex="2000001"
                      >
                        <Text display="block" fontSize="14px">
                          Have a specific budget?
                        </Text>
                        <Text display="block" fontSize="14px">
                          Set the minimum and maximum price.
                        </Text>
                        <Box my="20px">
                          <Slider defaultValue={filterPrice} value={filterPrice} handleChange={setFilterPrice} />
                        </Box>
                        <Box display="grid" gridTemplateColumns="1fr auto 1fr" gridColumnGap="15px" alignItems="center">
                          <Input
                            label="Min"
                            value={numeral(filterPrice[0]).format('$0,0[.]00')}
                            onChange={e => _onChangeInputPrice(e, 'min')}
                          />
                          <Text mt="30px">To</Text>
                          <Input
                            label="Max"
                            value={numeral(filterPrice[1]).format('$0,0[.]00')}
                            onChange={e => _onChangeInputPrice(e, 'max')}
                          />
                        </Box>
                        <Box mt="30px" display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button
                    outline
                    size="sm"
                    ref={ref}
                    onClick={() => {
                      if (shouldShowFilter === 'instantBooking') setShouldShowFilter(false)
                      else setShouldShowFilter('instantBooking')
                    }}
                  >
                    Instant Booking
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'instantBooking' && (
              <Popper placement="bottom-start" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <Box
                      ref={ref}
                      style={{ ...style, zIndex: 5000000 }}
                      width={{ _: '90vw', small: 'auto' }}
                      data-placement={placement}
                    >
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        marginTop="10px"
                        zIndex="2000001"
                      >
                        <Text display="block">Book a space without waiting for host approval</Text>
                        <ItemSwitchStyled checked={filterInstantBooking}>
                          <span>Instant only</span>
                          <Switch
                            id="filterInstantBooking"
                            name="filterInstantBooking"
                            value={filterInstantBooking}
                            checked={filterInstantBooking === true}
                            handleCheckboxChange={(e, { checked }) => setFilterInstantBooking(checked)}
                          />
                        </ItemSwitchStyled>
                        <Box display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )
                }}
              </Popper>
            )}
          </Manager>
          <Manager>
            <SwitchStyled showMap={showMap}>
              <Text>Show map</Text>
              <Switch
                id="showMap"
                name="showMap"
                value={showMap}
                checked={showMap === true}
                handleCheckboxChange={(e, { checked }) => setShowMap(checked)}
              />
            </SwitchStyled>
          </Manager>
        </FilterBar>
        <Line />
        <Box ml="25px" my="25px">
          <Title
            type="h5"
            noMargin
            title={
              <Text>
                {(queryCategory && _parseCategory(queryCategory)) || 'Showing results '} around{' '}
                <Text color="primary">{queryLocation.substr(0, queryLocation.indexOf(','))}</Text>
              </Text>
            }
          />
        </Box>
      </Box>
      {(isLoading || shouldShowFilter) && (
        <Box
          height="100vh"
          width="100%"
          top={{ _: '223px', sm: '135px' }}
          zIndex="2000000"
          bg="rgba(255, 255, 255, 0.85)"
          left="0"
          right="0"
          position="absolute"
          onClick={() => setShouldShowFilter(false)}
        >
          {isLoading && <Loader text="Searching" />}
        </Box>
      )}
      <ContainerResults showMap={showMap}>
        <ListResults
          ref={refResults}
          markers={searchResults}
          onHoverItem={_toggleHover}
          history={history}
          pagination={pagination}
          onPageChanged={_onPagionationChange}
          showMap={showMap}
        />
        {showMap && (
          <ContainerMap>
            <MapSearch
              history={history}
              position={{ lat: queryLat, lng: queryLng }}
              markers={markers}
              onClickMarker={_onClickMarkerMap}
              selectedMarker={selectedSpace}
            />
          </ContainerMap>
        )}
      </ContainerResults>
    </>
  )
}

export default SearchPage
