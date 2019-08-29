import React, { useState } from 'react'
import styled from 'styled-components'
import { NavBar, Line, Title, Text, Input, Button, Box, Checkbox, MapSearch } from 'components'
import { Manager, Reference, Popper } from 'react-popper'

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

const markesTemp = [
  {
    photo_id: 1,
    lat: -33.8914095,
    lng: 151.2495673
  },
  {
    photo_id: 2,
    lat: -33.8921913,
    lng: 151.2506929
  },
  {
    photo_id: 3,
    lat: -33.8916469,
    lng: 151.2496169
  },
  {
    photo_id: 4,
    lat: -33.8888924,
    lng: 151.2597286
  },
  {
    photo_id: 5,
    lat: -33.8888924,
    lng: 151.2597286
  },
  {
    photo_id: 6,
    lat: -33.9111068,
    lng: 151.2407872
  },
  {
    photo_id: 7,
    lat: -33.5781409,
    lng: 151.3430209
  },
  {
    photo_id: 8,
    lat: -28.15702,
    lng: 159.1054441
  },
  {
    photo_id: 9,
    lat: -37.5052801,
    lng: 140.9992793
  },
  {
    photo_id: 12,
    lat: -54.83376579999999,
    lng: 110.9510339
  },
  {
    photo_id: 123,
    lat: -9.187026399999999,
    lng: 159.2872223
  }
]

const SearchPage = () => {
  const [selectedSpace, setSelectedSpace] = useState(null)
  const [shouldShowFilter, setShouldShowFilter] = useState(false)

  const _toggleHover = e => {
    if (!e) {
      setSelectedSpace(null)
      return
    }
    setSelectedSpace(e)
  }

  const _onClickMarkerMap = e => {
    setSelectedSpace(e)
  }

  const modifiers = {
    flip: { enabled: false },
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
                        <ul>
                          <li>Workspace</li>
                          <li>Meeting space</li>
                          <li>Event space</li>
                          <li>Parking</li>
                          <li>Storage</li>
                          <li>Retail & Hospitality</li>
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
                      >
                        Price
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
        <ListResults markers={markesTemp} onHoverItem={_toggleHover} />
        <ContainerMap>
          <MapSearch markers={markesTemp} onClickMarker={_onClickMarkerMap} selectedMarker={selectedSpace} />
        </ContainerMap>
      </ContainerResults>
    </>
  )
}

export default SearchPage
