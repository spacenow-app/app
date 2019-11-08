/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import { toast } from 'react-toastify'

import errToMsg from 'utils/errToMsg'

// Action Types
export const Types = {
  ACC_GET_PROFILE: '[ACCOUNT] GET PROFILE',
  ACC_GET_PROFILE_SUCCESS: '[ACCOUNT] GET PROFILE SUCCESS',
  ACC_GET_PROFILE_ERROR: '[ACCOUNT] GET PROFILE ERROR',
  ACC_GET_DOCUMENTS: '[ACCOUNT] GET DOCUMENTS',
  ACC_GET_DOCUMENTS_SUCCESS: '[ACCOUNT] GET DOCUMENTS SUCCESS',
  ACC_GET_DOCUMENTS_ERROR: '[ACCOUNT] GET DOCUMENTS ERROR',
  ACC_DELETE_DOCUMENT: '[ACCOUNT] DELETE DOCUMENT',
  ACC_DELETE_DOCUMENT_SUCCESS: '[ACCOUNT] DELETE DOCUMENT SUCCESS',
  ACC_DELETE_DOCUMENT_ERROR: '[ACCOUNT] DELETE DOCUMENT ERROR',
  ACC_GET_ALL_BOOKINGS_BY_USER: '[ACCOUNT] GET ALL BOOKINGS BY USER',
  ACC_GET_ALL_BOOKINGS_BY_USER_SUCCESS: '[ACCOUNT] GET ALL BOOKINGS BY USER SUCCESS',
  ACC_GET_ALL_BOOKINGS_BY_USER_ERROR: '[ACCOUNT] GET ALL BOOKINGS BY USER ERROR',
  ACC_GET_ALL_LISTINGS_BY_USER: '[ACCOUNT] GET ALL LISTINGS BY USER',
  ACC_GET_ALL_LISTINGS_BY_USER_SUCCESS: '[ACCOUNT] GET ALL LISTINGS BY USER SUCCESS',
  ACC_GET_ALL_LISTINGS_BY_USER_ERROR: '[ACCOUNT] GET ALL LISTINGS BY USER ERROR',
  ACC_UPDATE_LISTING: '[ACCOUNT] UPDATE LISTING',
  ACC_UPDATE_LISTING_SUCCESS: '[ACCOUNT] UPDATE LISTING SUCCESS',
  ACC_UPDATE_LISTING_ERROR: '[ACCOUNT] UPDATE LISTING ERROR',
  ACC_DELETE_LISTING: '[ACCOUNT] DELETE LISTING',
  ACC_DELETE_LISTING_SUCCESS: '[ACCOUNT] DELETE LISTING SUCCESS',
  ACC_DELETE_LISTING_ERROR: '[ACCOUNT] DELETE LISTING ERROR',
  ACC_UPDATE_PROFILE: '[ACCOUNT] UPDATE PROFILE',
  ACC_UPDATE_PROFILE_SUCCESS: '[ACCOUNT] UPDATE PROFILE SUCCESS',
  ACC_UPDATE_PROFILE_ERROR: '[ACCOUNT] UPDATE PROFILE ERROR',
  ACC_UPDATE_PROFILE_PICTURE: '[ACCOUNT] UPDATE PROFILE PICTURE',
  ACC_UPDATE_PROFILE_PICTURE_SUCCESS: '[ACCOUNT] UPDATE PROFILE PICTURE SUCCESS',
  ACC_UPDATE_PROFILE_PICTURE_ERROR: '[ACCOUNT] UPDATE PROFILE PICTURE ERROR',
  ACC_UPLOAD_DOCUMENT: '[ACCOUNT] UPLOAD DOCUMENT',
  ACC_UPLOAD_DOCUMENT_SUCCESS: '[ACCOUNT] UPLOAD DOCUMENT SUCCESS',
  ACC_UPLOAD_DOCUMENT_ERROR: '[ACCOUNT] UPLOAD DOCUMENT ERROR',
  ACC_GET_RESEND_LINK: '[ACCOUNT] GET RESEND LINK',
  ACC_GET_RESEND_LINK_SUCCESS: '[ACCOUNT] GET RESEND LINK SUCCESS',
  ACC_GET_RESEND_LINK_ERROR: '[ACCOUNT] GET RESEND LINK ERROR'
}

// Reducer
const initialState = {
  error: null,
  get: {
    user: {
      id: null,
      email: null,
      profile: {
        profileId: null,
        firstName: null,
        lastName: null,
        picture: null
      },
      verification: {
        isEmailVerification: false
      }
    },
    documents: null,
    bookings: null,
    listings: null
  },
  isLoading: false
}

