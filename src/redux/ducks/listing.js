/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import { monthNames } from 'variables'
import { camalize, isPositiveInt } from 'utils/strings'
import { toast } from 'react-toastify'
import _ from 'lodash'

// Actions
export const Types = {
  LISTING_GET_SPACE_REQUEST: 'LISTING_GET_SPACE_REQUEST',
  LISTING_GET_SPACE_DENIED: 'LISTING_GET_SPACE_DENIED',
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
  LISTING_GET_PHOTOS_REQUEST: 'LISTING_GET_PHOTOS_REQUEST',
  LISTING_GET_PHOTOS_SUCCESS: 'LISTING_GET_PHOTOS_SUCCESS',
  LISTING_GET_PHOTOS_FAILURE: 'LISTING_GET_PHOTOS_FAILURE',
  LISTING_GET_SPACE_HOLIDAYS_REQUEST: 'LISTING_GET_SPACE_HOLIDAYS_REQUEST',
  LISTING_GET_SPACE_HOLIDAYS_SUCCESS: 'LISTING_GET_SPACE_HOLIDAYS_SUCCESS',
  LISTING_GET_SPACE_HOLIDAYS_FAILURE: 'LISTING_GET_SPACE_HOLIDAYS_FAILURE',
  LISTING_GET_SPACE_AVAILABILITIES_REQUEST: 'LISTING_GET_SPACE_AVAILABILITIES_REQUEST',
  LISTING_GET_SPACE_AVAILABILITIES_SUCCESS: 'LISTING_GET_SPACE_AVAILABILITIES_SUCCESS',
  LISTING_GET_SPACE_AVAILABILITIES_FAILURE: 'LISTING_GET_SPACE_AVAILABILITIES_FAILURE',
  CREATE_LISTING_START: 'CREATE_LISTING_START',
  CREATE_LISTING_SUCCESS: 'CREATE_LISTING_SUCCESS',
  CREATE_LISTING_FAILURE: 'CREATE_LISTING_FAILURE',
  UPDATE_LISTING_START: 'UPDATE_LISTING_START',
  UPDATE_LISTING_SUCCESS: 'UPDATE_LISTING_SUCCESS',
  UPDATE_LISTING_FAILURE: 'UPDATE_LISTING_FAILURE',
  PUBLISH_LISTING_START: 'PUBLISH_LISTING_START',
  PUBLISH_LISTING_SUCCESS: 'PUBLISH_LISTING_SUCCESS',
  PUBLISH_LISTING_FAILURE: 'PUBLISH_LISTING_FAILURE',
  LISTING_CLEAN_SPACE_AVAILABILITIES_REQUEST: 'LISTING_CLEAN_SPACE_AVAILABILITIES_REQUEST',
  LISTING_CLEAN_SPACE_AVAILABILITIES_SUCCESS: 'LISTING_CLEAN_SPACE_AVAILABILITIES_SUCCESS',
  LISTING_CLEAN_SPACE_AVAILABILITIES_FAILURE: 'LISTING_CLEAN_SPACE_AVAILABILITIES_FAILURE',
  LISTING_CLAIM_REQUEST: 'LISTING_CLAIM_REQUEST',
  LISTING_CLAIM_SUCCESS: 'LISTING_CLAIM_SUCCESS',
  LISTING_CLAIM_FAILURE: 'LISTING_CLAIM_FAILURE',
  LISTING_GET_VIDEO_REQUEST: 'LISTING_GET_VIDEO_REQUEST',
  LISTING_GET_VIDEO_SUCCESS: 'LISTING_GET_VIDEO_SUCCESS',
  LISTING_GET_VIDEO_FAILURE: 'LISTING_GET_VIDEO_FAILURE',
  SAVE_LISTING_BY_CLICK_START: 'SAVE_LISTING_BY_CLICK_START',
  SAVE_LISTING_BY_CLICK_SUCCESS: 'SAVE_LISTING_BY_CLICK_SUCCESS',
  SAVE_LISTING_BY_CLICK_FAILURE: 'SAVE_LISTING_BY_CLICK_FAILURE',
  CREATE_SAVED_LISTING_BY_USER_START: 'CREATE_SAVED_LISTING_BY_USER_START',
  CREATE_SAVED_LISTING_BY_USER_SUCCESS: 'CREATE_SAVED_LISTING_BY_USER_SUCCESS',
  CREATE_SAVED_LISTING_BY_USER_FAILURE: 'CREATE_SAVED_LISTING_BY_USER_FAILURE',
  REMOVE_SAVED_LISTING_BY_USER_START: 'REMOVE_SAVED_LISTING_BY_USER_START',
  REMOVE_SAVED_LISTING_BY_USER_SUCCESS: 'REMOVE_SAVED_LISTING_BY_USER_SUCCESS',
  REMOVE_SAVED_LISTING_BY_USER_FAILURE: 'REMOVE_SAVED_LISTING_BY_USER_FAILURE',
  GET_SAVED_LISTING_BY_USER_START: 'GET_SAVED_LISTING_BY_USER_START',
  GET_SAVED_LISTING_BY_USER_SUCCESS: 'GET_SAVED_LISTING_BY_USER_SUCCESS',
  GET_SAVED_LISTING_BY_USER_FAILURE: 'GET_SAVED_LISTING_BY_USER_FAILURE',
  CHECK_SAVED_LISTING_BY_USER_START: 'CHECK_SAVED_LISTING_BY_USER_START',
  CHECK_SAVED_LISTING_BY_USER_SUCCESS: 'CHECK_SAVED_LISTING_BY_USER_SUCCESS',
  CHECK_SAVED_LISTING_BY_USER_FAILURE: 'CHECK_SAVED_LISTING_BY_USER_FAILURE'
}

