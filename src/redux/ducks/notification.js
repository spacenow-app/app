import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_ALL_NOTIFICATIONS_START: 'GET_ALL_NOTIFICATIONS_START',
  GET_ALL_NOTIFICATIONS_SUCCESS: 'GET_ALL_NOTIFICATIONS_SUCCESS',
  GET_ALL_NOTIFICATIONS_ERROR: 'GET_ALL_NOTIFICATIONS_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    notifications: []
  }
}

// GraphQL
const queryGetNotifications = gql`
  query getNotifications {
    getNotifications {
      id
      name
      slug
      message       
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_NOTIFICATIONS_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_ALL_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          notifications: action.payload
        }
      }
    }
    case Types.GET_ALL_NOTIFICATIONS_ERROR: {
      return {
        ...state,
        isLoading: false,
        get: {
          notifications: []
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

// Side Effects
export const onGetAllNotifications = () => async dispatch => {
  dispatch({ type: Types.GET_ALL_NOTIFICATIONS_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetNotifications,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ALL_NOTIFICATIONS_SUCCESS, payload: data.getNotifications})
  } catch (error) {
    dispatch({ type: Types.GET_ALL_NOTIFICATIONS_ERROR, payload: errToMsg(error.message) })
  }
}
