import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_ALL_NOTIFICATIONS_BY_TYPE_START: 'GET_ALL_NOTIFICATIONS_BY_TYPE_START',
  GET_ALL_NOTIFICATIONS_BY_TYPE_SUCCESS: 'GET_ALL_NOTIFICATIONS_BY_TYPE_SUCCESS',
  GET_ALL_NOTIFICATIONS_BY_TYPE_ERROR: 'GET_ALL_NOTIFICATIONS_BY_TYPE_ERROR'
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
const queryGetNotificationsByType = gql`
  query getNotificationsByType($type: NotificationType) {
    getNotificationsByType(type: $type) {
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
    case Types.GET_ALL_NOTIFICATIONS_BY_TYPE_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_ALL_NOTIFICATIONS_BY_TYPE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          notifications: action.payload
        }
      }
    }
    case Types.GET_ALL_NOTIFICATIONS_BY_TYPE_ERROR: {
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
export const onGetAllNotificationsByType = (type) => async dispatch => {
  dispatch({ type: Types.GET_ALL_NOTIFICATIONS_BY_TYPE_START })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetNotificationsByType,
      fetchPolicy: 'network-only',
      variables: { type }
    })
    dispatch({ type: Types.GET_ALL_NOTIFICATIONS_BY_TYPE_SUCCESS, payload: data.getNotificationsByType})
  } catch (error) {
    dispatch({ type: Types.GET_ALL_NOTIFICATIONS_BY_TYPE_ERROR, payload: errToMsg(error.message) })
  }
}