// GraphQL
const queryGetProfile = gql`
  query getProfile($id: String!, $token: String) {
    getUserLegacyById(id: $id, token: $token) {
      id
      email
      emailConfirmed
      provider
      type
      profile {
        __typename
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
          id
          settingsData {
            id
            itemName
            otherItemName
          }
        }
        listingData {
          id
          basePrice
          bookingType
        }
        location {
          id
          address1
          city
          state
        }
        photos {
          id
          name
          isCover
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
  }
`

// GraphQL
const queryGetUserDocuments = gql`
  query getUserDocuments($userId: String!) {
    getUserDocuments(userId: $userId) {
      count
      rows {
        id
        userId
        fileName
        fileType
        documentStatus
      }
    }
  }
`

// GraphQL
const mutationUpdateListing = gql`
  mutation publish($listingId: Int!, $status: Boolean!) {
    publish(listingId: $listingId, status: $status) {
      id
      isPublished
    }
  }
`

// GraphQL
const mutationDeleteListing = gql`
  mutation removeListingById($listingId: Int!) {
    removeListingById(listingId: $listingId) {
      status
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
  mutation updateProfilePicture($file: Upload, $userId: String!) {
    updateProfilePicture(file: $file, userId: $userId) {
      picture
    }
  }
`

// GraphQL
const mutationDeleteDocument = gql`
  mutation deleteDocument($userId: String, $id: String) {
    deleteDocument(userId: $userId, id: $id) {
      status
    }
  }
`

// GraphQL
const mutationUploadDocument = gql`
  mutation uploadDocument($userId: String, $file: Upload) {
    uploadDocument(userId: $userId, file: $file) {
      id
      userId
      fileName
      fileType
      documentStatus
    }
  }
`
// GraphQL
const mutationRequestResendEmail = gql`
  mutation resendEmail($email: String!) {
    resendEmail(email: $email) {
      status
    }
  }
`

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ACC_GET_DOCUMENTS:
    case Types.ACC_UPDATE_PROFILE:
    case Types.ACC_UPDATE_PROFILE_PICTURE:
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER:
    case Types.ACC_GET_ALL_LISTINGS_BY_USER:
      return {
        ...state,
        error: null,
        isLoading: true
      }
    case Types.ACC_GET_PROFILE:
    case Types.ACC_UPDATE_LISTING:
    case Types.ACC_DELETE_LISTING:
    case Types.ACC_DELETE_DOCUMENT:
    case Types.ACC_UPLOAD_DOCUMENT:
    case Types.ACC_GET_RESEND_LINK: {
      return {
        ...state
      }
    }
    case Types.ACC_GET_PROFILE_SUCCESS:
      return {
        ...state,
        get: { ...state.get, user: action.payload },
        isLoading: false
      }
    case Types.ACC_GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        get: { ...state.get, documents: action.payload },
        isLoading: false
      }
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER_SUCCESS:
      return {
        ...state,
        get: { ...state.get, bookings: action.payload },
        isLoading: false
      }
    case Types.ACC_GET_ALL_LISTINGS_BY_USER_SUCCESS:
      return {
        ...state,
        get: { ...state.get, listings: action.payload },
        isLoading: false
      }
    case Types.ACC_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        get: { user: { ...state.get.user, profile: { ...state.get.user.profile, ...action.payload } } },
        isLoading: false
      }
    case Types.ACC_UPDATE_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          listings: {
            count: state.get.listings.count,
            rows: state.get.listings.rows.map(item => {
              if (item.id !== action.payload.id) return item
              return (item = { ...item, isPublished: action.payload.isPublished })
            })
          }
        }
      }
    case Types.ACC_DELETE_LISTING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          listings: {
            count: state.get.listings.count - 1,
            rows: state.get.listings.rows.filter(item => item.id !== action.payload.listingId)
          }
        }
      }
    case Types.ACC_DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          documents: {
            count: state.get.documents.count - 1,
            rows: state.get.documents.rows.filter(item => item.id !== action.payload.id)
          }
        }
      }
    case Types.ACC_UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        get: {
          ...state.get,
          documents: {
            count: state.get.documents.count + 1,
            rows: [...state.get.documents.rows, action.payload]
          }
        }
      }
    case Types.ACC_UPDATE_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        get: { ...state.get, user: { ...state.get.user, profile: { ...state.get.user.profile, ...action.payload } } },
        isLoading: false
      }
    case Types.ACC_GET_RESEND_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case Types.ACC_GET_PROFILE_ERROR:
      return {
        ...state,
        get: { ...state.get, user: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_GET_DOCUMENTS_ERROR:
      return {
        ...state,
        get: { ...state.get, documents: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_GET_ALL_BOOKINGS_BY_USER_ERROR:
      return {
        ...state,
        get: { ...state.get, bookings: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_GET_ALL_LISTINGS_BY_USER_ERROR:
      return {
        ...state,
        get: { ...state.get, listings: null },
        error: action.payload,
        isLoading: false
      }
    case Types.ACC_DELETE_DOCUMENT_ERROR:
    case Types.ACC_UPDATE_PROFILE_ERROR:
    case Types.ACC_UPDATE_LISTING_ERROR:
    case Types.ACC_DELETE_LISTING_ERROR:
    case Types.ACC_UPDATE_PROFILE_PICTURE_ERROR:
    case Types.ACC_UPLOAD_DOCUMENT_ERROR:
    case Types.ACC_GET_RESEND_LINK_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export const onGetProfile = (id, token) => async dispatch => {
  dispatch({ type: Types.ACC_GET_PROFILE })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetProfile,
      variables: { id, token },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.ACC_GET_PROFILE_SUCCESS, payload: data.getUserLegacyById })
  } catch (error) {
    console.error(error)
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
    console.error(error)
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
    console.error(error)
    dispatch({ type: Types.ACC_GET_ALL_LISTINGS_BY_USER_ERROR, payload: error })
  }
}

export const onGetUserDocuments = userId => async dispatch => {
  dispatch({ type: Types.ACC_GET_DOCUMENTS })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetUserDocuments,
      variables: { userId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.ACC_GET_DOCUMENTS_SUCCESS, payload: data.getUserDocuments })
  } catch (error) {
    console.error(error)
    dispatch({ type: Types.ACC_GET_DOCUMENTS_ERROR, payload: error })
  }
}

export const onDeleteDocument = (userId, id) => async dispatch => {
  dispatch({ type: Types.ACC_DELETE_DOCUMENT })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationDeleteDocument,
      variables: { userId, id }
    })
    toast.success('Document deleted successfully')
    dispatch({ type: Types.ACC_DELETE_DOCUMENT_SUCCESS, payload: { id } })
  } catch (error) {
    console.error(error)
    dispatch({ type: Types.ACC_DELETE_DOCUMENT_ERROR, payload: error })
  }
}

