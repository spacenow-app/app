/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { toast } from 'react-toastify'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

export const Types = {
  REVIEWS_PUBLIC_REQUEST: 'REVIEWS_PUBLIC_REQUEST',
  REVIEWS_PUBLIC_SUCCESS: 'REVIEWS_PUBLIC_SUCCESS',
  REVIEWS_PUBLIC_FAILURE: 'REVIEWS_PUBLIC_FAILURE',
  REVIEWS_PRIVATE_REQUEST: 'REVIEWS_PRIVATE_REQUEST',
  REVIEWS_PRIVATE_SUCCESS: 'REVIEWS_PRIVATE_SUCCESS',
  REVIEWS_PRIVATE_FAILURE: 'REVIEWS_PRIVATE_FAILURE',
  REVIEWS_CREATE_RESET: 'REVIEWS_CREATE_RESET',
  REVIEWS_CREATE_REQUEST: 'REVIEWS_CREATE_REQUEST',
  REVIEWS_CREATE_SUCCESS: 'REVIEWS_CREATE_SUCCESS',
  REVIEWS_CREATE_FAILURE: 'REVIEWS_CREATE_FAILURE'
}

const initialState = {
  isLoading: false,
  get: {
    public: [],
    private: [],
    error: null
  },
  create: {
    status: null,
    error: null
  }
}

const reviewFields = `
  __typename
  id
  reservationId
  listId
  reviewContent
  rating
  createdAt
  author {
    __typename
    id
    profile {
      __typename
      profileId
      firstName
      picture
    }
  }
`

const queryGetPublicReviews = gql`
  query getPublicReviews($listingId: Int!) {
    getPublicReviews(listingId: $listingId) {
      ${reviewFields}
    }
  }
`

const queryGetPrivateReviews = gql`
  query getPrivateReviews($listingId: Int!) {
    getPrivateReviews(listingId: $listingId) {
      ${reviewFields}
    }
  }
`

const mutationCreateReview = gql`
  mutation createReview($bookingId: String!, $publicComment: String!, $privateComment: String, $rating: Int!) {
    createReview(
      bookingId: $bookingId
      publicComment: $publicComment
      privateComment: $privateComment
      rating: $rating
    ) {
      ${reviewFields}
    }
  }
`

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.REVIEWS_PUBLIC_REQUEST: {
      return {
        ...state,
        isLoading: true,
        get: {
          ...state.get,
          public: [],
          error: null
        }
      }
    }
    case Types.REVIEWS_PUBLIC_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          public: action.payload,
          error: null
        }
      }
    }
    case Types.REVIEWS_PUBLIC_FAILURE: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          public: [],
          error: action.payload
        }
      }
    }
    case Types.REVIEWS_PRIVATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        get: {
          ...state.get,
          private: [],
          error: null
        }
      }
    }
    case Types.REVIEWS_PRIVATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          private: action.payload,
          error: null
        }
      }
    }
    case Types.REVIEWS_PRIVATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          private: [],
          error: action.payload
        }
      }
    }
    case Types.REVIEWS_CREATE_RESET: {
      return {
        ...state,
        isLoading: true,
        create: {
          ...state.get,
          status: null,
          error: null
        }
      }
    }
    case Types.REVIEWS_CREATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        create: {
          ...state.get,
          status: null,
          error: null
        }
      }
    }
    case Types.REVIEWS_CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        create: {
          ...state.get,
          status: 'OK',
          error: null
        }
      }
    }
    case Types.REVIEWS_CREATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          status: 'FAILURE',
          error: action.payload
        }
      }
    }
    default:
      return state
  }
}

export const onGetPublicReviews = listingId => async dispatch => {
  dispatch({ type: Types.REVIEWS_PUBLIC_REQUEST })
  try {
    const { data } = await getClient().query({
      query: queryGetPublicReviews,
      variables: { listingId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.REVIEWS_PUBLIC_SUCCESS, payload: data.getPublicReviews })
  } catch (err) {
    dispatch({ type: Types.REVIEWS_PUBLIC_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetPrivateReviews = listingId => async dispatch => {
  dispatch({ type: Types.REVIEWS_PRIVATE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPrivateReviews,
      variables: { listingId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.REVIEWS_PRIVATE_SUCCESS, payload: data.getPrivateReviews })
  } catch (err) {
    dispatch({ type: Types.REVIEWS_PRIVATE_FAILURE, payload: errToMsg(err) })
  }
}

export const onPrepareReview = () => async dispatch => dispatch({ type: Types.REVIEWS_CREATE_RESET })

export const onCreateReview = (bookingId, publicComment, privateComment, rating) => async dispatch => {
  dispatch({ type: Types.REVIEWS_CREATE_REQUEST })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateReview,
      variables: { bookingId, publicComment, privateComment, rating }
    })
    dispatch({ type: Types.REVIEWS_CREATE_SUCCESS })
  } catch (err) {
    const msg = errToMsg(err)
    if (msg === 'FEEDBACK_EXISTING') toast.warning(`You already provided a review for this space`)
    dispatch({ type: Types.REVIEWS_CREATE_FAILURE, payload: msg })
  }
}
