import { gql } from 'apollo-boost'
import { getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

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
  specifications {
    id
    typeId
    itemName
    otherItemName
    description
    maximum
    minimum
    startValue
    endValue
    step
    isEnable
    photo
    photoType
    isSpecification
    createdAt
    updatedAt
    specData
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
      picture
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
    const { data } = await getClient().query({
      query: querySearchByAddress,
      variables: { lat, lng }
    })
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: { searchKey: data.searchByAddress.searchKey, result: data.searchByAddress.result }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}

export const onQuery = (searchKey, filters) => async dispatch => {
  console.log('Search Key: ', searchKey)
  console.log('Filters: ', filters)
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  const categories = {
    workspace: [566, 567, 572],
    meetingSpace: [568],
    parking: [570],
    storage: [571],
    eventSpace: [569],
    retailAndHospitality: [573]
  }
  const filter = {
    categories:
      Object.keys(categories)
        .filter(id => {
          return filters.filterCategory[id]
        })
        .map(item => categories[item])
        .join() || '',
    duration:
      Object.keys(filters.filterDuration)
        .filter(id => {
          return filters.filterDuration[id]
        })
        .join() || '',
    priceMin: filters.filterPrice[0] || 0,
    priceMax: filters.filterPrice[1] || 0,
    instant: filters.filterInstantBooking || ''
  }
  try {
    const { data } = await getClient().query({
      query: querySearchByFilters,
      variables: {
        key: searchKey,
        categories: filter.categories,
        duration: filter.duration,
        priceMin: filter.priceMin,
        priceMax: filter.priceMax,
        instant: filter.instant
      }
    })
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: { searchKey: data.searchByFilters.searchKey, result: data.searchByFilters.result }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}
