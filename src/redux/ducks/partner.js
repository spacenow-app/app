import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  CREATE_WEWORK_REFERRAL_START: 'CREATE_WEWORK_REFERRAL_START',
  CREATE_WEWORK_REFERRAL_SUCCESS: 'CREATE_WEWORK_REFERRAL_SUCCESS',
  CREATE_WEWORK_REFERRAL_ERROR: 'CREATE_WEWORK_REFERRAL_ERROR'
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
  mutation createWeWorkReferral($suggestAddress: String!, $unit: String) {
    createWeWorkReferral(suggestAddress: $suggestAddress, unit: $unit) {
      email
      name
      phone
      city
      requested_location
      company_name
      requested_move_in_date
      desks_estimated
      contact_allowed
      notes
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

// Side Effects
export const onCreateWeWorkReferral = (values) => async dispatch => {
  dispatch(createWeWorkStart())
  try {
    console.log('form values', values)
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateWeWorkReferral,
      variables: { values }
    })
    dispatch(createWeWorkSuccess(data.createWeWorkReferral))  // check the wework response
  } catch (err) {
    dispatch(createWeWorkError(errToMsg(err))) // send the error in the payload
  }
}
