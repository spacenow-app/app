import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  UPLOAD_PHOTO_START: 'UPLOAD_PHOTO_START',
  UPLOAD_PHOTO_SUCCESS: 'UPLOAD_PHOTO_SUCCESS',
  UPLOAD_PHOTO_FAILURE: 'UPLOAD_PHOTO_FAILURE',
  SET_COVER_PHOTO_START: 'SET_COVER_PHOTO_START',
  SET_COVER_PHOTO_SUCCESS: 'SET_COVER_PHOTO_SUCCESS',
  SET_COVER_PHOTO_FAILURE: 'SET_COVER_PHOTO_FAILURE',
  DELETE_PHOTO_START: 'DELETE_PHOTO_START',
  DELETE_PHOTO_SUCCESS: 'DELETE_PHOTO_SUCCESS',
  DELETE_PHOTO_FAILURE: 'DELETE_PHOTO_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  status: '',
  get: {
    object: null
  }
}

// const mutationUploadPhoto = gql`
//   mutation uploadPhoto($file: Upload, $category: String!, $listingId: Int!) {
//     uploadPhoto(file: $file, category: $category, listingId: $listingId) {
//       id
//       listingId
//       name
//       isCover
//       bucket
//       region
//       key
//       type
//       category
//       createdAt
//       updatedAt
//     }
//   }
// `

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

const mutationSetCoverPhoto = gql`
  mutation setCoverPhoto($listingId: Int!, $photoId: Int!) {
    setCoverPhoto(listingId: $listingId, photoId: $photoId) {
      status
    }
  }
`

const mutationDeletePhoto = gql`
  mutation deletePhoto($listingId: Int!, $photoId: Int!) {
    deletePhoto(listingId: $listingId, photoId: $photoId) {
      status
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
    case Types.SET_COVER_PHOTO_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.SET_COVER_PHOTO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.payload
      }
    }
    case Types.SET_COVER_PHOTO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        status: action.payload
      }
    }
    case Types.DELETE_PHOTO_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.DELETE_PHOTO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.payload
      }
    }
    case Types.DELETE_PHOTO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        status: action.payload
      }
    }
    default:
      return state
  }
}

// export const onUploadPhoto = (file, category, listingId) => async dispatch => {
//   dispatch({ type: Types.UPLOAD_PHOTO_START })
//   try {
//     const { data } = await getClientWithAuth(dispatch).mutate({
//       mutation: mutationUploadPhoto,
//       variables: {
//         file,
//         category,
//         listingId
//       }
//     })
//     dispatch({ type: Types.UPLOAD_PHOTO_SUCCESS, payload: data.uploadPhoto })
//   } catch (err) {
//     dispatch({ type: Types.UPLOAD_PHOTO_FAILURE, payload: errToMsg(err) })
//   }
// }

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

export const onSetCoverPhoto = (listingId, photoId) => async dispatch => {
  dispatch({ type: Types.SET_COVER_PHOTO_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationSetCoverPhoto,
      variables: {
        listingId,
        photoId
      }
    })
    dispatch({ type: Types.SET_COVER_PHOTO_SUCCESS, payload: data.setCoverPhoto })
  } catch (err) {
    dispatch({ type: Types.SET_COVER_PHOTO_FAILURE, payload: errToMsg(err) })
  }
}

export const onDeletePhoto = (listingId, photoId) => async dispatch => {
  dispatch({ type: Types.DELETE_PHOTO_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationDeletePhoto,
      variables: {
        listingId,
        photoId
      }
    })
    dispatch({ type: Types.DELETE_PHOTO_SUCCESS, payload: data.deletePhoto })
  } catch (err) {
    dispatch({ type: Types.DELETE_PHOTO_FAILURE, payload: errToMsg(err) })
  }
}
