import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  UPLOAD_PHOTO_START: 'UPLOAD_PHOTO_START',
  UPLOAD_PHOTO_SUCCESS: 'UPLOAD_PHOTO_SUCCESS',
  UPLOAD_PHOTO_FAILURE: 'UPLOAD_PHOTO_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    object: null
  }
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
    case Types.UPLOAD_PHOTO_START: {
      return {
        ...state,
        get: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.UPLOAD_PHOTO_SUCCESS: {
      return {
        ...state,
        get: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.UPLOAD_PHOTO_FAILURE: {
      return {
        ...state,
        get: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return state
  }
}

export const onUploadPhoto = (file, listingId) => async dispatch => {
  dispatch({ type: Types.UPLOAD_PHOTO_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUploadPhoto,
      variables: {
        file,
        listingId
      }
    })
    dispatch({ type: Types.UPLOAD_PHOTO_SUCCESS, payload: data.uploadPhoto })
  } catch (err) {
    dispatch({ type: Types.UPLOAD_PHOTO_FAILURE, payload: errToMsg(err) })
  }
}
