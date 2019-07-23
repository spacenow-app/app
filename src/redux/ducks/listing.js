import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  LISTING_GET_SPACE_REQUEST: 'LISTING_GET_SPACE_REQUEST',
  LISTING_GET_SPACE_SUCCESS: 'LISTING_GET_SPACE_SUCCESS',
  LISTING_GET_SPACE_FAILURE: 'LISTING_GET_SPACE_FAILURE',
  LISTING_GET_SPACE_RULES_REQUEST: 'LISTING_GET_SPACE_RULES_REQUEST',
  LISTING_GET_SPACE_RULES_SUCCESS: 'LISTING_GET_SPACE_RULES_SUCCESS',
  LISTING_GET_SPACE_RULES_FAILURE: 'LISTING_GET_SPACE_RULES_FAILURE',
  LISTING_GET_SPACE_ACCESSTYPES_REQUEST: 'LISTING_GET_SPACE_ACCESSTYPES_REQUEST',
  LISTING_GET_SPACE_ACCESSTYPES_SUCCESS: 'LISTING_GET_SPACE_ACCESSTYPES_SUCCESS',
  LISTING_GET_SPACE_ACCESSTYPES_FAILURE: 'LISTING_GET_SPACE_ACCESSTYPES_FAILURE',
  LISTING_GET_SPACE_AMENITIES_REQUEST: 'LISTING_GET_SPACE_AMENITIES_REQUEST',
  LISTING_GET_SPACE_AMENITIES_SUCCESS: 'LISTING_GET_SPACE_AMENITIES_SUCCESS',
  LISTING_GET_SPACE_AMENITIES_FAILURE: 'LISTING_GET_SPACE_AMENITIES_FAILURE',
  CREATE_LISTING_START: 'CREATE_LISTING_START',
  CREATE_LISTING_SUCCESS: 'CREATE_LISTING_SUCCESS',
  CREATE_LISTING_ERROR: 'CREATE_LISTING_ERROR'
}

// Initial State
const initialState = {
  isLoading: false,
  get: {
    object: {},
    isLoading: true,
    error: null
  },
  rules: {
    array: [],
    isLoading: true,
    error: null
  },
  accessTypes: {
    array: [],
    isLoading: true,
    error: null
  },
  amenities: {
    array: [],
    isLoading: true,
    error: null
  }
}

// GraphQL
const queryGetListingById = gql`
  query getListingById($id: Int!) {
    getListingById(id: $id) {
      id
      userId
      title
      coverPhotoId
      bookingPeriod
      isPublished
      isReady
      quantity
      status
      updatedAt
      createdAt
      count
      listingData {
        listingId
        accessType
        bookingNoticeTime
        minTerm
        maxTerm
        description
        basePrice
        currency
        isAbsorvedFee
        capacity
        size
        meetingRooms
        isFurnished
        carSpace
        sizeOfVehicle
        maxEntranceHeight
        bookingType
        spaceType
        listingAmenities
        listingExceptionDates
        listingRules
        status
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
      amenities {
        id
        listingId
        listSettingsId
        amount
        quantity
        currency
        settings
        type
        createdAt
        updatedAt
        settingsData {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
      }
      rules {
        id
        listingId
        listSettingsId
        createdAt
        updatedAt
        settingsData {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
      }
      settingsParent {
        id
        category {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
        }
        subcategory {
          id
          typeId
          itemName
          otherItemName
          description
          maximum
          minimum
          startValue
          endValue
          step
          isEnable
          photo
          photoType
          isSpecification
          createdAt
          updatedAt
          specData
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
    }
  }
`

const mutationCreate = gql`
  mutation createOrUpdateListing(
    $locationId: Int!
    $listSettingsParentId: Int!
  )
  {
    createOrUpdateListing(
      locationId: $locationId
      listSettingsParentId: $listSettingsParentId
    ) {
      status
    }
  }
`

const queryGetAllRules = gql`
  query getAllRules {
    getAllRules {
      id
      itemName
    }
  }
`

