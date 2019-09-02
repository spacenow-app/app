import { gql } from 'apollo-boost'
import { getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

import mockSearchByAddress from './searchByAddress.json'
import mockSearchByFilters from './searchByFilters.json'

// Actions
export const Types = {
  ON_SEARCH_REQUEST: 'ON_SEARCH_REQUEST',
  ON_SEARCH_SUCCESS: 'ON_SEARCH_SUCCESS',
  ON_SEARCH_FAILURE: 'ON_SEARCH_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  error: null,
  get: {
    searchKey: null,
    result: []
  }
}

const searchResultFields = `
  id
  userId
  title
  bookingPeriod
  photos {
    id
    isCover
    name
  }
  listingData {
    accessType
    minTerm
    basePrice
    currency
    isAbsorvedFee
    capacity
    size
    meetingRooms
    isFurnished
    carSpace
    sizeOfVehicle
    maxEntranceHeight
    bookingType
    spaceType
  }
  location {
    id
    country
    address1
    buildingName
    city
    state
    zipcode
    lat
    lng
  }
  category {
    id
    typeId
    itemName
    otherItemName
  }
  subcategory {
    id
    typeId
    itemName
    otherItemName
  }
  host {
    id
    email
    profile {
      profileId
      firstName
      lastName
    }
  }
`

const querySearchByAddress = gql`
  query searchByAddress($lat: String!, $lng: String!) {
    searchByAddress(lat: $lat, lng: $lng) {
      __typename
      status
      searchKey
      result {
        ${searchResultFields}
      }
    }
  }
`

const querySearchByFilters = gql`
  query searchByFilters(
    $key: String!,
    $categories: String,
    $duration: String,
    $priceMin: Float,
    $priceMax: Float,
    $instant: String,
  ) {
    searchByFilters(
      key: $key,
      categories: $categories,
      duration: $duration,
      priceMin: $priceMin,
      priceMax: $priceMax,
      instant: $instant
    ) {
      __typename
      status
      searchKey
      result {
        ${searchResultFields}
      }
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ON_SEARCH_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.ON_SEARCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          searchKey: action.payload.searchKey,
          result: action.payload.result
        }
      }
    }
    case Types.ON_SEARCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}

export const onSearch = (lat, lng) => async dispatch => {
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  try {
    // const { data } = await getClient().query({
    //   query: querySearchByAddress,
    //   variables: { lat: '-33.8688197', lng: '151.2092955' }
    // })
    const data = {
      searchByAddress: {
        searchKey: '',
        result: mockSearchByAddress.data.searchByAddress.result
      }
    }
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: { searchKey: data.searchByAddress.searchKey, result: data.searchByAddress.result }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}

export const onQuery = (searchKey, filters) => async dispatch => {
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  try {
    // const { data } = await getClient().query({
    //   query: querySearchByFilters,
    //   variables: {
    //     key: searchKey,
    //     categories: filters.categories,
    //     duration: filters.duration,
    //     priceMin: filters.priceMin,
    //     priceMax: filters.priceMax,
    //     instant: filters.instant
    //   }
    // })
    const data = {
      searchByAddress: {
        searchKey: '',
        result: mockSearchByAddress.data.searchByAddress.result
      }
    }
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: { searchKey: data.searchByAddress.searchKey, result: data.searchByFilters.result }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}
