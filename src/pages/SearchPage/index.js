import React, { useEffect, useState } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import styled from 'styled-components'
import { NavBar, Line, Title, Text, Input, Button, Box, Checkbox, MapSearch, Slider } from 'components'
import { Manager, Reference, Popper } from 'react-popper'

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

const SearchPage = () => {
  const dispatch = useDispatch()
  const [selectedSpace, setSelectedSpace] = useState(null)
  const [shouldShowFilter, setShouldShowFilter] = useState(false)
  const [markers, setMarkers] = useState([])
  const [filterPrice, setFilterPrice] = useState([50, 5000])

  const searchResults = useSelector(state => state.search.results, shallowEqual)

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
    console.log(e, type)
    const array = filterPrice
    array[type === 'min' ? 0 : 1] = +e.target.value
    setFilterPrice(array)
    console.log(array)
  }

  const modifiers = {
    flip: { enabled: false },
    preventOverflow: { enabled: false },
    hide: { enabled: false }
  }

  console.log('filterPrice', filterPrice)

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
              <Popper placement="bottom" modifiers={modifiers}>
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
                        marginLeft="100px"
                        zIndex="2000001"
                      >
                        <div>
                          <Checkbox label="Workspace" />
                          <Text>I’m looking for a desk, office or coworking space</Text>
                          <Checkbox label="Meeting space" />
                          <Text>I’m looking for a space to hold a meeting</Text>
                          <Checkbox label="Event space" />
                          <Text>I’m looking for a space to hold an event</Text>
                          <Checkbox label="Parking" />
                          <Text>I’m looking for a place to park my vehicle</Text>
                          <Checkbox label="Storage" />
                          <Text>I’m looking for a place to store items or goods</Text>
                          <Checkbox label="Retail & Hospitality" />
                          <Text>I’m looking to rent a place for business</Text>
                          <Button outline>Save</Button>
                        </div>
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
              <Popper placement="bottom" modifiers={modifiers}>
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
                        <ul>
                          <li>teste</li>
                        </ul>
                        <button type="button" onClick={() => setShouldShowFilter(null)}>
                          Save
                        </button>
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
              <Popper placement="bottom" modifiers={modifiers}>
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
                          <Input label="Min" value={filterPrice[0]} onChange={e => _onChangeInputPrice(e, 'min')} />
                          <Text>To</Text>
                          <Input label="Max" value={filterPrice[1]} onChange={e => _onChangeInputPrice(e, 'max')} />
                        </Box>

                        <button type="button" onClick={() => setShouldShowFilter(null)}>
                          Save
                        </button>
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
              <Popper placement="bottom" modifiers={modifiers}>
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
                        <Checkbox label="Instant bookings" />
                        <button type="button" onClick={() => setShouldShowFilter(null)}>
                          Save
                        </button>
                      </Box>
                    </div>
                  )
                }}
              </Popper>
            )}
          </Manager>
        </FilterBar>
        <Line />
        <Title
          type="h5"
          title={
            <Text>
              Showing resuls around <Text color="primary">Sydney</Text>
            </Text>
          }
        />
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
