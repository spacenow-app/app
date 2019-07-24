/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import { mapTo, parseOutput } from 'utils/specificationsUtils'

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
  LISTING_GET_SPACE_SPECIFICATIONS_REQUEST: 'LISTING_GET_SPACE_SPECIFICATIONS_REQUEST',
  LISTING_GET_SPACE_SPECIFICATIONS_SUCCESS: 'LISTING_GET_SPACE_SPECIFICATIONS_SUCCESS',
  LISTING_GET_SPACE_SPECIFICATIONS_FAILURE: 'LISTING_GET_SPACE_SPECIFICATIONS_FAILURE',
  SPECIFICATION_CHANGE_ATT: 'SPECIFICATION_CHANGE_ATT',
  CREATE_LISTING_START: 'CREATE_LISTING_START',
  CREATE_LISTING_SUCCESS: 'CREATE_LISTING_SUCCESS',
  CREATE_LISTING_FAILURE: 'CREATE_LISTING_FAILURE',
  UPDATE_LISTING_START: 'UPDATE_LISTING_START',
  UPDATE_LISTING_SUCCESS: 'UPDATE_LISTING_SUCCESS',
  UPDATE_LISTING_FAILURE: 'UPDATE_LISTING_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  get: {
    object: null,
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
  },
  specifications: {
    object: null,
    isLoading: true,
    error: null
  }
}

const allListingFields = `
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
        bookingPeriod {
          id
          listSettingsParentId
          hourly
          daily
          weekly
          monthly
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
    bookingPeriod {
      id
      listSettingsParentId
      hourly
      daily
      weekly
      monthly
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
`

// GraphQL
const queryGetListingById = gql`
  query getListingById($id: Int!) {
    getListingById(id: $id) {
      ${allListingFields}
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

const queryGetAllSpecifications = gql`
  query getSpecifications($listSettingsParentId: Int!) {
    getAllSpecificationsByParentId(listSettingsParentId: $listSettingsParentId) {
      id
      itemName
      specData
    }
  }
`

const mutationCreate = gql`
  mutation createOrUpdateListing($locationId: Int!, $listSettingsParentId: Int!) {
    createOrUpdateListing(locationId: $locationId, listSettingsParentId: $listSettingsParentId) {
      ${allListingFields}
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
//       ${allListingFields}
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
    case Types.LISTING_GET_SPACE_SPECIFICATIONS_REQUEST: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_SPECIFICATIONS_SUCCESS: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_SPECIFICATIONS_FAILURE: {
      return {
        ...state,
        specifications: {
          ...state.specifications,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.SPECIFICATION_CHANGE_ATT: {
      if (action.payload.value) {
        return {
          ...state,
          specifications: {
            ...state.specifications,
            object: parseOutput(state.specifications.object, action.payload)
          }
        }
      }
      return { ...state }
    }
    case Types.CREATE_LISTING_START: {
      return {
        ...state,
        get: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CREATE_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.CREATE_LISTING_FAILURE: {
      return {
        ...state,
        get: {
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
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetListingById,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.LISTING_GET_SPACE_SUCCESS, payload: data.getListingById })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllRules = () => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_RULES_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllRules,
      fetchPolicy: 'network-only'
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
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllAccessTypes,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.LISTING_GET_SPACE_ACCESSTYPES_SUCCESS, payload: data.getAllAccessTypes })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_ACCESSTYPES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllAmenities = subCategoryId => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllAmenities,
      variables: { subCategoryId },
      fetchPolicy: 'network-only'
    })
    const sorted = data.getAllAmenitiesBySubCategoryId.map(o => o).sort((a, b) => a.itemName.localeCompare(b.itemName))
    dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_SUCCESS, payload: sorted })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_AMENITIES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllSpecifications = (listSettingsParentId, listingData) => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_SPECIFICATIONS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllSpecifications,
      variables: { listSettingsParentId },
      fetchPolicy: 'network-only'
    })
    const specificationsToView = mapTo(data.getAllSpecificationsByParentId, listingData)
    dispatch({ type: Types.LISTING_GET_SPACE_SPECIFICATIONS_SUCCESS, payload: specificationsToView })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_SPECIFICATIONS_FAILURE, payload: errToMsg(err) })
  }
}

export const onUpdateSpecification = (name, value) => dispatch => {
  dispatch({
    type: Types.SPECIFICATION_CHANGE_ATT,
    payload: { name, value }
  })
}

// Side Effects
export const onCreate = (locationId, listSettingsParentId) => async dispatch => {
  dispatch({ type: Types.CREATE_LISTING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreate,
      variables: {
        locationId,
        listSettingsParentId
      }
    })
    dispatch({ type: Types.CREATE_LISTING_SUCCESS, payload: data.createOrUpdateListing })
  } catch (err) {
    dispatch({ type: Types.CREATE_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onUpdate = listingObj => async dispatch => {
  dispatch({ type: Types.UPDATE_LISTING_START })
  try {
    console.log('onUpdate -> listingObj ->', listingObj)
  } catch (err) {
    dispatch({ type: Types.UPDATE_LISTING_FAILURE, payload: errToMsg(err) })
  }
}
