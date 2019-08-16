import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  CREATE_WEWORK_REFERRAL_START: 'CREATE_WEWORK_REFERRAL_START',
  CREATE_WEWORK_REFERRAL_SUCCESS: 'CREATE_WEWORK_REFERRAL_SUCCESS',
  CREATE_WEWORK_REFERRAL_ERROR: 'CREATE_WEWORK_REFERRAL_ERROR',
  SEND_HUBSPOT_FORM_START: 'SEND_HUBSPOT_FORM_START',
  SEND_HUBSPOT_FORM_SUCCESS: 'SEND_HUBSPOT_FORM_SUCCESS',
  SEND_HUBSPOT_FORM_FAILED: 'SEND_HUBSPOT_FORM_FAILED'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
}

// GraphQL
const mutationCreateWeWorkReferral = gql`
  mutation createWeWorkReferral($wework: WeWorkInput) {
    createWeWorkReferral(wework: $wework) {
        status
    }
  }
`

const mutationSendHubSpotForm = gql`
  mutation sendHubSpotForm($hubspot: WeWorkInput) {
      sendHubSpotForm(hubspot: $hubspot) {
        status
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_WEWORK_REFERRAL_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.CREATE_WEWORK_REFERRAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Types.CREATE_WEWORK_REFERRAL_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.SEND_HUBSPOT_FORM_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.SEND_HUBSPOT_FORM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Types.SEND_HUBSPOT_FORM_FAILED: {
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
const createWeWorkStart = () => {
  return { type: Types.CREATE_WEWORK_REFERRAL_START }
}

const createWeWorkSuccess = () => {
  return {
    type: Types.CREATE_WEWORK_REFERRAL_SUCCESS,
    // payload: weworkResponse
  }
}

const createWeWorkError = error => {
  return {
    type: Types.CREATE_WEWORK_REFERRAL_ERROR,
    payload: error
  }
}

const sendHubSpotStart = () => {
  return { type: Types.SEND_HUBSPOT_FORM_START }
}

const sendHubSpotSuccess = (data) => {
  return {
    type: Types.SEND_HUBSPOT_FORM_SUCCESS,
    payload: data
  }
}

const sendHubSpotFailed = error => {
  return {
    type: Types.SEND_HUBSPOT_FORM_FAILED,
    payload: error
  }
}

// Side Effects
export const onCreateWeWorkReferral = (wework) => async dispatch => {
  dispatch(createWeWorkStart())
  try {
    console.log('form values', wework)
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateWeWorkReferral,
      variables: { wework }
    })
    dispatch(createWeWorkSuccess(data.createWeWorkReferral))
  } catch (err) {
    dispatch(createWeWorkError(errToMsg(err)))
  }
}

export const onSendHubSpotForm = (hubspot) => async dispatch => {
  dispatch(sendHubSpotStart())
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationSendHubSpotForm,
      variables: { hubspot }
    })
    console.log(data.sendHubSpotForm)
    dispatch(sendHubSpotSuccess(data.sendHubSpotForm))
  } catch (err) {
    dispatch(sendHubSpotFailed(errToMsg(err)))
  }
}