import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import { camalize } from 'utils/strings'

// Actions
export const Types = {
  GET_ALL_CATEGORIES_START: 'GET_ALL_CATEGORIES_START',
  GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_ERROR: 'GET_ALL_CATEGORIES_ERROR',
  GET_ALL_CATEGORY_ACTIVITIES_START: 'GET_ALL_CATEGORY_ACTIVITIES_START',
  GET_ALL_CATEGORY_ACTIVITIES_SUCCESS: 'GET_ALL_CATEGORY_ACTIVITIES_SUCCESS',
  GET_ALL_CATEGORY_ACTIVITIES_ERROR: 'GET_ALL_CATEGORY_ACTIVITIES_ERROR',
  GET_ALL_CATEGORY_BOOKING_PERIOD_START: 'GET_ALL_CATEGORY_BOOKING_PERIOD_START',
  GET_ALL_CATEGORY_BOOKING_PERIOD_SUCCESS: 'GET_ALL_CATEGORY_BOOKING_PERIOD_SUCCESS',
  GET_ALL_CATEGORY_BOOKING_PERIOD_ERROR: 'GET_ALL_CATEGORY_BOOKING_PERIOD_ERROR',
  GET_ALL_CATEGORY_SPECIFICATIONS_START: 'GET_ALL_CATEGORY_SPECIFICATIONS_START',
  GET_ALL_CATEGORY_SPECIFICATIONS_SUCCESS: 'GET_ALL_CATEGORY_SPECIFICATIONS_SUCCESS',
  GET_ALL_CATEGORY_SPECIFICATIONS_ERROR: 'GET_ALL_CATEGORY_SPECIFICATIONS_ERROR',
  GET_ALL_CATEGORY_RULES_START: 'GET_ALL_CATEGORY_RULES_START',
  GET_ALL_CATEGORY_RULES_SUCCESS: 'GET_ALL_CATEGORY_RULES_SUCCESS',
  GET_ALL_CATEGORY_RULES_ERROR: 'GET_ALL_CATEGORY_RULES_ERROR',
  GET_ALL_CATEGORY_AMENITIES_START: 'GET_ALL_CATEGORY_AMENITIES_START',
  GET_ALL_CATEGORY_AMENITIES_SUCCESS: 'GET_ALL_CATEGORY_AMENITIES_SUCCESS',
  GET_ALL_CATEGORY_AMENITIES_ERROR: 'GET_ALL_CATEGORY_AMENITIES_ERROR',
  GET_ALL_CATEGORY_FEATURES_START: 'GET_ALL_CATEGORY_FEATURES_START',
  GET_ALL_CATEGORY_FEATURES_SUCCESS: 'GET_ALL_CATEGORY_FEATURES_SUCCESS',
  GET_ALL_CATEGORY_FEATURES_ERROR: 'GET_ALL_CATEGORY_FEATURES_ERROR',
  GET_ALL_CATEGORY_ACCESS_START: 'GET_ALL_CATEGORY_ACCESS_START',
  GET_ALL_CATEGORY_ACCESS_SUCCESS: 'GET_ALL_CATEGORY_ACCESS_SUCCESS',
  GET_ALL_CATEGORY_ACCESS_ERROR: 'GET_ALL_CATEGORY_ACCESS_ERROR',
  GET_ALL_CATEGORY_STYLES_START: 'GET_ALL_CATEGORY_STYLES_START',
  GET_ALL_CATEGORY_STYLES_SUCCESS: 'GET_ALL_CATEGORY_STYLES_SUCCESS',
  GET_ALL_CATEGORY_STYLES_ERROR: 'GET_ALL_CATEGORY_STYLES_ERROR',
  GET_ALL_CATEGORY_CHECKIN_TYPES_START: 'GET_ALL_CATEGORY_CHECKIN_TYPES_START',
  GET_ALL_CATEGORY_CHECKIN_TYPES_SUCCESS: 'GET_ALL_CATEGORY_CHECKIN_TYPES_SUCCESS',
  GET_ALL_CATEGORY_CHECKIN_TYPES_ERROR: 'GET_ALL_CATEGORY_CHECKIN_TYPES_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    categories: []
  },
  categories: {
    object: [],
    isLoading: true,
    error: null
  },
  activities: {
    object: [],
    isLoading: true,
    error: null
  },
  bookingPeriod: {
    object: null,
    isLoading: true,
    error: null
  },
  specifications: {
    object: [],
    isLoading: true,
    error: null
  },
  rules: {
    object: [],
    isLoading: true,
    error: null
  },
  amenities: {
    object: [],
    isLoading: true,
    error: null
  },
  features: {
    object: [],
    isLoading: true,
    error: null
  },
  access: {
    object: [],
    isLoading: true,
    error: null
  },
  styles: {
    object: [],
    isLoading: true,
    error: null
  },
  checkinTypes: {
    object: [],
    isLoading: true,
    error: null
  }
}

