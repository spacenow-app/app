import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'

// Actions
export const Types = {
  GET_ALL_CATEGORIES_START: 'GET_ALL_CATEGORIES_START',
  GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_ERROR: 'GET_ALL_CATEGORIES_ERROR',
  GET_ALL_CATEGORY_ACTIVITIES_START: 'GET_ALL_CATEGORY_ACTIVITIES_START',
  GET_ALL_CATEGORY_ACTIVITIES_SUCCESS: 'GET_ALL_CATEGORY_ACTIVITIES_SUCCESS',
  GET_ALL_CATEGORY_ACTIVITIES_ERROR: 'GET_ALL_CATEGORY_ACTIVITIES_ERROR'
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
