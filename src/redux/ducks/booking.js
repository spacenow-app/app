/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

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
  get: {
    object: {
      listing: {
        id: 45,
        userId: 'f06a7ae0-6c7e-11e9-942d-87c6dd02066d',
        title: 'Auction Rooms',
        coverPhotoId: null,
        bookingPeriod: 'daily',
        isPublished: true,
        isReady: true,
        quantity: 1,
        status: 'active',
        createdAt: '2019-05-02T06:01:05.000Z',
        updatedAt: '2019-05-02T06:09:01.000Z',
        count: null,
        listingData: {
          listingId: 45,
          isAbsorvedFee: false,
          basePrice: 34.5
        },
        location: {
          id: 45,
          country: 'AU',
          address1: '33 Elizabeth Street',
          buildingName: ' 2',
          city: 'Richmond',
          state: 'VIC',
          zipcode: '3121'
        },
        accessDays: {
          id: 83,
          listingId: 45,
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
          sun: false,
          all247: false,
          createdAt: '2019-05-02T06:01:08.000Z',
          updatedAt: '2019-05-02T06:03:05.000Z',
          listingAccessHours: [
            {
              id: 637,
              listingAccessDaysId: 83,
              weekday: 1,
              openHour: '2019-05-01T22:00:00.000Z',
              closeHour: '2019-05-02T07:00:00.000Z',
              allday: false,
              createdAt: '2019-05-02T06:03:05.000Z',
              updatedAt: '2019-05-02T06:03:05.000Z'
            },
            {
              id: 638,
              listingAccessDaysId: 83,
              weekday: 2,
              openHour: '2019-05-01T22:00:00.000Z',
              closeHour: '2019-05-02T07:00:00.000Z',
              allday: false,
              createdAt: '2019-05-02T06:03:05.000Z',
              updatedAt: '2019-05-02T06:03:05.000Z'
            },
            {
              id: 639,
              listingAccessDaysId: 83,
              weekday: 3,
              openHour: '2019-05-01T22:00:00.000Z',
              closeHour: '2019-05-02T07:00:00.000Z',
              allday: false,
              createdAt: '2019-05-02T06:03:05.000Z',
              updatedAt: '2019-05-02T06:03:05.000Z'
            },
            {
              id: 640,
              listingAccessDaysId: 83,
              weekday: 4,
              openHour: '2019-05-01T22:00:00.000Z',
              closeHour: '2019-05-02T07:00:00.000Z',
              allday: false,
              createdAt: '2019-05-02T06:03:05.000Z',
              updatedAt: '2019-05-02T06:03:05.000Z'
            },
            {
              id: 641,
              listingAccessDaysId: 83,
              weekday: 5,
              openHour: '2019-05-02T06:03:02.000Z',
              closeHour: '2019-05-02T06:03:02.000Z',
              allday: true,
              createdAt: '2019-05-02T06:03:05.000Z',
              updatedAt: '2019-05-02T06:03:05.000Z'
            }
          ]
        }
      },
      listingId: 45,
      quantity: 1,
      currency: 'AUD',
      totalPrice: 117.4725,
      bookingType: 'instant',
      basePrice: 34.5,
      createdAt: 1568169320644,
      period: 3,
      sourceId: null,
      bookingState: 'pending',
      chargeId: null,
      hostServiceFee: 0,
      confirmationCode: 90000891666,
      bookingId: 'cc76e120-d43c-11e9-8fe5-a5b81f1124a1',
      guestServiceFee: 0.135,
      hostId: 'f06a7ae0-6c7e-11e9-942d-87c6dd02066d',
      paymentState: 'pending',
      updatedAt: 1568169320644,
      priceType: 'daily',
      guestId: 'f0889e50-6056-11e9-9917-7f151ab760a4',
      checkIn: '2019-09-24',
      checkOut: '2019-09-26',
      reservations: ['2019-09-24T02:00:00.000Z', '2019-09-25T02:00:00.000Z', '2019-09-26T02:00:00.000Z']
    }
  }
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
      items {
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
`

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
          object: null
        }
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
export const onCreateBooking = (object, history) => async dispatch => {
  dispatch({ type: Types.CREATE_BOOKING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreateBooking,
      variables: object
    })
    dispatch({ type: Types.CREATE_BOOKING_SUCCESS, payload: data.createBooking })
    history.push(`/checkout/${data.createBooking.bookingId}`)
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
