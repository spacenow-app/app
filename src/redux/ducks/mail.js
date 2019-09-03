import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import { toast } from 'react-toastify'
import errToMsg from 'utils/errToMsg'

// Graphql
const sendEmail = gql`
  mutation sendEmail($template: String!, $data: String!) {
    sendEmail(template: $template, data: $data) {
      status
    }
  }
`

// Types
export const Types = {
  SEND_EMAIL_REQUEST: 'SEND_EMAIL_REQUEST',
  SEND_EMAIL_SUCCESS: 'SEND_EMAIL_SUCCESS',
  SEND_EMAIL_ERROR: 'SEND_EMAIL_ERROR'
}

// Initial State
const initialState = {
  isLoading: false
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SEND_EMAIL_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        isLoading: false
      }
    }
    case Types.SEND_EMAIL_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }
    default:
      return state
  }
}

// Action Creators
export const sendMail = (emailOptions, message) => async dispatch => {
  dispatch({ type: Types.SEND_EMAIL_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: sendEmail,
      variables: { ...emailOptions }
    })
    message && toast.success(message)
    dispatch({ type: Types.SEND_EMAIL_SUCCESS, payload: data.sendEmail })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({ type: Types.SEND_EMAIL_ERROR, payload: errToMsg(err) })
  }
}
