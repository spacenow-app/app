import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

import mock from './search.result.json'

// Actions
export const Types = {
  ON_SEARCH_REQUEST: 'ON_SEARCH_REQUEST',
  ON_SEARCH_SUCCESS: 'ON_SEARCH_SUCCESS',
  ON_SEARCH_FAILURE: 'ON_SEARCH_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  error: null,
  results: []
}

const mutationUploadPhoto = gql`
  mutation uploadPhoto($file: Upload, $listingId: Int!) {
    uploadPhoto(file: $file, listingId: $listingId) {
      id
      listingId
      name
      isCover
      bucket
      region
      key
      type
      createdAt
      updatedAt
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ON_SEARCH_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.ON_SEARCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        results: action.payload
      }
    }
    case Types.ON_SEARCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}

export const onSearch = filter => async dispatch => {
  dispatch({ type: Types.ON_SEARCH_REQUEST })
  try {
    // const { data } = await getClientWithAuth(dispatch).mutate({
    //   mutation: mutationUploadPhoto,
    //   variables: {
    //     file,
    //     listingId
    //   }
    // })
    dispatch({ type: Types.ON_SEARCH_SUCCESS, payload: mock.data.searchByFilters.result })
  } catch (err) {
    dispatch({ type: Types.ON_SEARCH_FAILURE, payload: errToMsg(err) })
  }
}
