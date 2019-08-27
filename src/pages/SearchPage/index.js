import React from 'react'
import styled from 'styled-components'
import { NavBar, Line, Title, Text, Input, Button, Box, Checkbox, Map } from 'components'

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
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 40px;
  width: 100%;
  height: calc(100vh - 300px);
  top: 300px;
  padding: 0 20px;
`

const ContainerList = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  overflow-y: scroll;
  height: 100%;
`
const ContainerMap = styled.div`
  background: tomato;
  margin-bottom: 20px;
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
  return (
    <>
      <Box>
        <NavBar />
        <SearchBar>
          <Input placeholder="Sydney, Australia" />
          <Button>Search</Button>
        </SearchBar>
        <Line />
        <FilterBar>
          <Button outline size="sm">
            Category
          </Button>
          <Button outline size="sm">
            Frequency
          </Button>
          <Button outline size="sm">
            Price
          </Button>
          <Checkbox label="Instant bookings" />
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
      <ContainerResults>
        <ContainerList>
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
          <Box height="520px" bg="quartenary" />
        </ContainerList>
        <ContainerMap>
          <Map isMarkerShown={false} containerElement={<div style={{ height: `100%` }} />} markers={markesTemp} />
        </ContainerMap>
      </ContainerResults>
    </>
  )
}

export default SearchPage
