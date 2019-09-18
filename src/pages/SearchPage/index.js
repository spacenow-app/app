import React, { useEffect, useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'

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
  AutoComplete,
  Loader
} from 'components'

import { Manager, Reference, Popper } from 'react-popper'
import numeral from 'numeral'

import { onSearch, onQuery } from 'redux/ducks/search'

import ListResults from './ListResults'

const SearchBar = styled(Box)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 20px;
  width: 714px;
  padding: 0 20px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-column-gap: 15px;
  padding: 0 20px;

  @media only screen and (max-width: 600px) {
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
  grid-template-columns: auto 1fr;
  grid-column-gap: 40px;
  width: 100%;
  height: calc(100vh - 312px);
  top: 312px;
  padding: 0 20px;

  @media (max-width: 945px) {
    grid-template-columns: 100%;
  }
`

const ContainerMap = styled.div`
  margin-bottom: 20px;

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
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#c4c4c4')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
  width: 200px;
  margin-top: 35px;
  margin-bottom: 35px;
`

const SearchPage = ({ history, location }) => {
  const dispatch = useDispatch()

  const [selectedSpace, setSelectedSpace] = useState(null)
  const [shouldShowFilter, setShouldShowFilter] = useState(false)
  const [markers, setMarkers] = useState([])
  const [address, setAddress] = useState('Sydney, AU')
  const [latLng, setLatLng] = useState({ lat: -33.8688197, lng: 151.2092955 })
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
    workspace: false,
    meetingSpace: false,
    eventSpace: false,
    parking: false,
    storage: false,
    retailAndHospitality: false
  })
  const { searchKey, result: searchResults, pagination } = useSelector(state => state.search.get, shallowEqual)
  const isLoading = useSelector(state => state.search.isLoading)

  const queryParams = new URLSearchParams(location.search)
  const lat = queryParams.get('lat') || '-33.8688197'
  const lng = queryParams.get('lng') || '151.2092955'
  const category = queryParams.get('category') || false

  useEffect(() => {
    async function fetchData() {
      await dispatch(onSearch(lat, lng, category))
    }
    fetchData()
  }, [dispatch, category, lat, lng])

  useEffect(() => {
    if (lat && lng) {
      setLatLng({ lat, lng })
      if (searchResults && searchResults.length > 0) {
        const firstLocation = searchResults[0].location
        setAddress(`${firstLocation.city}, ${firstLocation.country}`)
      }
    }
  }, [lat, lng, searchResults])

  useEffect(() => {
    if (category) {
      setFilterCategory({ ...filterCategory, [category]: true })
    }
  }, [filterCategory, category])

  useEffect(() => {
    setMarkers(
      searchResults.map(item => ({
        id: item.id,
        lat: +item.location.lat,
        lng: +item.location.lng,
        photo: _getCoverPhoto(item),
        title: item.title,
        price: `${item.listingData.currency || 'AUD'}$${item.listingData.basePrice}`,
        period: item.bookingPeriod,
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
        photo: (object.host.profile && object.host.profile.picture) || '',
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
      return photoCover.name
    }
    return object.photos[0].name
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
      filterPrice
    }
    dispatch(onQuery(searchKey, filters))
    setShouldShowFilter(null)
  }

  const _onSearch = (lat, lng, page = false) => {
    if (!lat && !lng) {
      toast.info('You must select a address!')
      return
    }
    dispatch(onSearch(lat, lng, page))
  }

  const _onSelectedAddess = obj => {
    const { position, address: objAddress } = obj
    if (position) {
      _onSearch(position.lat, position.lng)
      setLatLng(position)
    }
    if (objAddress) {
      setAddress(objAddress)
    }
  }

  const _onHandleError = () => {
    setLatLng({})
  }

  const _reset = () => {
    setLatLng({})
    setAddress('')
  }

  const _onPagionationChange = page => {
    const filters = {
      filterCategory,
      filterDuration,
      filterInstantBooking,
      filterPrice
    }
    if (!searchKey) {
      return
    }
    dispatch(onQuery(searchKey, filters, page))
  }

  const modifiers = {
    preventOverflow: { enabled: false },
    hide: { enabled: false }
  }

  return (
    <>
      <Box>
        <NavBar />
        <SearchBar>
          <AutoComplete
            searchOptions={{
              types: ['geocode']
            }}
            address={address}
            onChangeAddress={setAddress}
            onHandleError={_onHandleError}
            onSelectedAddess={_onSelectedAddess}
            disabled={latLng && (latLng.lat || latLng.lng)}
            closeButton={latLng && (latLng.lat || latLng.lng)}
            onClickCloseButton={_reset}
            size="sm"
            placeholder="Sydney, AU"
            label={null}
          />
          <Button size="sm" onClick={() => _onSearch(latLng.lat, latLng.lng)}>
            Search
          </Button>
        </SearchBar>
        <Line />
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
                  <Button outline size="sm" ref={ref} onClick={() => setShouldShowFilter('category')}>
                    Category
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'category' && (
              <Popper placement="top-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <div ref={ref} style={{ ...style, zIndex: 5000000 }} data-placement={placement}>
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        margin="10px"
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
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update Search
                          </Button>
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button outline size="sm" ref={ref} onClick={() => setShouldShowFilter('duration')}>
                    Duration
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'duration' && (
              <Popper placement="top-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <div ref={ref} style={{ ...style, zIndex: 5000000 }} data-placement={placement}>
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        margin="10px"
                        zIndex="2000001"
                      >
                        <div>
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
                        </div>
                        <Box display="flex" justifyContent="space-between">
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update Search
                          </Button>
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button outline size="sm" ref={ref} onClick={() => setShouldShowFilter('price')}>
                    Price
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'price' && (
              <Popper placement="bottom-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <div ref={ref} style={{ ...style, zIndex: 5000000 }} data-placement={placement}>
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        margin="10px"
                        zIndex="2000001"
                        width="400px"
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
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update Search
                          </Button>
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  )
                }}
              </Popper>
            )}
          </Manager>

          <Manager>
            <Reference>
              {({ ref }) => {
                return (
                  <Button outline size="sm" ref={ref} onClick={() => setShouldShowFilter('instantBooking')}>
                    Instant
                  </Button>
                )
              }}
            </Reference>
            {shouldShowFilter === 'instantBooking' && (
              <Popper placement="bottom-end" modifiers={modifiers}>
                {({ ref, style, placement, arrowProps }) => {
                  return (
                    <div ref={ref} style={{ ...style, zIndex: 5000000 }} data-placement={placement}>
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                      <Box
                        borderRadius="6px"
                        bg="white"
                        border="1px solid #cbcbcb"
                        padding="30px"
                        margin="10px"
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
                          <Button size="sm" outline onClick={_onQueryFilter}>
                            Update Search
                          </Button>
                          <Button size="sm" outline onClick={() => setShouldShowFilter(false)}>
                            Close
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  )
                }}
              </Popper>
            )}
          </Manager>
        </FilterBar>
        <Line />
        <Box ml="25px">
          <Title
            type="h5"
            title={
              <Text>
                Showing results around <Text color="primary">{address}</Text>
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
          position="fixed"
          onClick={() => setShouldShowFilter(false)}
        >
          {isLoading && <Loader text="Searching" />}
        </Box>
      )}
      <ContainerResults>
        <ListResults
          markers={searchResults}
          onHoverItem={_toggleHover}
          history={history}
          pagination={pagination}
          onPageChanged={_onPagionationChange}
        />
        <ContainerMap>
          <MapSearch
            history={history}
            position={latLng}
            markers={markers}
            onClickMarker={_onClickMarkerMap}
            selectedMarker={selectedSpace}
          />
        </ContainerMap>
      </ContainerResults>
    </>
  )
}

export default SearchPage
