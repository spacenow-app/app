import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'

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
  GET_ALL_CATEGORY_SPECIFICATIONS_ERROR: 'GET_ALL_CATEGORY_SPECIFICATIONS_ERROR'
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

export const onGetCategorySpecifications = id => async dispatch => {
  dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategorySpecifications,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_SUCCESS, payload: data.getCategorySpecifications })
  } catch (err) {
    dispatch({ type: Types.GET_ALL_CATEGORY_SPECIFICATIONS_ERROR, payload: err })
  }
}
