import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Graphql
const sendMail = gql`
  mutation sendMail($to: String!, $subject: String!, $html: String!) {
    sendMail(to: $to, subject: $subject, html: $html) {
      __typename
      messageId
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
export const sendMailForm = values => async dispatch => {
  dispatch({ type: Types.SEND_EMAIL_FORM_REQUEST })
  const sizeType = {
    1: '1-10 People',
    2: '11 - 100 People',
    3: '101 - 500 People',
    4: '500+ People'
  }

  try {
    const emailOptions = {
      to: 'bruno@spacenow.com',
      subject: 'Spacenow Landing Page - Lead Requirements Form ',
      html: `
        <html>
        <body>
          <p>Type Of Space: ${values.typeOfSpace.itemName}</p>
          <p>Location: ${values.location}</p>
          <p>Start Date: ${values.startDate}</p>
          <p>End Date: ${values.endDate}</p>
          <p>Size: ${sizeType[values.size]}</p>
          <p>Budget: ${values.budget || 'I don’t know'}</p>
          <p>Message: ${values.message}</p>
        </body>
        </html>
      `
    }
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: sendMail,
      variables: { ...emailOptions }
    })
    dispatch({ type: Types.SEND_EMAIL_FORM_SUCCESS, payload: data.sendMail })
  } catch (err) {
    dispatch({ type: Types.SEND_EMAIL_FORM_ERROR, payload: errToMsg(err) })
  }
}
