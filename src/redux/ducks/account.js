/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'

import { toast } from 'react-toastify'

// Action Types
export const Types = {
  ACC_GET_PROFILE: '[ACCOUNT] GET PROFILE',
  ACC_GET_PROFILE_SUCCESS: '[ACCOUNT] GET PROFILE SUCCESS',
  ACC_GET_PROFILE_ERROR: '[ACCOUNT] GET PROFILE ERROR',
  ACC_GET_ALL_BOOKINGS_BY_USER: '[ACCOUNT] GET ALL BOOKINGS BY USER',
  ACC_GET_ALL_BOOKINGS_BY_USER_SUCCESS: '[ACCOUNT] GET ALL BOOKINGS BY USER SUCCESS',
  ACC_GET_ALL_BOOKINGS_BY_USER_ERROR: '[ACCOUNT] GET ALL BOOKINGS BY USER ERROR',
  ACC_GET_ALL_LISTINGS_BY_USER: '[ACCOUNT] GET ALL LISTINGS BY USER',
  ACC_GET_ALL_LISTINGS_BY_USER_SUCCESS: '[ACCOUNT] GET ALL LISTINGS BY USER SUCCESS',
  ACC_GET_ALL_LISTINGS_BY_USER_ERROR: '[ACCOUNT] GET ALL LISTINGS BY USER ERROR',
  ACC_UPDATE_LISTING: '[ACCOUNT] UPDATE LISTING',
  ACC_UPDATE_LISTING_SUCCESS: '[ACCOUNT] UPDATE LISTING SUCCESS',
  ACC_UPDATE_LISTING_ERROR: '[ACCOUNT] UPDATE LISTING ERROR',
  ACC_UPDATE_PROFILE: '[ACCOUNT] UPDATE PROFILE',
  ACC_UPDATE_PROFILE_SUCCESS: '[ACCOUNT] UPDATE PROFILE SUCCESS',
  ACC_UPDATE_PROFILE_ERROR: '[ACCOUNT] UPDATE PROFILE ERROR',
  ACC_UPDATE_PROFILE_PICTURE: '[ACCOUNT] UPDATE PROFILE PICTURE',
  ACC_UPDATE_PROFILE_PICTURE_SUCCESS: '[ACCOUNT] UPDATE PROFILE PICTURE SUCCESS',
  ACC_UPDATE_PROFILE_PICTURE_ERROR: '[ACCOUNT] UPDATE PROFILE PICTURE ERROR'
}

// Reducer
const initialState = {
  error: null,
  get: {
    user: null,
    bookings: null,
    listings: null
  },
  isLoading: false
}

// GraphQL
const queryGetProfile = gql`
  query getProfile($id: String!) {
    getUserLegacyById(id: $id) {
      id
      email
      emailConfirmed
      profile {
        status
        profileId
        firstName
        lastName
        picture
        dateOfBirth
        gender
        phoneNumber
        info
      }
		}
  }
`

// GraphQL
const queryGetAllBookingsByUser = gql`
  query getAllBookingsByUser($userId: String, $userType: String, $status: String, $period: [String]) {
    getAllBookingsByUser(userId: $userId, userType: $userType, status: $status, period: $period) {
      count
      items {
        listing {
          title
          location {
            address1
            city
            state
          }
          photos {
            name
          }
          settingsParent {
            category {
              itemName
              otherItemName
            }
            subcategory {
              itemName
              otherItemName
            }
          }
        }
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

// GraphQL
const queryGetAllListingsByUser = gql`
  query getAllListingsByUser($userId: String!, $isPublic: Boolean) {
    getAllListingsByUser(userId: $userId, isPublic: $isPublic) {
      count
      rows {
        id
        title
        isPublished
        isReady
        quantity
        status
        amenities {
          settingsData {
            itemName
            otherItemName
          }
        }
        listingData {
          basePrice
        }
        location {
          address1
          city
          state
        }
        photos {
          name
        }
        settingsParent {
          category {
            itemName
            otherItemName
          }
          subcategory {
            itemName
            otherItemName
          }
        }
      }
		}
  }
`

// GraphQL
const mutationUpdateListing = gql`
  mutation publish($listingId: Int!, $status: Boolean!) {
    publish(listingId: $listingId, status: $status) {
      id,
      isPublished
		}
  }
