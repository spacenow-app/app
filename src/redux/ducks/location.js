import { gql } from 'apollo-boost'

import { getClient } from 'graphql/apolloClient'

// Actions
export const Types = {
  GET_OR_CREATE_START: 'GET_OR_CREATE_START',
  GET_OR_CREATE_SUCCESS: 'GET_OR_CREATE_SUCCESS',
  GET_OR_CREATE_ERROR: 'GET_OR_CREATE_ERROR'
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
    getOrCreateLocation(
      suggestAddress: $suggestAddress
      userId: "c4c77350-6c80-11e9-bfb6-55a34828950d"
    ) {
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
    case Types.GET_OR_CREATE_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_OR_CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          location: action.payload
        }
      }
    }
    case Types.GET_OR_CREATE_ERROR: {
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
  return { type: Types.GET_OR_CREATE_START }
}

const getOrCreateSuccess = locationResponse => {
  return {
    type: Types.GET_OR_CREATE_SUCCESS,
    payload: locationResponse
  }
}

const getOrCreateError = error => {
  return {
    type: Types.GET_OR_CREATE_ERROR,
    payload: error
  }
}

// Side Effects
export const onGetOrCreateLocation = suggestAddress => async dispatch => {
  dispatch(getOrCreateStart())
  try {
    const { data } = await getClient().mutate({
      mutation: mutationGetOrCreateLocation,
      variables: { suggestAddress }
    })
    dispatch(getOrCreateSuccess(data.getOrCreateLocation))
  } catch (err) {
    dispatch(getOrCreateError(err))
  }
}
