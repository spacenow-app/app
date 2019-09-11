/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import { config } from 'variables'

// Actions
export const Types = {
  GET_BOOKING_REQUEST = 'GET_BOOKING_REQUEST',
  GET_BOOKING_SUCCESS = 'GET_BOOKING_SUCCESS',
  GET_BOOKING_FAILURE = 'GET_BOOKING_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  reservationData: {},
}

const queryGetBookingState = gql`
  query getBookingState($bookingId: String!) {
    getBooking(bookingId: $bookingId) {
      bookingId
      bookingState
    }
  }
`;

const queryGetBooking = gql`
  query getBooking($bookingId: String!) {
    getBooking(bookingId: $bookingId) {
      bookingId
      quantity
      currency
      totalPrice
      listingId
      totalDays
      basePrice
      createdAt
      sourceId
      chargeId
      hostServiceFee
      bookingState
      confirmationCode
      bookingId
      guestServiceFee
      fees
      hostId
      paymentState
      updatedAt
      priceType
      guestId
      period
      reservations
    }
  }
`;


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_BOOKING_REQUEST: {
      return {
        ...state,
        create: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_BOOKING_SUCCESS: {
      return {
        ...state,
        create: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_BOOKING_FAILURE: {
      return {
        ...state,
        create: {
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
export const onGetBooking = bookingId => async dispatch => {
  dispatch({ type: Types.GET_BOOKING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: queryGetBooking,
      variables: bookingId
    })
    dispatch({ type: Types.GET_BOOKING_SUCCESS, payload: data.getBooking })
  } catch (err) {
    dispatch({ type: Types.GET_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}