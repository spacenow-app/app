import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_OR_CREATE_LOCATION_START: 'GET_OR_CREATE_LOCATION_START',
  GET_OR_CREATE_LOCATION_SUCCESS: 'GET_OR_CREATE_LOCATION_SUCCESS',
  GET_OR_CREATE_LOCATION_ERROR: 'GET_OR_CREATE_LOCATION_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    location: null
  }
}

// GraphQL
const mutationGetOrCreateLocation = gql`
  mutation getOrCreateLocation($suggestAddress: String!) {
    getOrCreateLocation(suggestAddress: $suggestAddress) {
      id
      userId
      country
      address1
      address2
      buildingName
      city
      state
      zipcode
      lat
      lng
      createdAt
      updatedAt
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_OR_CREATE_LOCATION_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_OR_CREATE_LOCATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          location: action.payload
        }
      }
    }
    case Types.GET_OR_CREATE_LOCATION_ERROR: {
      return {
        ...state,
        isLoading: false,
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
const getOrCreateStart = () => {
  return { type: Types.GET_OR_CREATE_LOCATION_START }
}

const getOrCreateSuccess = locationResponse => {
  return {
    type: Types.GET_OR_CREATE_LOCATION_SUCCESS,
    payload: locationResponse
  }
}

const getOrCreateError = error => {
  return {
    type: Types.GET_OR_CREATE_LOCATION_ERROR,
    payload: error
  }
}

// Side Effects
export const onGetOrCreateLocation = (suggestAddress, history) => async dispatch => {
  dispatch(getOrCreateStart())
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationGetOrCreateLocation,
      variables: { suggestAddress }
    })
    dispatch(getOrCreateSuccess(data.getOrCreateLocation))
    history.push('/listing/category')
  } catch (err) {
    dispatch(getOrCreateError(errToMsg(err)))
  }
}