const queryGetAllAccessTypes = gql`
  query getAllAccessTypes {
    getAllAccessTypes {
      id
      itemName
    }
  }
`
const queryGetAllAmenities = gql`
  query getAllAmenities($subCategoryId: Int!) {
    getAllAmenitiesBySubCategoryId(subCategoryId: $subCategoryId) {
      id
      itemName
    }
  }
`
// const mutationUpdate = gql`
//   mutation createOrUpdateListing(
//     $userId: String!
//     $locationId: Int!
//     $listSettingsParentId: Int!
//     $listingId: Int!
//     $title: String
//     $accessType: String
//     $bookingNoticeTime: String
//     $minTerm: Float
//     $maxTerm: Float
//     $description: String
//     $basePrice: Float
//     $currency: String
//     $isAbsorvedFee: Boolean
//     $capacity: Int
//     $size: Int
//     $meetingRooms: Int
//     $isFurnished: Boolean
//     $carSpace: Int
//     $sizeOfVehicle: String
//     $maxEntranceHeight: String
//     $spaceType: String
//     $bookingType: String
//     $listingAmenities: [Int]
//     $listingAccessDays: ListingAccessDaysInput
//     $listingExceptionDates: [String]
//     $listingRules: [Int]
//   ) {
//     createOrUpdateListing(
//       userId: $userId
//       locationId: $locationId
//       listSettingsParentId: $listSettingsParentId
//       listingId: $listingId
//       title: $title
//       accessType: $accessType
//       bookingNoticeTime: $bookingNoticeTime
//       minTerm: $minTerm
//       maxTerm: $maxTerm
//       description: $description
//       basePrice: $basePrice
//       currency: $currency
//       isAbsorvedFee: $isAbsorvedFee
//       capacity: $capacity
//       size: $size
//       meetingRooms: $meetingRooms
//       isFurnished: $isFurnished
//       carSpace: $carSpace
//       sizeOfVehicle: $sizeOfVehicle
//       maxEntranceHeight: $maxEntranceHeight
//       spaceType: $spaceType
//       bookingType: $bookingType
//       listingAmenities: $listingAmenities
//       listingAccessDays: $listingAccessDays
//       listingExceptionDates: $listingExceptionDates
//       listingRules: $listingRules
//     ) {
//       status
//     }
//   }
// `

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LISTING_GET_SPACE_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true
        }
      }
    }
    case Types.LISTING_GET_SPACE_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.LISTING_GET_SPACE_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_RULES_REQUEST: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_RULES_SUCCESS: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: false,
          array: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_RULES_FAILURE: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_ACCESSTYPES_REQUEST: {
      return {
        ...state,
        accessTypes: {
          ...state.accessTypes,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_ACCESSTYPES_SUCCESS: {
      return {
        ...state,
        accessTypes: {
          ...state.accessTypes,
          isLoading: false,
          array: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_ACCESSTYPES_FAILURE: {
      return {
        ...state,
        accessTypes: {
          ...state.accessTypes,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_AMENITIES_REQUEST: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_AMENITIES_SUCCESS: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: false,
          array: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_AMENITIES_FAILURE: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
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
export const onGetListingById = id => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_REQUEST })
  try {
    const { data } = await getClientWithAuth().query({
      query: queryGetListingById,
      variables: { id: parseInt(id, 2) }
    })
    dispatch({
      type: Types.LISTING_GET_SPACE_SUCCESS,
      payload: data.getListingById
    })
  } catch (err) {
    dispatch({
      type: Types.LISTING_GET_SPACE_FAILURE,
      payload: errToMsg(err)
    })
  }
}

export const onGetAllRules = () => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_RULES_REQUEST })
  try {
    const { data } = await getClientWithAuth().query({
      query: queryGetAllRules
    })
    const sorted = data.getAllRules.map(o => o).sort((a, b) => a.itemName.localeCompare(b.itemName))
    dispatch({ type: Types.LISTING_GET_SPACE_RULES_SUCCESS, payload: sorted })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_RULES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllAccessTypes = () => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_ACCESSTYPES_REQUEST })
  try {
    const { data } = await getClientWithAuth().query({
      query: queryGetAllAccessTypes
    })
    dispatch({ type: Types.LISTING_GET_SPACE_ACCESSTYPES_SUCCESS, payload: data.getAllAccessTypes })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_ACCESSTYPES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllAmenities = subCategoryId => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_REQUEST })
  try {
    const { data } = await getClientWithAuth().query({
      query: queryGetAllAmenities,
      variables: {
        subCategoryId
      }
    })
    const sorted = data.getAllAmenitiesBySubCategoryId.map(o => o).sort((a, b) => a.itemName.localeCompare(b.itemName))
    dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_SUCCESS, payload: sorted })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_FAILURE, payload: errToMsg(err) })


// Side Effects
export const onCreate = (locationId, listSettingsParentId) => async dispatch => {
  dispatch({ type: Types.CREATE_LISTING_START })
  try {
    const { data } = await getClientWithAuth().mutate({
      mutation: mutationCreate,
      variables: {
        locationId,
        listSettingsParentId
      }
    })
    dispatch({ type: Types.CREATE_LISTING_SUCCESS, payload: listing })
  } catch (err) {
    dispatch({ type: Types.CREATE_LISTING_ERROR, payload: errToMsg(err) })
  }
}
