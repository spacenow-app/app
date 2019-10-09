import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_ROOT_CATEGORIES_START: 'GET_ROOT_CATEGORIES_START',
  GET_ROOT_CATEGORIES_SUCCESS: 'GET_ROOT_CATEGORIES_SUCCESS',
  GET_ROOT_CATEGORIES_ERROR: 'GET_ROOT_CATEGORIES_ERROR',
  GET_CATEGORY_START: 'GET_CATEGORY_START',
  GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
  GET_CATEGORY_ERROR: 'GET_CATEGORY_ERROR'
}

// Initial State
const initialState = {
  rootCategories: {
    object: [],
    isLoading: false,
    error: null
  },
  category: {
    object: null,
    isLoading: false,
    error: null
  }
}

// // GraphQL
// const queryGetRootCategories = gql`
//   query getCategoriesLegacy {
//     getCategoriesLegacy {
//       id
//       itemName
//       otherItemName
//       subCategories {
//         id
//         itemName
//         otherItemName
//         bookingPeriod {
//           id
//           listSettingsParentId
//           hourly
//           daily
//           weekly
//           monthly
//         }
//       }
//     }
//   }
// `

const queryGetRootCategories = gql`
  query GetRootCategories {
    getRootCategories {
      count
      rows
    }
  }
`

const queryGetCategory = gql`
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      slug
      children {
        id
        name
        slug
      }
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ROOT_CATEGORIES_START: {
      return {
        ...state,
        rootCategories: {
          isLoading: true
        }
      }
    }
    case Types.GET_ROOT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        rootCategories: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_ROOT_CATEGORIES_ERROR: {
      return {
        ...state,
        rootCategories: {
          isLoading: false,
          object: [],
          error: {
            message: action.payload
          }
        }
      }
    }
    case Types.GET_CATEGORY_START: {
      return {
        ...state,
        category: {
          isLoading: true
        }
      }
    }
    case Types.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        category: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_CATEGORY_ERROR: {
      return {
        ...state,
        category: {
          isLoading: false,
          object: [],
          error: {
            message: action.payload
          }
        }
      }
    }
    default:
      return state
  }
}

// Action Creators
const getRootCategoriesStart = () => {
  return { type: Types.GET_ROOT_CATEGORIES_START }
}

const getRootCategoriesSuccess = categoriesResponse => {
  return {
    type: Types.GET_ROOT_CATEGORIES_SUCCESS,
    payload: categoriesResponse
  }
}

const getRootCategoriesFailed = error => {
  return {
    type: Types.GET_ROOT_CATEGORIES_ERROR,
    payload: error
  }
}

const getCategoryStart = () => {
  return { type: Types.GET_CATEGORY_START }
}

const getCategorySuccess = categoryResponse => {
  return {
    type: Types.GET_CATEGORY_SUCCESS,
    payload: categoryResponse
  }
}

const getCategoryFailed = error => {
  return {
    type: Types.GET_CATEGORY_ERROR,
    payload: error
  }
}

export const onGetRootCategories = () => async dispatch => {
  dispatch(getRootCategoriesStart())
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetRootCategories,
      fetchPolicy: 'network-only'
    })
    dispatch(getRootCategoriesSuccess(data.getRootCategories.rows))
  } catch (err) {
    dispatch(getRootCategoriesFailed(errToMsg(err)))
  }
}

export const onGetCategory = (id) => async dispatch => {
  dispatch(getCategoryStart())
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetCategory,
      variables: id,
      fetchPolicy: 'network-only'
    })
    dispatch(getCategorySuccess(data.getCategory))
  } catch (err) {
    dispatch(getCategoryFailed(errToMsg(err)))
  }
}
