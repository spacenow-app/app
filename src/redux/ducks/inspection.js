import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  CREATE_INSPECTION_REQUEST: 'CREATE_INSPECTION_REQUEST',
  CREATE_INSPECTION_SUCCESS: 'CREATE_INSPECTION_SUCCESS',
  CREATE_INSPECTION_FAILED: 'CREATE_INSPECTION_FAILED',
  UPDATE_INSPECTION_REQUEST: 'UPDATE_INSPECTION_REQUEST',
  UPDATE_INSPECTION_SUCCESS: 'UPDATE_INSPECTION_SUCCESS',
  UPDATE_INSPECTION_FAILED: 'UPDATE_INSPECTION_FAILED'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  }
}

// GraphQL
const mutationCreateInspection = gql`
  mutation createInspection(
    $listingId: Int!, 
    $guestId: String!, 
    $messageId: String!,
    $date: String!,
    $time: String! ) {
      createInspection(
        listingId: $listingId,
        guestId: $guestId,
        messageId: $messageId,
        date: $date,
        time: $time
      ) {
        id
        status
    }
  }
`

const mutationUpdateInspection = gql`
  mutation updateInspection(
    $id: String!, 
    $status: String! ) {
      updateInspection(
        id: $id,
        status: $status
      ) {
        id
        status
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_INSPECTION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.CREATE_INSPECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Types.CREATE_INSPECTION_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.UPDATE_INSPECTION_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.UPDATE_INSPECTION_SUCCESS: {
      return {
        ...state,
        isLoading: false
      }
    }
    case Types.UPDATE_INSPECTION_FAILED: {
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

export const onCreateInspection = (values) => async dispatch => {
  dispatch({ type: Types.CREATE_INSPECTION_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateInspection,
      variables: {
        listingId: parseInt(values.listingId, 10),
        guestId: values.guestId,
        messageId: values.messageId,
        date: values.date,
        time: values.time
      }
    })
    dispatch({ type: Types.CREATE_INSPECTION_SUCCESS, payload: data.createInspection })
  } catch (err) {
    dispatch({ type: Types.CREATE_INSPECTION_FAILED, payload: errToMsg(err) })
  }
}

export const onUpdateInspection = (id, status) => async dispatch => {
  dispatch({ type: Types.UPDATE_INSPECTION_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateInspection,
      variables: {
        id,
        status
      }
    })
    dispatch({ type: Types.UPDATE_INSPECTION_SUCCESS, payload: data.updateInspection })
  } catch (err) {
    dispatch({ type: Types.UPDATE_INSPECTION_FAILED, payload: errToMsg(err) })
  }
}

