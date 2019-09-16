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
    result: [],
    pagination: {
      page: 1,
      perPage: 10,
      prePage: 1,
      nextPage: 2,
      total: 0,
      totalPages: 0
    }
  }
}

const CATEGORIES = {
  workspace: [566, 567, 572],
  meetingSpace: [568],
  parking: [570],
  storage: [571],
  eventSpace: [569],
  retailAndHospitality: [573]
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
  query searchByAddress($lat: String!, $lng: String!, $categories: String) {
    searchByAddress(lat: $lat, lng: $lng, categories: $categories) {
      __typename
      status
      searchKey
      page
      perPage
      prePage
      nextPage
      total
      totalPages
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
    $page: Int
  ) {
    searchByFilters(
      key: $key,
      categories: $categories,
      duration: $duration,
      priceMin: $priceMin,
      priceMax: $priceMax,
      instant: $instant,
      page: $page
    ) {
      __typename
      status
      searchKey
      page
      perPage
      prePage
      nextPage
      total
      totalPages
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
          ...state.get,
          searchKey: action.payload.searchKey,
          result: action.payload.result,
          pagination: {
            page: action.payload.pagination.page,
            perPage: action.payload.pagination.perPage,
            prePage: action.payload.pagination.prePage,
            nextPage: action.payload.pagination.nextPage,
            total: action.payload.pagination.total,
            totalPages: action.payload.pagination.totalPages
          }
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

export const onSearch = (lat, lng, categoryKey = false) => async dispatch => {
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  try {
    const queryVariables = { lat: `${lat}`, lng: `${lng}` }
    if (categoryKey) {
      queryVariables.categories = CATEGORIES[categoryKey].join()
    }
    const { data } = await getClient().query({
      query: querySearchByAddress,
      variables: queryVariables
    })
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: {
        searchKey: data.searchByAddress.searchKey,
        result: data.searchByAddress.result,
        pagination: {
          page: data.searchByAddress.page,
          perPage: data.searchByAddress.perPage,
          prePage: data.searchByAddress.prePage,
          nextPage: data.searchByAddress.nextPage,
          total: data.searchByAddress.total,
          totalPages: data.searchByAddress.totalPages
        }
      }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}

export const onQuery = (searchKey, filters, page = null) => async dispatch => {
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  const filter = {
    categories:
      Object.keys(CATEGORIES)
        .filter(id => {
          return filters.filterCategory[id]
        })
        .map(item => CATEGORIES[item])
        .join() || '',
    duration:
      Object.keys(filters.filterDuration)
        .filter(id => {
          return filters.filterDuration[id]
        })
        .join() || '',
    priceMin: filters.filterPrice[0] || 0,
    priceMax: filters.filterPrice[1] || 0,
    instant: filters.filterInstantBooking ? filters.filterInstantBooking.toString() : ''
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
        instant: filter.instant,
        page
      }
    })
    dispatch({
      type: Types.ON_SEARCH_SUCCESS,
      payload: {
        searchKey: data.searchByFilters.searchKey,
        result: data.searchByFilters.result,
        pagination: {
          page: data.searchByFilters.page,
          perPage: data.searchByFilters.perPage,
          prePage: data.searchByFilters.prePage,
          nextPage: data.searchByFilters.nextPage,
          total: data.searchByFilters.total,
          totalPages: data.searchByFilters.totalPages
        }
      }
    })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}
