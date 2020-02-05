/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
// import { monthNames } from 'variables'
// import { camalize, isPositiveInt } from 'utils/strings'
// import { toast } from 'react-toastify'

export const Types = {
  GET_LISTING_STEPS_REQUEST: 'GET_LISTING_STEPS_REQUEST',
  GET_LISTING_STEPS_SUCCESS: 'GET_LISTING_STEPS_SUCCESS',
  GET_LISTING_STEPS_FAILURE: 'GET_LISTING_STEPS_FAILURE',
  GET_LISTING_REQUEST: 'GET_LISTING_REQUEST',
  GET_LISTING_SUCCESS: 'GET_LISTING_SUCCESS',
  GET_LISTING_FAILURE: 'GET_LISTING_FAILURE',
  POST_LISTING_REQUEST: 'POST_LISTING_REQUEST',
  POST_LISTING_SUCCESS: 'POST_LISTING_SUCCESS',
  POST_LISTING_FAILURE: 'POST_LISTING_FAILURE',
  PUT_LISTING_REQUEST: 'PUT_LISTING_REQUEST',
  PUT_LISTING_SUCCESS: 'PUT_LISTING_SUCCESS',
  PUT_LISTING_FAILURE: 'PUT_LISTING_FAILURE'
}

const initialState = {
  isLoading: false,
  steps: {
    object: null,
    isLoading: true,
    error: null
  },
  get: {
    object: null,
    isLoading: true,
    isNotOwner: false,
    error: null
  }
}

const stepsFields = `
  completed
  id
  listingId
  step1
  step2
  step3
  step4
  step5
  step6
  step7
  step8
  createdAt
  updatedAt
`
const listingFields = `
  id
  userId
  locationId
  listSettingsParentId
  bookingPeriod
  title
  bookingType
  isPublished
  isReady
  status
  createdAt
  updatedAt
`
const queryGetV2Steps = gql`
  query getV2Steps($id: Int!) {
    getV2Steps(id: $id) {
      ${stepsFields}
    }
  }
`
const queryGetV2Listing = gql`
  query getV2Listing($id: Int!) {
    getV2Listing(id: $id) {
      ${listingFields}
    }
  }
`
const mutationPostV2Listing = gql`
  mutation postV2Listing {
    postV2Listing {
      ${listingFields}
    }
  }
`
const mutationPutV2Listing = gql`
  mutation putV2Listing($input: V2InputListing) {
    putV2Listing(input: $input) {
      ${listingFields}
    }
  }
`

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_LISTING_STEPS_REQUEST: {
      return {
        ...state,
        steps: {
          ...state.steps,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.GET_LISTING_STEPS_SUCCESS: {
      return {
        ...state,
        steps: {
          ...state.steps,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_LISTING_STEPS_FAILURE: {
      return {
        ...state,
        steps: {
          ...state.steps,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_LISTING_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.GET_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_LISTING_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.POST_LISTING_REQUEST:
    case Types.PUT_LISTING_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.POST_LISTING_SUCCESS:
    case Types.PUT_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.POST_LISTING_FAILURE:
    case Types.PUT_LISTING_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return state
  }
}

export const onGetListingSteps = id => async dispatch => {
  dispatch({ type: Types.GET_LISTING_STEPS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetV2Steps,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_LISTING_STEPS_SUCCESS, payload: data.getV2Steps })
  } catch (err) {
    dispatch({ type: Types.GET_LISTING_STEPS_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetListing = id => async dispatch => {
  dispatch({ type: Types.GET_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetV2Listing,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_LISTING_SUCCESS, payload: data.getV2Listing })
  } catch (err) {
    dispatch({ type: Types.GET_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onPostListing = () => async dispatch => {
  dispatch({ type: Types.POST_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPostV2Listing
    })
    dispatch({ type: Types.POST_LISTING_SUCCESS, payload: data.postV2Listing })
  } catch (err) {
    dispatch({ type: Types.POST_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onPutListing = input => async dispatch => {
  dispatch({ type: Types.PUT_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPutV2Listing,
      variables: { input }
    })
    dispatch({ type: Types.PUT_LISTING_SUCCESS, payload: data.puV2Listing })
  } catch (err) {
    dispatch({ type: Types.PUT_LISTING_FAILURE, payload: errToMsg(err) })
  }
}
