/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

export const Types = {
  REVIEWS_PUBLIC_REQUEST: 'REVIEWS_PUBLIC_REQUEST',
  REVIEWS_PUBLIC_SUCCESS: 'REVIEWS_PUBLIC_SUCCESS',
  REVIEWS_PUBLIC_FAILURE: 'REVIEWS_PUBLIC_FAILURE',
  REVIEWS_PRIVATE_REQUEST: 'REVIEWS_PRIVATE_REQUEST',
  REVIEWS_PRIVATE_SUCCESS: 'REVIEWS_PRIVATE_SUCCESS',
  REVIEWS_PRIVATE_FAILURE: 'REVIEWS_PRIVATE_FAILURE',
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
  }
}

const queryGetPublicReviews = gql`
  query getPublicReviews($listingId: Int!) {
    getPublicReviews(listingId: $listingId) {
      __typename
      id
      reservationId
      listId
      authorId
      reviewContent
      rating
    }
  }
`

const queryGetPrivateReviews = gql`
  query getPrivateReviews($listingId: Int!) {
    getPrivateReviews(listingId: $listingId) {
      __typename
      id
      reservationId
      listId
      authorId
      reviewContent
      privateFeedback
      rating
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
      __typename
      id
      reservationId
      listId
      authorId
      reviewContent
      rating
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
    case Types.REVIEWS_CREATE_REQUEST: {
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
    case Types.REVIEWS_CREATE_SUCCESS: {
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
    case Types.REVIEWS_CREATE_FAILURE: {
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

export const onCreateReview = (bookingId, publicComment, privateComment, rating) => async dispatch => {
  dispatch({ type: Types.REVIEWS_CREATE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      query: mutationCreateReview,
      variables: { bookingId, publicComment, privateComment, rating }
    })
    dispatch({ type: Types.REVIEWS_CREATE_SUCCESS, payload: data.createReview })
  } catch (err) {
    dispatch({ type: Types.REVIEWS_CREATE_FAILURE, payload: errToMsg(err) })
  }
}
