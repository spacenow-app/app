/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import { monthNames } from 'contants/dates'

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
  LISTING_GET_ASSETS_REQUEST: 'LISTING_GET_ASSETS_REQUEST',
  LISTING_GET_ASSETS_SUCCESS: 'LISTING_GET_ASSETS_SUCCESS',
  LISTING_GET_ASSETS_FAILURE: 'LISTING_GET_ASSETS_FAILURE',
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
  assets: {
    array: [],
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
const queryGetAllHolidays = gql`
  query getAllHolidays {
    getAllHolidays(state: "NSW") {
      date
      description
    }
  }
`

const queryGetAllAssets = gql`
  query getAllAssets($listingId: Int!) {
    getAllAssets(listingId: $listingId) {
      id
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
    $size: Int
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
    $listingRules: [Int]
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
      listingRules: $listingRules
    ) {
      ${allListingFields}
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
    case Types.UPDATE_LISTING_START: {
      return {
        ...state,
        get: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.UPDATE_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.UPDATE_LISTING_FAILURE: {
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

export const onGetAllAssets = () => async dispatch => {
  dispatch({ type: Types.LISTING_GET_ASSETS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllAssets,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.LISTING_GET_ASSETS_SUCCESS, payload: data.getAllAssets })
  } catch (err) {
    dispatch({ type: Types.LISTING_GET_ASSETS_FAILURE, payload: errToMsg(err) })
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

const camalize = str => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
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

export const onUpdate = (listing, values) => async dispatch => {
  dispatch({ type: Types.UPDATE_LISTING_START })
  try {
    let requestFields = {
      listingId: listing.id,
      locationId: listing.location.id,
      listSettingsParentId: listing.settingsParent.id
    }
    requestFields = { ...requestFields, ...getValues(listing, values) }
    console.log('onUpdate -> Request Body:', requestFields)
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationUpdate,
      variables: requestFields
    })
    dispatch({ type: Types.UPDATE_LISTING_SUCCESS, payload: data.createOrUpdateListing })
  } catch (err) {
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
    capacity: values.capacity || _.listingData.capacity,
    size: values.size || _.listingData.size,
    meetingRooms: values.meetingRooms || _.listingData.meetingRooms,
    isFurnished: values.isFurnished !== undefined ? /true/i.test(values.isFurnished) : _.listingData.isFurnished,
    carSpace: values.carSpace || _.listingData.carSpace,
    sizeOfVehicle: values.sizeOfVehicle || _.listingData.sizeOfVehicle,
    maxEntranceHeight: values.maxEntranceHeight || _.listingData.maxEntranceHeight,
    spaceType: values.spaceType || _.listingData.spaceType,
    bookingType: values.bookingType || _.listingData.bookingType,
    listingAmenities:
      values.amenities !== undefined && values.amenities.length > 0
        ? values.amenities.map(o => o.listSettingsId)
        : undefined,
    listingAccessDays: values.listingAccessDays || undefined,
    listingExceptionDates: values.listingExceptionDates || undefined,
    listingRules:
      values.rules !== undefined && values.rules.length > 0 ? values.rules.map(o => o.listSettingsId) : undefined
  }
}
