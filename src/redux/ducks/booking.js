/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { toast } from 'react-toastify'
import crypto from 'crypto'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
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
  TIMEOUT_BOOKING_FAILURE: 'TIMEOUT_BOOKING_FAILURE',
  GET_BOOKING_REQUEST: 'GET_BOOKING_REQUEST',
  GET_BOOKING_SUCCESS: 'GET_BOOKING_SUCCESS',
  GET_BOOKING_FAILURE: 'GET_BOOKING_FAILURE',
  GET_LISTING_INFO_REQUEST: 'GET_LISTING_INFO_REQUEST',
  GET_LISTING_INFO_SUCCESS: 'GET_LISTING_INFO_SUCCESS',
  GET_LISTING_INFO_FAILURE: 'GET_LISTING_INFO_FAILURE',
  ACCEPT_BOOKING_START: 'ACCEPT_BOOKING_START',
  ACCEPT_BOOKING_SUCCESS: 'ACCEPT_BOOKING_SUCCESS',
  ACCEPT_BOOKING_FAILURE: 'ACCEPT_BOOKING_FAILURE',
  ACCEPTED_BOOKING_BY_EMAIL: 'ACCEPTED_BOOKING_BY_EMAIL',
  DECLINE_BOOKING_START: 'DECLINE_BOOKING_START',
  DECLINE_BOOKING_SUCCESS: 'DECLINE_BOOKING_SUCCESS',
  DECLINE_BOOKING_FAILURE: 'DECLINE_BOOKING_FAILURE',
  DECLINED_BOOKING_BY_EMAIL: 'DECLINED_BOOKING_BY_EMAIL'
}

