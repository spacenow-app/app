import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_ALL_CATEGORIES_START: 'GET_ALL_CATEGORIES_START',
  GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_ERROR: 'GET_ALL_CATEGORIES_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    categories: []
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
    default:
      return state
  }
}

// Action Creators
const getAllCategoriesStart = () => {
  return { type: Types.GET_ALL_CATEGORIES_START }
}

const getAllCategoriesSuccess = categoriesResponse => {
  return {
    type: Types.GET_ALL_CATEGORIES_SUCCESS,
    payload: categoriesResponse
  }
}

const getAllCategoriesFailed = error => {
  return {
    type: Types.GET_ALL_CATEGORIES_ERROR,
    payload: error
  }
}

// Side Effects
export const onGetAllCategories = () => async dispatch => {
  dispatch(getAllCategoriesStart())
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllCategories,
      fetchPolicy: 'network-only'
    })
    dispatch(getAllCategoriesSuccess(data.getCategories))
  } catch (err) {
    dispatch(getAllCategoriesFailed(errToMsg(err)))
  }
}
