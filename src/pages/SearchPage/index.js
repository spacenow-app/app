import React, { useEffect, useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'
import { NavBar, Line, Title, Text, Input, Button, Box, Checkbox, MapSearch, Slider, Switch } from 'components'
import { Manager, Reference, Popper } from 'react-popper'
import numeral from 'numeral'

import { onSearch } from 'redux/ducks/search'

import ListResults from './ListResults'

const SearchBar = styled(Box)`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 20px;
  width: 714px;
  padding: 0 20px;
`

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-column-gap: 30px;
  padding: 0 20px;
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
    grid-template-columns: auto;
  }
`

const ContainerMap = styled.div`
  background: tomato;
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
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
  width: 200px;
  margin-top: 35px;
  margin-bottom: 35px;
`

const SearchPage = () => {
  const dispatch = useDispatch()
  const [selectedSpace, setSelectedSpace] = useState(null)
  const [shouldShowFilter, setShouldShowFilter] = useState(false)
  const [markers, setMarkers] = useState([])
  const [filterPrice, setFilterPrice] = useState([50, 5000])
  const [filterInstantBooking, setFilterInstantBooking] = useState(false)
  const [filterDuration, setFilterDuration] = useState({
    hourly: true,
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

  const searchResults = useSelector(state => state.search.get.result, shallowEqual)

  useEffect(() => {
    async function fetchData() {
      await dispatch(onSearch())
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    setMarkers(
      searchResults.map(item => ({
        id: item.id,
        lat: +item.location.lat,
        lng: +item.location.lng
      }))
    )
  }, [searchResults])

  const _toggleHover = e => {
    if (!e) {
      setSelectedSpace(null)
      return
    }
    setSelectedSpace({
      id: e.id,
      lat: +e.location.lat,
      lng: +e.location.lng
    })
  }

  const _onClickMarkerMap = e => {
    setSelectedSpace({
      id: e.id,
      lat: +e.location.lat,
      lng: +e.location.lng
    })
  }

  const _onChangeInputPrice = (e, type) => {
    const number = numeral(e.target.value)
    if (type === 'min') setFilterPrice([number.value(), filterPrice[1]])
    if (type === 'max') setFilterPrice([filterPrice[0], number.value()])
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
          <Input size="sm" placeholder="Sydney, Australia" />
          <Button size="sm">Search</Button>
        </SearchBar>
        <Line />
        <FilterBar>
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
              <Popper placement="bottom-end" modifiers={modifiers} positionFixed>
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
                            label="Workspace"
                            checked={filterCategory.workspace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, workspace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking for a desk, office or coworking space
                          </Text>
                          <Checkbox
                            label="Meeting space"
                            checked={filterCategory.meetingSpace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, meetingSpace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking for a space to hold a meeting
                          </Text>
                          <Checkbox
                            label="Event space"
                            checked={filterCategory.eventSpace}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, eventSpace: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking for a space to hold an event
                          </Text>
                          <Checkbox
                            label="Parking"
                            checked={filterCategory.parking}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, parking: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking for a place to park my vehicle
                          </Text>
                          <Checkbox
                            label="Storage"
                            checked={filterCategory.storage}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, storage: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking for a place to store items or goods
                          </Text>
                          <Checkbox
                            label="Retail & Hospitality"
                            checked={filterCategory.retailAndHospitality}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterCategory({ ...filterCategory, retailAndHospitality: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I’m looking to rent a place for business
                          </Text>
                        </div>
                        <Button size="sm" outline onClick={() => setShouldShowFilter(null)}>
                          Save
                        </Button>
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
                        <div>
                          <Checkbox
                            label="Hourly"
                            checked={filterDuration.hourly}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterDuration({ ...filterDuration, hourly: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I want to find space on a hourly basis
                          </Text>
                          <Checkbox
                            label="Daily"
                            checked={filterDuration.daily}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterDuration({ ...filterDuration, daily: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I want to find space on a daily basis
                          </Text>
                          <Checkbox
                            label="Weekly"
                            checked={filterDuration.weekly}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterDuration({ ...filterDuration, weekly: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I want to find space on a weekly basis
                          </Text>
                          <Checkbox
                            label="Monthly"
                            checked={filterDuration.monthly}
                            handleCheckboxChange={(e, { checked }) =>
                              setFilterDuration({ ...filterDuration, monthly: !checked })
                            }
                          />
                          <Text display="block" ml="28px" mb="30px">
                            I want to find space on a monthly basis
                          </Text>
                        </div>
                        <Button size="sm" outline onClick={() => setShouldShowFilter(null)}>
                          Save
                        </Button>
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
                        <Box mt="30px">
                          <Button size="sm" outline onClick={() => setShouldShowFilter(null)}>
                            Save
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
                    Instant Booking
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
                        <Button size="sm" outline onClick={() => setShouldShowFilter(null)}>
                          Save
                        </Button>
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
                Showing resuls around <Text color="primary">Sydney</Text>
              </Text>
            }
          />
        </Box>
      </Box>
      {shouldShowFilter && (
        <Box
          height="100vh"
          width="100%"
          top="223px"
          zIndex="2000000"
          bg="rgba(255, 255, 255, 0.85)"
          left="0"
          right="0"
          position="fixed"
        />
      )}
      <ContainerResults>
        <ListResults markers={searchResults} onHoverItem={_toggleHover} />
        <ContainerMap>
          <MapSearch markers={markers} onClickMarker={_onClickMarkerMap} selectedMarker={selectedSpace} />
        </ContainerMap>
      </ContainerResults>
    </>
  )
}

export default SearchPage