export const onUpdateListing = (listingId, status) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_LISTING })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateListing,
      variables: { listingId, status }
    })
    toast.success('Listing updated successfully')
    dispatch({ type: Types.ACC_UPDATE_LISTING_SUCCESS, payload: data.publish })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_UPDATE_LISTING_ERROR, payload: errToMsg(error.message) })
  }
}

export const onDeleteListing = listingId => async dispatch => {
  dispatch({ type: Types.ACC_DELETE_LISTING })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationDeleteListing,
      variables: { listingId }
    })
    toast.success('Listing removed successfully')
    dispatch({ type: Types.ACC_DELETE_LISTING_SUCCESS, payload: { listingId } })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_DELETE_LISTING_ERROR, payload: errToMsg(error.message) })
  }
}

export const onUpdateProfile = (userId, input) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_PROFILE })
  try {
    await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateUserProfile,
      variables: { userId, input }
    })
    toast.success('Profile updated successfully')
    dispatch({ type: Types.ACC_UPDATE_PROFILE_SUCCESS, payload: input })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_UPDATE_PROFILE_ERROR, payload: errToMsg(error.message) })
  }
}

export const onUpdateProfilePicture = (file, userId) => async dispatch => {
  dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdateProfilePicture,
      variables: { userId, file }
    })
    toast.success('Profile updated successfully')
    dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE_SUCCESS, payload: data.updateProfilePicture })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_UPDATE_PROFILE_PICTURE_ERROR, payload: errToMsg(error.message) })
  }
}

export const onUploadDocument = (userId, file) => async dispatch => {
  dispatch({ type: Types.ACC_UPLOAD_DOCUMENT })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUploadDocument,
      variables: { userId, file }
    })
    toast.success('Document uploaded successfully')
    dispatch({ type: Types.ACC_UPLOAD_DOCUMENT_SUCCESS, payload: data.uploadDocument })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_UPLOAD_DOCUMENT_ERROR, payload: errToMsg(error.message) })
  }
}

export const onResendLink = email => async dispatch => {
  dispatch({ type: Types.ACC_GET_RESEND_LINK })
  try {
    await getClientWithAuth(dispatch).mutate({
      variables: { email },
      mutation: mutationRequestResendEmail
    })
    toast.success('Email verification sent successfully')
    dispatch({ type: Types.ACC_GET_RESEND_LINK_SUCCESS })
  } catch (error) {
    toast.error(errToMsg(error.message))
    dispatch({ type: Types.ACC_GET_RESEND_LINK_ERROR })
  }
}
