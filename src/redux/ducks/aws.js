/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'

const mutationPutObject = gql`
  mutation putObject($id: Int, $input: S3Input) {
    putObject(id: $id, input: $input) {
      url
    }
  }
`

// Action Types
export const Types = {
  PUT_OBJECT: 'PUT_OBJECT',
  PUT_OBJECT_SUCCESS: 'PUT_OBJECT_SUCCESS',
  PUT_OBJECT_FAILURE: 'PUT_OBJECT_FAILURE'
}

// Reducer
const initialState = {
  error: null,
  get: { url: null, type: '' },
  isLoading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.PUT_OBJECT:
      return {
        ...state,
        error: null,
        isLoading: true
      }
    case Types.PUT_OBJECT_SUCCESS:
      return {
        ...state,
        get: action.payload,
        isLoading: false
      }
    case Types.PUT_OBJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export const onPutObject = (id, input, type) => async dispatch => {
  dispatch({ type: Types.PUT_OBJECT })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPutObject,
      variables: { id, input }
    })
    dispatch({ type: Types.PUT_OBJECT_SUCCESS, payload: { url: data.putObject.url, type } })
  } catch (error) {
    dispatch({ type: Types.PUT_OBJECT_FAILURE, payload: error })
  }
}