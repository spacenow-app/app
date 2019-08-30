import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import { toast } from 'react-toastify'
import errToMsg from 'utils/errToMsg'

// Graphql
const sendEmail = gql`
  mutation sendEmail($template: String!, $data: String!) {
    sendEmail(template: $template, data: $data) {
      template
      data
    }
  }
`

// Types
export const Types = {
  SEND_EMAIL_FORM_REQUEST: 'SEND_EMAIL_FORM_REQUEST',
  SEND_EMAIL_FORM_SUCCESS: 'SEND_EMAIL_FORM_SUCCESS',
  SEND_EMAIL_FORM_ERROR: 'SEND_EMAIL_FORM_ERROR'
}

// Initial State
const initialState = {
  isLoading: false
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SEND_EMAIL_FORM_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.SEND_EMAIL_FORM_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        isLoading: false
      }
    }
    case Types.SEND_EMAIL_FORM_ERROR: {
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
export const sendEmailForm = emailOptions => async dispatch => {
  dispatch({ type: Types.SEND_EMAIL_FORM_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: sendEmail,
      variables: { ...emailOptions }
    })
    toast.success('Email Sent!')
    dispatch({ type: Types.SEND_EMAIL_FORM_SUCCESS, payload: data.sendEmail })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({ type: Types.SEND_EMAIL_FORM_ERROR, payload: errToMsg(err) })
  }
}
