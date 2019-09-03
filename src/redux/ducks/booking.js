/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import { config } from 'contants'

// Actions
export const Types = {
  CREATE_BOOKING_START: 'CREATE_BOOKING_START',
  CREATE_BOOKING_SUCCESS: 'CREATE_BOOKING_SUCCESS',
  CREATE_BOOKING_FAILURE: 'CREATE_BOOKING_FAILURE',
  GET_PENDING_BOOKING_REQUEST: 'GET_PENDING_BOOKING_REQUEST',
  GET_PENDING_BOOKING_SUCCESS: 'GET_PENDING_BOOKING_SUCCESS',
  GET_PENDING_BOOKING_FAILURE: 'GET_PENDING_BOOKING_FAILURE',
  TIMEOUT_BOOKING_START: 'TIMEOUT_BOOKING_START',
  TIMEOUT_BOOKING_SUCCESS: 'TIMEOUT_BOOKING_SUCCESS',
  TIMEOUT_BOOKING_FAILURE: 'TIMEOUT_BOOKING_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  create: {
    object: null,
    isLoading: false,
    error: null
  },
  pending: {
    object: null,
    isLoading: false,
    error: null
  },
  timeout: {
    object: null,
    isLoading: false,
    error: null
  },
}

// GraphQL
const mutationCreateBooking = gql`
  mutation createBooking(
    $listingId: Int!
    $hostId: String!
    $guestId: String!
    $basePrice: Float!
    $priceType: String!
    $currency: String!
    $bookingType: String!
    $reservations: [String]!
    $period: Int!
    $isAbsorvedFee: Boolean
  ) {
    createBooking(
      listingId: $listingId
      hostId: $hostId
      guestId: $guestId
      basePrice: $basePrice
      priceType: $priceType
      currency: $currency
      bookingType: $bookingType
      reservations: $reservations
      period: $period
      isAbsorvedFee: $isAbsorvedFee
    ) {
      bookingId
    }
  }
`

const mutationTimeoutBooking = gql`
  mutation timeoutBooking($bookingId: String!) {
    timeoutBooking(bookingId: $bookingId) {
      status
    }
  }
`

const queryGetPendingBooking = gql`
  query getPendingBookingsByUser($listingId: Int!, $userId: String!) {
    getPendingBookingsByUser(listingId: $listingId, userId: $userId) {
      count
      bookings {
        listingId
        quantity
        currency
        totalPrice
        bookingType
        basePrice
        createdAt
        period
        sourceId
        bookingState
        chargeId
        hostServiceFee
        confirmationCode
        bookingId
        guestServiceFee
        hostId
        paymentState
        updatedAt
        priceType
        guestId
        checkIn
        checkOut
        reservations
      }
    }
  }
`;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_BOOKING_START: {
      return {
        ...state,
        create: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CREATE_BOOKING_SUCCESS: {
      return {
        ...state,
        create: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.CREATE_BOOKING_FAILURE: {
      return {
        ...state,
        create: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.TIMEOUT_BOOKING_START: {
      return {
        ...state,
        timeout: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.TIMEOUT_BOOKING_SUCCESS: {
      return {
        ...state,
        timeout: {
          isLoading: false,
          object: action.payload
        },
        pending: {
          object: null,
        },
      }
    }
    case Types.TIMEOUT_BOOKING_FAILURE: {
      return {
        ...state,
        timeout: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_PENDING_BOOKING_REQUEST: {
      return {
        ...state,
        pending: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_PENDING_BOOKING_SUCCESS: {
      return {
        ...state,
        pending: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_PENDING_BOOKING_FAILURE: {
      return {
        ...state,
        pending: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return state
  }
}

// Action Creators

// Side Effects
export const onCreateBooking = object => async dispatch => {
  dispatch({ type: Types.CREATE_BOOKING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateBooking,
      variables: object
    })
    dispatch({ type: Types.CREATE_BOOKING_SUCCESS, payload: data.createBooking })
    window.location.href = `${config.legacy}/checkout/${data.createBooking.bookingId}`
  } catch (err) {
    dispatch({ type: Types.CREATE_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}

export const onTimeoutBooking = bookingId => async dispatch => {
  dispatch({ type: Types.TIMEOUT_BOOKING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationTimeoutBooking,
      variables: { bookingId }
    })
    dispatch({ type: Types.TIMEOUT_BOOKING_SUCCESS, payload: data.timeoutBooking })
  } catch (err) {
    dispatch({ type: Types.TIMEOUT_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetPendingBooking = (listingId, userId) => async dispatch => {
  dispatch({ type: Types.GET_PENDING_BOOKING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPendingBooking,
      variables: { listingId, userId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_PENDING_BOOKING_SUCCESS, payload: data.getPendingBookingsByUser })
  } catch (err) {
    dispatch({ type: Types.GET_PENDING_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}