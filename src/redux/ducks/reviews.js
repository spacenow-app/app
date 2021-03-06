/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { toast } from 'react-toastify'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

const DEFAULT_PAGE_SIZE = 5

export const Types = {
  REVIEWS_PUBLIC_REQUEST: 'REVIEWS_PUBLIC_REQUEST',
  REVIEWS_PUBLIC_SUCCESS: 'REVIEWS_PUBLIC_SUCCESS',
  REVIEWS_PUBLIC_FAILURE: 'REVIEWS_PUBLIC_FAILURE',
  REVIEWS_GOOGLE_REQUEST: 'REVIEWS_GOOGLE_REQUEST',
  REVIEWS_GOOGLE_SUCCESS: 'REVIEWS_GOOGLE_SUCCESS',
  REVIEWS_GOOGLE_FAILURE: 'REVIEWS_GOOGLE_FAILURE',
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
    google: [],
    totalPages: 0,
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
  ratingOverall
  ratingCheckIn
  ratingHost
  ratingValue
  ratingCleanliness
  ratingLocation
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

const googleReviewFields = `
  __typename
  author_name
  profile_photo_url
  rating
  text
  time
  relative_time_description
`

const queryGetPublicReviews = gql`
  query getPublicReviews($listingId: Int!, $page: Int, $pageSize: Int) {
    getPublicReviews(listingId: $listingId, page: $page, pageSize: $pageSize) {
      totalPages
      result {
        ${reviewFields}
      }
    }
  }
`

const queryGetGoogleReviews = gql`
  query getGoogleReviews($placeId: String) {
    getGoogleReviews(placeId: $placeId) {
      rating
      reviews {
        ${googleReviewFields}
      }
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

const mutationCreateReviewFromGuest = gql`
  mutation createReviewFromGuest(
    $bookingId: String!
    $publicComment: String!
    $privateComment: String
    $ratingOverall: Int!
    $ratingCheckIn: Int!
    $ratingHost: Int!
    $ratingValue: Int!
    $ratingCleanliness: Int!
    $ratingLocation: Int!
  ) {
    createReviewFromGuest(
      bookingId: $bookingId
      publicComment: $publicComment
      privateComment: $privateComment
      ratingOverall: $ratingOverall
      ratingCheckIn: $ratingCheckIn
      ratingHost: $ratingHost
      ratingValue: $ratingValue
      ratingCleanliness: $ratingCleanliness
      ratingLocation: $ratingLocation
    ) {
      __typename
    }
  }
`

const mutationCreateReviewFromHost = gql`
  mutation createReviewFromHost($bookingId: String!, $publicComment: String!, $ratingOverall: Int!) {
    createReviewFromHost(bookingId: $bookingId, publicComment: $publicComment, ratingOverall: $ratingOverall) {
      __typename
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
          totalPages: 0,
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
          public: action.payload.result,
          totalPages: action.payload.totalPages,
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
          totalPages: 0,
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
    case Types.REVIEWS_GOOGLE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        get: {
          ...state.get,
          google: [],
          error: null
        }
      }
    }
    case Types.REVIEWS_GOOGLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          google: action.payload,
          error: null
        }
      }
    }
    case Types.REVIEWS_GOOGLE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          google: [],
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

export const onGetPublicReviews = (listingId, page = 1) => async dispatch => {
  dispatch({ type: Types.REVIEWS_PUBLIC_REQUEST })
  try {
    const { data } = await getClient().query({
      query: queryGetPublicReviews,
      variables: { listingId, page, pageSize: DEFAULT_PAGE_SIZE },
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

export const onGetGoogleReviews = placeId => async dispatch => {
  dispatch({ type: Types.REVIEWS_GOOGLE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetGoogleReviews,
      variables: { placeId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.REVIEWS_GOOGLE_SUCCESS, payload: data.getGoogleReviews })
  } catch (err) {
    dispatch({ type: Types.REVIEWS_GOOGLE_FAILURE, payload: errToMsg(err) })
  }
}

export const onPrepareReview = () => async dispatch => dispatch({ type: Types.REVIEWS_CREATE_RESET })

export const onCreateReviewFromGuest = (
  bookingId,
  publicComment,
  ratingOverall,
  ratingCheckIn,
  ratingHost,
  ratingValue,
  ratingCleanliness,
  ratingLocation
) => async dispatch => {
  dispatch({ type: Types.REVIEWS_CREATE_REQUEST })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateReviewFromGuest,
      variables: {
        bookingId,
        publicComment,
        ratingOverall,
        ratingCheckIn,
        ratingHost,
        ratingValue,
        ratingCleanliness,
        ratingLocation
      }
    })
    dispatch({ type: Types.REVIEWS_CREATE_SUCCESS })
  } catch (err) {
    const msg = errToMsg(err)
    if (msg === 'FEEDBACK_EXISTING') {
      toast.warning(`You have already provided a review for this space.`)
    } else {
      toast.error(msg)
    }
    dispatch({ type: Types.REVIEWS_CREATE_FAILURE, payload: msg })
  }
}

export const onCreateReviewFromHost = (bookingId, publicComment, ratingOverall) => async dispatch => {
  dispatch({ type: Types.REVIEWS_CREATE_REQUEST })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateReviewFromHost,
      variables: {
        bookingId,
        publicComment,
        ratingOverall
      }
    })
    dispatch({ type: Types.REVIEWS_CREATE_SUCCESS })
  } catch (err) {
    const msg = errToMsg(err)
    if (msg === 'FEEDBACK_EXISTING') {
      toast.warning(`You have already provided a review for this space.`)
    } else {
      toast.error(msg)
    }
    dispatch({ type: Types.REVIEWS_CREATE_FAILURE, payload: msg })
  }
}