`

// GraphQL
const mutationUpdateUserProfile = gql`
  mutation updateUserProfileLegacy($userId: String, $input: UserProfileInput) {
    updateUserProfileLegacy(userId: $userId, input: $input) {
      status
		}
  }
`

// GraphQL
const mutationUpdateProfilePicture = gql`
  mutation updateProfilePicture($file: Upload, $userId: String! ) {
    updateProfilePicture(file: $file, userId: $userId) {
      status
		}
  }
`

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ACC_GET_PROFILE:
    case Types.ACC_UPDATE_PROFILE:
    case Types.ACC_UPDATE_PROFILE_PICTURE:
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER:
    case Types.ACC_GET_ALL_LISTINGS_BY_USER:
      return {
        ...state,
        error: null,
        isLoading: true
      }
    case Types.ACC_UPDATE_LISTING: {
      return {
        ...state
      }
    }
    case Types.ACC_GET_PROFILE_SUCCESS:
      return {
        ...state,
        get: { user: action.payload },
        isLoading: false
      }
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER_SUCCESS:
      return {
        ...state,
        get: { bookings: action.payload },
        isLoading: false
      }
    case Types.ACC_GET_ALL_LISTINGS_BY_USER_SUCCESS:
      return {
        ...state,
        get: { listings: action.payload },
        isLoading: false
      }
    case Types.ACC_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case Types.ACC_UPDATE_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        get: {
          listings: {
            count: state.get.listings.count,
            rows: state.get.listings.rows.map((item) => {
              if (item.id !== action.payload.id)
                return item
              return item = { ...item, isPublished: action.payload.isPublished }
            })
          }
        }
      }
    case Types.ACC_UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case Types.ACC_GET_PROFILE_ERROR:
      return {
        ...state,
        get: { user: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER_ERROR:
      return {
        ...state,
        get: { bookings: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_GET_ALL_LISTINGS_BY_USER_ERROR:
      return {
        ...state,
        get: { listings: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_UPDATE_LISTING_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_UPDATE_PROFILE_PICTURE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export const onGetProfile = id => async dispatch => {
  dispatch({ type: Types.ACC_GET_PROFILE })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetProfile,
      variables: { id },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.ACC_GET_PROFILE_SUCCESS, payload: data.getUserLegacyById })
  } catch (error) {
    console.log(error)
    dispatch({ type: Types.ACC_GET_PROFILE_ERROR, payload: error })
  }
}

export const onGetBookingsByUser = (userId, userType, status, period) => async dispatch => {
  dispatch({ type: Types.ACC_GET_ALL_BOOKINGS_BY_USER })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllBookingsByUser,
      variables: { userId, userType, status, period },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.ACC_GET_ALL_BOOKINGS_BY_USER_SUCCESS, payload: data.getAllBookingsByUser })
  } catch (error) {
    console.log(error)
    dispatch({ type: Types.ACC_GET_ALL_BOOKINGS_BY_USER_ERROR, payload: error })
  }
}

export const onGetListingsByUser = (userId, status) => async dispatch => {
  dispatch({ type: Types.ACC_GET_ALL_LISTINGS_BY_USER })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllListingsByUser,
      variables: { userId, status },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.ACC_GET_ALL_LISTINGS_BY_USER_SUCCESS, payload: data.getAllListingsByUser })
  } catch (error) {
    console.log(error)
    dispatch({ type: Types.ACC_GET_ALL_LISTINGS_BY_USER_ERROR, payload: error })
  }
}

export const onUpdateListing = (listingId, status) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_LISTING })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateListing,
      variables: { listingId, status }
    })
    toast.success("Listing updated successfully");
    dispatch({ type: Types.ACC_UPDATE_LISTING_SUCCESS, payload: data.publish })
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: Types.ACC_UPDATE_LISTING_ERROR, payload: error.message })
  }
}

export const onUpdateProfile = (userId, input) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_PROFILE })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateUserProfile,
      variables: { userId, input }
    })
    toast.success("Profile updated successfully");
    dispatch({ type: Types.ACC_UPDATE_PROFILE_SUCCESS })
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: Types.ACC_UPDATE_PROFILE_ERROR, payload: error.message })
  }
}

export const onUpdateProfilePicture = (file, userId) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateProfilePicture,
      variables: { userId, file }
    })
    toast.success("Profile updated successfully");
    dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE_SUCCESS })
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE_ERROR, payload: error.message })
  }
}