// Initial State
const initialState = {
  isLoading: false,
  get: {
    object: null,
    isLoading: true,
    isNotOwner: false,
    error: null
  },
  create: {
    object: null,
    isLoading: false,
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
  },
  availabilities: {
    array: [],
    isLoading: true,
    error: null
  },
  holidays: {
    array: [],
    isLoading: true,
    error: null
  },
  photos: {
    array: new Array(6),
    isLoading: true,
    error: null
  },
  video: {
    object: {},
    isLoading: true,
    error: null
  },
  publishing: {
    isLoading: false,
    isPublished: false,
    error: null
  },
  cleanAvailabilities: {
    isLoading: false,
    isCleaned: false,
    error: null
  },
  claim: {
    isLoading: true,
    isClaimed: false,
    error: null
  },
  listingClicks: {
    isLoading: false,
    clicks: 0,
    error: null
  },
  savedListings: {
    isLoading: false,
    saved: false,
    listings: [],
    create: {},
    remove: null,
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
    link
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
    placeId
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
      monthly
      weekly
      daily
      hourly
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
    userBanStatus
    profile {
      displayName
      picture
      firstName
      lastName
    }
  }
`

// GraphQL
const queryGetListingById = gql`
  query getListingById($id: Int!, $isPublic: Boolean) {
    getListingById(id: $id, isPublic: $isPublic) {
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
      otherItemName
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
const queryGetAllHolidays = gql`
  query getAllHolidays {
    getAllHolidays(state: "NSW") {
      date
      description
    }
  }
`

const queryGetPhotosByListingId = gql`
  query getPhotosByListingId($listingId: Int!) {
    getPhotosByListingId(listingId: $listingId) {
      id
      listingId
      name
      isCover
      bucket
      region
      key
      type
    }
  }
`

const queryGetVideoByListingId = gql`
  query getVideoByListingId($listingId: Int!) {
    getVideoByListingId(listingId: $listingId) {
      id
      listingId
      name
      isCover
      bucket
      region
      key
      type
    }
  }
`

const queryGetAvailabilities = gql`
  query getAvailabilitiesByListingId($listingId: Int!) {
    getAvailabilitiesByListingId(listingId: $listingId) {
      bookingDates
      exceptionDates
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

const mutationUpdate = gql`
  mutation createOrUpdateListing(
    $locationId: Int!
    $listSettingsParentId: Int!
    $listingId: Int!
    $title: String
    $accessType: String
    $bookingNoticeTime: String
    $minTerm: Float
    $maxTerm: Float
    $description: String
    $basePrice: Float
    $currency: String
    $isAbsorvedFee: Boolean
    $capacity: Int
    $size: Float
    $meetingRooms: Int
    $isFurnished: Boolean
    $carSpace: Int
    $sizeOfVehicle: String
    $maxEntranceHeight: String
    $spaceType: String
    $bookingType: String
    $bookingPeriod: String
    $listingAmenities: [Int]
    $listingAccessDays: ListingAccessDaysInput
    $listingExceptionDates: [String]
    $listingRules: [Int],
    $link: String
  ) {
    createOrUpdateListing(
      locationId: $locationId
      listSettingsParentId: $listSettingsParentId
      listingId: $listingId
      title: $title
      accessType: $accessType
      bookingNoticeTime: $bookingNoticeTime
      minTerm: $minTerm
      maxTerm: $maxTerm
      description: $description
      basePrice: $basePrice
      currency: $currency
      isAbsorvedFee: $isAbsorvedFee
      capacity: $capacity
      size: $size
      meetingRooms: $meetingRooms
      isFurnished: $isFurnished
      carSpace: $carSpace
      sizeOfVehicle: $sizeOfVehicle
      maxEntranceHeight: $maxEntranceHeight
      spaceType: $spaceType
      bookingType: $bookingType
      bookingPeriod: $bookingPeriod
      listingAmenities: $listingAmenities
      listingAccessDays: $listingAccessDays
      listingExceptionDates: $listingExceptionDates
      listingRules: $listingRules,
      link: $link
    ) {
      ${allListingFields}
    }
  }
`

const mutationPublish = gql`
  mutation publish($listingId: Int!, $status: Boolean!) {
    publish(listingId: $listingId, status: $status) {
      id
      isReady
      isPublished
    }
  }
`

const mutationCleanListingAvailabilities = gql`
  mutation cleanListingAvailabilities($listingId: Int!) {
    cleanListingAvailabilities(listingId: $listingId) {
      status
    }
  }
`

const mutationClaimListing = gql`
  mutation claimListing($listingId: Int!) {
    claimListing(listingId: $listingId) {
      status
    }
  }
`

const mutationSaveClicksByListing = gql`
  mutation saveClicksByListing($listingId: Int!) {
    saveClicksByListing(listingId: $listingId) {
      totalClicks
    }
  }
`

const mutationCreateSavedListingByUser = gql`
  mutation createSavedListing($listingId: Int!, $userId: String!) {
    createSavedListing(listingId: $listingId, userId: $userId) {
      userId
      listingId
    }
  }
`

const mutationRemoveSavedListingByUser = gql`
  mutation removeSavedListingByUser($listingId: Int!, $userId: String!) {
    removeSavedListingByUser(listingId: $listingId, userId: $userId) {
      userId
      listingId
    }
  }
`

const queryGetSavedListingsByUser = gql`
  query getSavedListingsByUser($userId: String!) {
    getSavedListingsByUser(userId: $userId) {
      userId
      listingId
      listing {
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

const mutationCheckSavedListingByUser = gql`
  mutation checkSavedListingByUser($listingId: Int!, $userId: String!) {
    checkSavedListingByUser(listingId: $listingId, userId: $userId) {
      userId
      listingId
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LISTING_GET_SPACE_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isNotOwner: false,
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
    case Types.LISTING_GET_SPACE_DENIED: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false,
          isNotOwner: true
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
    case Types.LISTING_GET_SPACE_AVAILABILITIES_REQUEST: {
      return {
        ...state,
        availabilities: {
          ...state.availabilities,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_AVAILABILITIES_SUCCESS: {
      return {
        ...state,
        availabilities: {
          ...state.availabilities,
          isLoading: false,
          array: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_AVAILABILITIES_FAILURE: {
      return {
        ...state,
        availabilities: {
          ...state.availabilities,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_PHOTOS_REQUEST: {
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_PHOTOS_SUCCESS: {
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: false,
          array: [...Array(6 - action.payload.length).concat(action.payload)].reverse()
        }
      }
    }
    case Types.LISTING_GET_PHOTOS_FAILURE: {
      return {
        ...state,
        photos: {
          ...state.photos,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_HOLIDAYS_REQUEST: {
      return {
        ...state,
        holidays: {
          ...state.holidays,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_SPACE_HOLIDAYS_SUCCESS: {
      return {
        ...state,
        holidays: {
          ...state.holidays,
          isLoading: false,
          array: action.payload
        }
      }
    }
    case Types.LISTING_GET_SPACE_HOLIDAYS_FAILURE: {
      return {
        ...state,
        holidays: {
          ...state.holidays,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.CREATE_LISTING_START: {
      return {
        ...state,
        create: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CREATE_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          object: action.payload
        },
        create: {
          isLoading: false
        }
      }
    }
    case Types.CREATE_LISTING_FAILURE: {
      return {
        ...state,
        create: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.UPDATE_LISTING_START: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.UPDATE_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.UPDATE_LISTING_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.PUBLISH_LISTING_START: {
      return {
        ...state,
        publishing: {
          isLoading: true,
          isPublished: false,
          error: null
        }
      }
    }
    case Types.PUBLISH_LISTING_SUCCESS: {
      return {
        ...state,
        publishing: {
          isLoading: false,
          isPublished: true
        }
      }
    }
    case Types.PUBLISH_LISTING_FAILURE: {
      return {
        ...state,
        publishing: {
          isLoading: false,
          isPublished: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_CLEAN_SPACE_AVAILABILITIES_REQUEST: {
      return {
        ...state,
        cleanAvailabilities: {
          isLoading: true,
          isCleaned: false,
          error: null
        }
      }
    }
    case Types.LISTING_CLEAN_SPACE_AVAILABILITIES_SUCCESS: {
      return {
        ...state,
        cleanAvailabilities: {
          isLoading: false,
          isCleaned: true
        }
      }
    }
    case Types.LISTING_CLEAN_SPACE_AVAILABILITIES_FAILURE: {
      return {
        ...state,
        cleanAvailabilities: {
          isLoading: false,
          isCleaned: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_CLAIM_REQUEST: {
      return {
        ...state,
        claim: {
          isLoading: true,
          isClaimed: false,
          error: null
        }
      }
    }
    case Types.LISTING_CLAIM_SUCCESS: {
      return {
        ...state,
        claim: {
          isLoading: false,
          isClaimed: true
        }
      }
    }
    case Types.LISTING_CLAIM_FAILURE: {
      return {
        ...state,
        claim: {
          isLoading: false,
          isClaimed: false,
          error: action.payload
        }
      }
    }
    case Types.LISTING_GET_VIDEO_REQUEST: {
      return {
        ...state,
        video: {
          ...state.video,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.LISTING_GET_VIDEO_SUCCESS: {
      return {
        ...state,
        video: {
          ...state.video,
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.LISTING_GET_VIDEO_FAILURE: {
      return {
        ...state,
        video: {
          ...state.video,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.SAVE_LISTING_BY_CLICK_START: {
      return {
        ...state,
        listingClicks: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.SAVE_LISTING_BY_CLICK_SUCCESS: {
      return {
        ...state,
        listingClicks: {
          isLoading: false,
          clicks: action.payload
        }
      }
    }
    case Types.SAVE_LISTING_BY_CLICK_FAILURE: {
      return {
        ...state,
        listingClicks: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.CREATE_SAVED_LISTING_BY_USER_START: {
      return {
        ...state,
        savedListings: {
          ...state.savedListings,
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CREATE_SAVED_LISTING_BY_USER_SUCCESS: {
      return {
        ...state,
        savedListings: {
          ...state.savedListings,
          isLoading: false,
          listings: _.concat(state.savedListings.listings, action.payload)
        }
      }
    }
    case Types.CREATE_SAVED_LISTING_BY_USER_FAILURE: {
      return {
        ...state,
        savedListings: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.REMOVE_SAVED_LISTING_BY_USER_START: {
      return {
        ...state,
        savedListings: {
          ...state.savedListings,
          isLoading: false,
          create: action.payload
        }
      }
    }
    case Types.REMOVE_SAVED_LISTING_BY_USER_SUCCESS: {
      return {
        ...state,
        savedListings: {
          ...state.savedListings,
          isLoading: false,
          listings: state.savedListings.listings.filter(res => res.listingId !== action.payload.listingId)
        }
      }
    }
    case Types.REMOVE_SAVED_LISTING_BY_USER_FAILURE: {
      return {
        ...state,
        savedListings: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_SAVED_LISTING_BY_USER_START: {
      return {
        ...state,
        savedListings: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.GET_SAVED_LISTING_BY_USER_SUCCESS: {
      return {
        ...state,
        savedListings: {
          isLoading: false,
          listings: action.payload
        }
      }
    }
    case Types.GET_SAVED_LISTING_BY_USER_FAILURE: {
      return {
        ...state,
        savedListings: {
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.CHECK_SAVED_LISTING_BY_USER_START: {
      return {
        ...state,
        savedListings: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CHECK_SAVED_LISTING_BY_USER_SUCCESS: {
      return {
        ...state,
        savedListings: {
          isLoading: false,
          saved: action.payload
        }
      }
    }
    case Types.CHECK_SAVED_LISTING_BY_USER_FAILURE: {
      return {
        ...state,
        savedListings: {
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
export const onGetListingById = (id, authID, isPublic = false) => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetListingById,
      variables: { id: parseInt(id, 10), isPublic: true },
      fetchPolicy: 'network-only'
    })
    if (authID) {
      const { userId } = data.getListingById
      if (authID !== userId) {
        dispatch({ type: Types.LISTING_GET_SPACE_DENIED, payload: data.getListingById })
        return
      }
    }
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

export const onGetPhotosByListingId = listingId => async dispatch => {
  dispatch({ type: Types.LISTING_GET_PHOTOS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetPhotosByListingId,
      variables: { listingId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.LISTING_GET_PHOTOS_SUCCESS, payload: data.getPhotosByListingId })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_PHOTOS_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetVideoByListingId = listingId => async dispatch => {
  dispatch({ type: Types.LISTING_GET_VIDEO_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetVideoByListingId,
      variables: { listingId },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.LISTING_GET_VIDEO_SUCCESS, payload: data.getVideoByListingId })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_PHOTOS_FAILURE, payload: errToMsg(err) })
  }
}

const mapTo = (originalArray, listingData) => {
  const specifications = {}
  for (let i = 0, size = originalArray.length; i < size; i += 1) {
    const { itemName, specData } = originalArray[i]
    if (specData && specData.length > 0) {
      const specDataObj = JSON.parse(specData)
      specifications[specDataObj.field] = {
        ...specDataObj,
        value: listingData[specDataObj.field] || specDataObj.defaultValue
      }
    } else {
      const fieldTarget = camalize(itemName)
      specifications[fieldTarget] = {
        label: itemName,
        field: fieldTarget,
        value: listingData[fieldTarget]
      }
    }
  }
  return specifications
}

export const onGetAvailabilitiesByListingId = listingId => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_AVAILABILITIES_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAvailabilities,
      variables: { listingId },
      fetchPolicy: 'network-only'
    })
    const { bookingDates, exceptionDates } = data.getAvailabilitiesByListingId
    const mergeAvailabilities = bookingDates.concat(exceptionDates)
    dispatch({ type: Types.LISTING_GET_SPACE_AVAILABILITIES_SUCCESS, payload: mergeAvailabilities })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_AVAILABILITIES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAllHolidays = () => async dispatch => {
  dispatch({ type: Types.LISTING_GET_SPACE_HOLIDAYS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllHolidays,
      fetchPolicy: 'network-only'
    })
    const holidaysReduced = data.getAllHolidays.map(i => {
      const date = new Date(i.date)
      const formatted = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
      const shortDescription =
        i.description.length >= 2 && `${i.description.split(' ')[0]} ${i.description.split(' ')[1]}`
      return { ...i, originalDate: date, dateFormatted: formatted, shortDescription }
    })
    dispatch({ type: Types.LISTING_GET_SPACE_HOLIDAYS_SUCCESS, payload: holidaysReduced })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_SPACE_HOLIDAYS_FAILURE, payload: errToMsg(err) })
  }
}

export const onCreate = (locationId, listSettingsParentId, history) => async dispatch => {
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
    history.push(`/listing/space/${data.createOrUpdateListing.id}/specification`)
  } catch (err) {
    dispatch({ type: Types.CREATE_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onUpdate = (listing, values) => async dispatch => {
  dispatch({ type: Types.UPDATE_LISTING_START })
  try {
    let requestFields = {
      listingId: listing.id,
      locationId: listing.location.id,
      listSettingsParentId: listing.settingsParent.id
    }
    requestFields = { ...requestFields, ...getValues(listing, values) }
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdate,
      variables: requestFields
    })
    dispatch({ type: Types.UPDATE_LISTING_SUCCESS, payload: data.createOrUpdateListing })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({ type: Types.UPDATE_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

/**
 * Return a proper object request to update Listing and Listing Data.
 *
 * @param {*} _ Original Listing already saved on store.
 * @param {*} values New values to update.
 */
const getValues = (_, values) => {
  return {
    title: values.title || _.title,
    bookingPeriod: values.bookingPeriod || _.bookingPeriod,
    accessType: values.accessType || _.listingData.accessType,
    bookingNoticeTime: values.bookingNoticeTime || _.listingData.bookingNoticeTime,
    minTerm: values.minTerm || _.listingData.minTerm,
    maxTerm: values.maxTerm || _.listingData.maxTerm,
    description: values.description || _.listingData.description,
    basePrice: values.basePrice || _.listingData.basePrice,
    currency: values.currency || _.listingData.currency,
    isAbsorvedFee: values.isAbsorvedFee !== undefined ? values.isAbsorvedFee : _.listingData.isAbsorvedFee,
    capacity: isPositiveInt(values.capacity) ? values.capacity : _.listingData.capacity,
    size: isPositiveInt(values.size) ? values.size : _.listingData.size,
    meetingRooms: isPositiveInt(values.meetingRooms) ? values.meetingRooms : _.listingData.meetingRooms,
    carSpace: isPositiveInt(values.carSpace) ? values.carSpace : _.listingData.carSpace,
    isFurnished: values.isFurnished !== undefined ? /true/i.test(values.isFurnished) : _.listingData.isFurnished,
    sizeOfVehicle: values.sizeOfVehicle || _.listingData.sizeOfVehicle,
    maxEntranceHeight: values.maxEntranceHeight || _.listingData.maxEntranceHeight,
    spaceType: values.spaceType || _.listingData.spaceType,
    bookingType: values.bookingType || _.listingData.bookingType,
    listingAmenities:
      values.amenities !== undefined && values.amenities.length > 0
        ? values.amenities.map(o => o.listSettingsId)
        : undefined,
    listingAccessDays: values.listingAccessDays,
    listingExceptionDates: values.listingExceptionDates || undefined,
    listingRules:
      values.rules !== undefined && values.rules.length > 0 ? values.rules.map(o => o.listSettingsId) : undefined,
    link: values.link || _.link
  }
}

export const onPublish = listingId => async dispatch => {
  dispatch({ type: Types.PUBLISH_LISTING_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPublish,
      variables: { listingId, status: true }
    })
    dispatch({ type: Types.PUBLISH_LISTING_SUCCESS, payload: data.mutationPublish })
  } catch (err) {
    dispatch({ type: Types.PUBLISH_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onCleanAvailabilitiesByListingId = id => async dispatch => {
  dispatch({ type: Types.LISTING_CLEAN_SPACE_AVAILABILITIES_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCleanListingAvailabilities,
      variables: { listingId: parseInt(id, 10) }
    })
    dispatch({ type: Types.LISTING_CLEAN_SPACE_AVAILABILITIES_SUCCESS, payload: data.cleanListingAvailabilities })
  } catch (err) {
    dispatch({ type: Types.LISTING_CLEAN_SPACE_AVAILABILITIES_FAILURE, payload: errToMsg(err) })
  }
}

export const onClaimListing = (listingId, listingTitle) => async dispatch => {
  dispatch({ type: Types.LISTING_CLAIM_REQUEST })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: mutationClaimListing,
      variables: { listingId: parseInt(listingId, 10) }
    })
    dispatch({ type: Types.LISTING_CLAIM_SUCCESS, payload: data.claimListing })
    toast.success('Listing Claimed!!')
    window.location.href = `https://spacenow.com/claim-your-space?listingId=${parseInt(
      listingId,
      10
    )}&listingTitle=${listingTitle}`
  } catch (err) {
    dispatch({ type: Types.LISTING_CLAIM_FAILURE, payload: errToMsg(err) })
  }
}

export const onSaveClicksByListing = (listingId, link) => async dispatch => {
  dispatch({ type: Types.SAVE_LISTING_BY_CLICK_START })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: mutationSaveClicksByListing,
      variables: { listingId: parseInt(listingId, 10) }
    })
    dispatch({ type: Types.SAVE_LISTING_BY_CLICK_SUCCESS, payload: data.saveClicksByListing })
    window.location.href = `${link}`
  } catch (err) {
    dispatch({ type: Types.SAVE_LISTING_BY_CLICK_FAILURE, payload: errToMsg(err) })
  }
}

export const onCreateSavedListingByUser = (listingId, userId) => async dispatch => {
  dispatch({ type: Types.CREATE_SAVED_LISTING_BY_USER_START })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: mutationCreateSavedListingByUser,
      variables: { listingId: parseInt(listingId, 10), userId }
    })
    dispatch({ type: Types.CREATE_SAVED_LISTING_BY_USER_SUCCESS, payload: data.createSavedListing })
  } catch (err) {
    dispatch({ type: Types.CREATE_SAVED_LISTING_BY_USER_FAILURE, payload: errToMsg(err) })
  }
}

export const onRemoveSavedListingByUser = (listingId, userId) => async dispatch => {
  dispatch({ type: Types.REMOVE_SAVED_LISTING_BY_USER_START })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: mutationRemoveSavedListingByUser,
      variables: { listingId: parseInt(listingId, 10), userId }
    })
    dispatch({ type: Types.REMOVE_SAVED_LISTING_BY_USER_SUCCESS, payload: data.removeSavedListingByUser })
  } catch (err) {
    dispatch({ type: Types.REMOVE_SAVED_LISTING_BY_USER_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetSavedListingByUser = userId => async dispatch => {
  dispatch({ type: Types.GET_SAVED_LISTING_BY_USER_START })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: queryGetSavedListingsByUser,
      variables: { userId }
    })
    dispatch({ type: Types.GET_SAVED_LISTING_BY_USER_SUCCESS, payload: data.getSavedListingsByUser })
  } catch (err) {
    dispatch({ type: Types.GET_SAVED_LISTING_BY_USER_FAILURE, payload: errToMsg(err) })
  }
}

export const onCheckSavedListingByUser = (listingId, userId) => async dispatch => {
  dispatch({ type: Types.CHECK_SAVED_LISTING_BY_USER_START })
  try {
    const { data } = await getClient(dispatch).mutate({
      mutation: mutationCheckSavedListingByUser,
      variables: { listingId: parseInt(listingId, 10), userId }
    })
    dispatch({ type: Types.CHECK_SAVED_LISTING_BY_USER_SUCCESS, payload: data.checkSavedListingByUser })
  } catch (err) {
    dispatch({ type: Types.CHECK_SAVED_LISTING_BY_USER_FAILURE, payload: errToMsg(err) })
  }
}