// GraphQL
const queryGetAllCategories = gql`
  query getCategories {
    getCategories {
      id
      itemName
      otherItemName
      subCategories {
        subCategory {
          id
          itemName
          otherItemName
        }
        bookingPeriod {
          id
          listSettingsParentId
          hourly
          daily
          weekly
          monthly
        }
      }
    }
  }
`
const queryGetCategoryActivities = gql`
  query getCategoryActivities($id: Int!) {
    getCategoryActivities(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryBookingPeriod = gql`
  query getCategoryBookingPeriod($id: Int!) {
    getCategoryBookingPeriod(id: $id) {
      id
      listSettingsParentId
      monthly
      weekly
      daily
      hourly
    }
  }
`
const queryGetCategorySpecifications = gql`
  query getCategorySpecifications($id: Int!) {
    getCategorySpecifications(id: $id) {
      id
      itemName
      otherItemName
      specData
    }
  }
`
const queryGetCategoryRules = gql`
  query getCategoryRules($id: Int!) {
    getCategoryRules(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryAmenities = gql`
  query getCategoryAmenities($id: Int!) {
    getCategoryAmenities(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryFeatures = gql`
  query getCategoryFeatures($id: Int!) {
    getCategoryFeatures(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryAccess = gql`
  query getCategoryAccess($id: Int!) {
    getCategoryAccess(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryStyles = gql`
  query getCategoryStyles($id: Int!) {
    getCategoryStyles(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`
const queryGetCategoryCheckinTypes = gql`
  query getCategoryCheckinTypes($id: Int!) {
    getCategoryCheckinTypes(id: $id) {
      id
      itemName
      otherItemName
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_CATEGORIES_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          categories: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORIES_ERROR: {
      return {
        ...state,
        isLoading: false,
        get: {
          categories: []
        },
        error: {
          message: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACTIVITIES_START: {
      return {
        ...state,
        activities: {
          ...state.activities,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        activities: {
          ...state.activities,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACTIVITIES_ERROR: {
      return {
        ...state,
        activities: {
          ...state.activities,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_BOOKING_PERIOD_START: {
      return {
        ...state,
        bookingPeriod: {
          ...state.bookingPeriod,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_BOOKING_PERIOD_SUCCESS: {
      return {
        ...state,
        bookingPeriod: {
          ...state.bookingPeriod,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_BOOKING_PERIOD_ERROR: {
      return {
        ...state,
        bookingPeriod: {
          ...state.bookingPeriod,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_SPECIFICATIONS_START: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_SPECIFICATIONS_SUCCESS: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_SPECIFICATIONS_ERROR: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_RULES_START: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_RULES_SUCCESS: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_RULES_ERROR: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_AMENITIES_START: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_AMENITIES_SUCCESS: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_AMENITIES_ERROR: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_FEATURES_START: {
      return {
        ...state,
        features: {
          ...state.features,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_FEATURES_SUCCESS: {
      return {
        ...state,
        features: {
          ...state.features,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_FEATURES_ERROR: {
      return {
        ...state,
        features: {
          ...state.features,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACCESS_START: {
      return {
        ...state,
        access: {
          ...state.access,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACCESS_SUCCESS: {
      return {
        ...state,
        access: {
          ...state.access,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_ACCESS_ERROR: {
      return {
        ...state,
        access: {
          ...state.access,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_STYLES_START: {
      return {
        ...state,
        styles: {
          ...state.styles,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_STYLES_SUCCESS: {
      return {
        ...state,
        styles: {
          ...state.styles,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_STYLES_ERROR: {
      return {
        ...state,
        styles: {
          ...state.styles,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_CHECKIN_TYPES_START: {
      return {
        ...state,
        checkinTypes: {
          ...state.checkinTypes,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_ALL_CATEGORY_CHECKIN_TYPES_SUCCESS: {
      return {
        ...state,
        checkinTypes: {
          ...state.checkinTypes,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ALL_CATEGORY_CHECKIN_TYPES_ERROR: {
      return {
        ...state,
        checkinTypes: {
          ...state.checkinTypes,
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return state
  }
}

export const onGetAllCategories = () => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORIES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllCategories,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORIES_SUCCESS, payload: data.getCategories })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORIES_ERROR, payload: err })
  }
}

export const onGetCategoryActivities = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_ACTIVITIES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryActivities,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_ACTIVITIES_SUCCESS, payload: data.getCategoryActivities })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_ACTIVITIES_ERROR, payload: err })
  }
}

export const onGetCategoryBookingPeriod = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_BOOKING_PERIOD_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryBookingPeriod,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_BOOKING_PERIOD_SUCCESS, payload: data.getCategoryBookingPeriod })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_BOOKING_PERIOD_ERROR, payload: err })
  }
}

export const onGetCategorySpecifications = (id, listingData)  => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategorySpecifications,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    const specificationsToView = mapTo(data.getCategorySpecifications, listingData)
    dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_SUCCESS, payload: specificationsToView })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_ERROR, payload: err })
  }
}

export const onGetCategoryRules = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_RULES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryRules,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_RULES_SUCCESS, payload: data.getCategoryRules })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_RULES_ERROR, payload: err })
  }
}

export const onGetCategoryAmenities = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_AMENITIES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryAmenities,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_AMENITIES_SUCCESS, payload: data.getCategoryAmenities })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_AMENITIES_ERROR, payload: err })
  }
}

export const onGetCategoryFeatures = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_FEATURES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryFeatures,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_FEATURES_SUCCESS, payload: data.getCategoryFeatures })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_FEATURES_ERROR, payload: err })
  }
}

export const onGetCategoryAccess = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_ACCESS_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryAccess,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_ACCESS_SUCCESS, payload: data.getCategoryAccess })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_ACCESS_ERROR, payload: err })
  }
}

export const onGetCategoryStyles = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_STYLES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryStyles,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_STYLES_SUCCESS, payload: data.getCategoryStyles })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_STYLES_ERROR, payload: err })
  }
}

export const onGetCategoryCheckinTypes = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_CHECKIN_TYPES_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategoryCheckinTypes,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_CHECKIN_TYPES_SUCCESS, payload: data.getCategoryCheckinTypes })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_CHECKIN_TYPES_ERROR, payload: err })
  }
}

const mapTo = (originalArray, listingData) => {
  const specifications = {}
  for (let i = 0, size = originalArray.length; i < size; i += 1) {
    const { itemName, specData } = originalArray[i]
    if (specData && specData.length > 0) {
      const specDataObj = JSON.parse(specData)
      specifications[specDataObj.field] = {
        ...specDataObj,
        value: listingData[specDataObj.field] || specDataObj.defaultValue
      }
    } else {
      const fieldTarget = camalize(itemName)
      specifications[fieldTarget] = {
        label: itemName,
        field: fieldTarget,
        value: listingData[fieldTarget]
      }
    }
  }
  return specifications
}