// Initial State
const initialState = {
  isLoading: false,
  get: {
    isLoading: true,
    error: null,
    object: null
  },
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
  listing: {
    isLoading: true,
    error: null,
    object: null
  },
  accept: {
    object: null,
    isLoading: false,
    error: null
  },
  decline: {
    object: null,
    isLoading: false,
    error: null
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
    $checkInHour: String!
    $checkOutHour: String!
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
      checkInHour: $checkInHour
      checkOutHour: $checkOutHour
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

const mutationAcceptBooking = gql`
  mutation acceptBooking($bookingId: String!) {
    acceptBooking(bookingId: $bookingId) {
      status
    }
  }
`

const mutationDeclineBooking = gql`
  mutation declineBooking($bookingId: String!) {
    declineBooking(bookingId: $bookingId) {
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

const queryGetBookingById = gql`
  query getBookingById($id: String!) {
    getBookingById(id: $id) {
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
      listing {
        id
        userId
        title
        coverPhotoId
        bookingPeriod
        isPublished
        isReady
        quantity
        status
        createdAt
        updatedAt
        count
        user {
          id
          profile {
            firstName
            lastName
            createdAt
            picture
          }
        }
        accessDays {
          id
          listingId
          mon
          tue
          wed
          thu
          fri
          sat
          sun
          all247
          createdAt
          updatedAt
          listingAccessHours {
            id
            listingAccessDaysId
            weekday
            openHour
            closeHour
            allday
            createdAt
            updatedAt
          }
        }

        listingData {
          listingId
          isAbsorvedFee
          basePrice
        }

        location {
          id
          country
          address1
          buildingName
          city
          state
          zipcode
        }
      }
    }
  }
`

const queryGetListingInfo = gql`
  query getListingById($id: Int!, $isPublic: Boolean) {
    getListingById(id: $id, isPublic: $isPublic) {
      id
      title
      bookingPeriod
      listingData {
        isAbsorvedFee
        basePrice
        currency
        accessType
        minTerm
        basePrice
        currency
        capacity
        size
        meetingRooms
        isFurnished
        carSpace
        sizeOfVehicle
        maxEntranceHeight
        bookingType
        spaceType
      }
      location {
        id
        userId
        country
        address1
        address2
        buildingName
        city
        state
        zipcode
        lat
        lng
        createdAt
        updatedAt
      }
      accessDays {
        id
        listingId
        mon
        tue
        wed
        thu
        fri
        sat
        sun
        all247
        createdAt
        updatedAt
        listingAccessHours {
          id
          listingAccessDaysId
          weekday
          openHour
          closeHour
          allday
          createdAt
          updatedAt
        }
      }
      photos {
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
      user {
        id
        email
        provider
        profile {
          displayName
          picture
          firstName
        }
      }
      settingsParent {
        id
        category {
          id
          itemName
          otherItemName
        }
        subcategory {
          id
          itemName
          otherItemName
        }
      }
    }
  }
`

const queryGetHourlyPeriod = gql`
  query getHourlyPeriod($checkInHour: String!, $checkOutHour: String!) {
    getHourlyPeriod(checkInHour: $checkInHour, checkOutHour: $checkOutHour) {
      __typename
      hours
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
    case Types.ACCEPT_BOOKING_START: {
      return {
        ...state,
        accept: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.ACCEPT_BOOKING_SUCCESS: {
      return {
        ...state,
        accept: {
          isLoading: false,
          object: action.payload
        },
        pending: {
          object: null
        }
      }
    }
    case Types.ACCEPT_BOOKING_FAILURE: {
      return {
        ...state,
        accept: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.DECLINE_BOOKING_START: {
      return {
        ...state,
        decline: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.DECLINE_BOOKING_SUCCESS: {
      return {
        ...state,
        decline: {
          isLoading: false,
          object: action.payload
        },
        pending: {
          object: null
        }
      }
    }
    case Types.DECLINE_BOOKING_FAILURE: {
      return {
        ...state,
        decline: {
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
    case Types.GET_BOOKING_REQUEST: {
      return {
        ...state,
        get: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_BOOKING_SUCCESS: {
      return {
        ...state,
        get: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_BOOKING_FAILURE: {
      return {
        ...state,
        get: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_LISTING_INFO_REQUEST: {
      return {
        ...state,
        listing: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_LISTING_INFO_SUCCESS: {
      return {
        ...state,
        listing: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.GET_LISTING_INFO_FAILURE: {
      return {
        ...state,
        listing: {
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
const getHash = value =>
  crypto
    .createHash('sha256')
    .update(value, 'utf8')
    .digest('hex')

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

export const onAcceptBooking = bookingId => async dispatch => {
  dispatch({ type: Types.ACCEPT_BOOKING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationAcceptBooking,
      variables: { bookingId }
    })
    dispatch({ type: Types.ACCEPT_BOOKING_SUCCESS, payload: data.acceptBooking })
  } catch (err) {
    dispatch({ type: Types.ACCEPT_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}

export const onDeclineBooking = bookingId => async dispatch => {
  dispatch({ type: Types.DECLINE_BOOKING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationDeclineBooking,
      variables: { bookingId }
    })
    dispatch({ type: Types.DECLINE_BOOKING_SUCCESS, payload: data.declineBooking })
  } catch (err) {
    dispatch({ type: Types.DECLINE_BOOKING_FAILURE, payload: errToMsg(err) })
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

export const onGetBooking = id => async dispatch => {
  dispatch({ type: Types.GET_BOOKING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetBookingById,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_BOOKING_SUCCESS, payload: data.getBookingById })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({ type: Types.GET_BOOKING_FAILURE, payload: errToMsg(err) })
  }
}

// Side Effects
export const onGetListingInfo = id => async dispatch => {
  dispatch({ type: Types.GET_LISTING_INFO_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetListingInfo,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_LISTING_INFO_SUCCESS, payload: data.getListingById })
  } catch (err) {
    dispatch({ type: Types.GET_LISTING_INFO_FAILURE, payload: errToMsg(err) })
  }
}

export const onAcceptDeclineByEmail = (bookingId, emailAction, userId) => dispatch =>
  new Promise(async resolve => {
    let mutation
    let dispatchType
    try {
      const approveChecking = getHash(`${userId}APPROVE`)
      if (approveChecking === emailAction) {
        mutation = mutationAcceptBooking
        dispatchType = Types.ACCEPTED_BOOKING_BY_EMAIL
      } else {
        const declineChecking = getHash(`${userId}DECLINE`)
        if (declineChecking === emailAction) {
          mutation = mutationDeclineBooking
          dispatchType = Types.DECLINED_BOOKING_BY_EMAIL
        }
      }
      if (mutation) {
        await getClientWithAuth(dispatch).mutate({ mutation, variables: { bookingId } })
      }
      dispatch({ type: dispatchType })
      resolve()
    } catch (err) {
      console.error(err)
      resolve()
    }
  })

export const onGetHourlyPeriod = (startTime, endTime) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await getClient().query({
        query: queryGetHourlyPeriod,
        variables: { checkInHour: startTime, checkOutHour: endTime },
        fetchPolicy: 'network-only'
      })
      resolve(data.getHourlyPeriod.hours)
    } catch (err) {
      reject(errToMsg(err))
    }
  })
}
