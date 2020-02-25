/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth, getClient } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
// import { monthNames } from 'variables'
// import { camalize, isPositiveInt } from 'utils/strings'
// import { toast } from 'react-toastify'

export const Types = {
  GET_LISTING_STEPS_REQUEST: 'GET_LISTING_STEPS_REQUEST',
  GET_LISTING_STEPS_SUCCESS: 'GET_LISTING_STEPS_SUCCESS',
  GET_LISTING_STEPS_FAILURE: 'GET_LISTING_STEPS_FAILURE',
  GET_LISTING_REQUEST: 'GET_LISTING_REQUEST',
  GET_LISTING_SUCCESS: 'GET_LISTING_SUCCESS',
  GET_LISTING_FAILURE: 'GET_LISTING_FAILURE',
  POST_LISTING_REQUEST: 'POST_LISTING_REQUEST',
  POST_LISTING_SUCCESS: 'POST_LISTING_SUCCESS',
  POST_LISTING_FAILURE: 'POST_LISTING_FAILURE',
  PUT_LISTING_REQUEST: 'PUT_LISTING_REQUEST',
  PUT_LISTING_SUCCESS: 'PUT_LISTING_SUCCESS',
  PUT_LISTING_FAILURE: 'PUT_LISTING_FAILURE',
  GET_RULES_REQUEST: 'GET_RULES_REQUEST',
  GET_RULES_SUCCESS: 'GET_RULES_SUCCESS',
  GET_RULES_FAILURE: 'GET_RULES_FAILURE',
  GET_AMENITIES_REQUEST: 'GET_AMENITIES_REQUEST',
  GET_AMENITIES_SUCCESS: 'GET_AMENITIES_SUCCESS',
  GET_AMENITIES_FAILURE: 'GET_AMENITIES_FAILURE',
  GET_FEATURES_REQUEST: 'GET_FEATURES_REQUEST',
  GET_FEATURES_SUCCESS: 'GET_FEATURES_SUCCESS',
  GET_FEATURES_FAILURE: 'GET_FEATURES_FAILURE',
  GET_ROOT_CATEGORIES_REQUEST: 'GET_ROOT_CATEGORIES_REQUEST',
  GET_ROOT_CATEGORIES_SUCCESS: 'GET_ROOT_CATEGORIES_SUCCESS',
  GET_ROOT_CATEGORIES_FAILURE: 'GET_ROOT_CATEGORIES_FAILURE',
  GET_TAGS_REQUEST: 'GET_TAGS_REQUEST',
  GET_TAGS_SUCCESS: 'GET_TAGS_SUCCESS',
  GET_TAGS_FAILURE: 'GET_TAGS_FAILURE',
  GET_CANCELLATIONS_REQUEST: 'GET_CANCELLATIONS_REQUEST',
  GET_CANCELLATIONS_SUCCESS: 'GET_CANCELLATIONS_SUCCESS',
  GET_CANCELLATIONS_FAILURE: 'GET_CANCELLATIONS_FAILURE',
  POST_LOCATION_REQUEST: 'POST_LOCATION_REQUEST',
  POST_LOCATION_SUCCESS: 'POST_LOCATION_SUCCESS',
  POST_LOCATION_FAILURE: 'POST_LOCATION_FAILURE',
  POST_MEDIA_REQUEST: 'POST_MEDIA_REQUEST',
  POST_MEDIA_SUCCESS: 'POST_MEDIA_SUCCESS',
  POST_MEDIA_FAILURE: 'POST_MEDIA_FAILURE',
  POST_MEDIA_CLEAN: 'POST_MEDIA_CLEAN',
  POST_LOCATION_CLEAN: 'POST_LOCATION_CLEAN'
}

const initialState = {
  isLoading: false,
  steps: {
    object: null,
    isLoading: false,
    error: null
  },
  get: {
    object: null,
    isLoading: true,
    isNotOwner: false,
    error: null
  },
  rules: {
    object: [],
    isLoading: false,
    error: null
  },
  amenities: {
    object: [],
    isLoading: false,
    error: null
  },
  features: {
    object: [],
    isLoading: false,
    error: null
  },
  categories: {
    object: [],
    isLoading: false,
    error: null
  },
  tags: {
    object: [],
    isLoading: false,
    error: null
  },
  cancellations: {
    object: [],
    isLoading: false,
    error: null
  },
  location: {
    object: null,
    isLoading: false,
    error: null
  },
  media: {
    object: null,
    isLoading: false,
    error: null
  }
}

const stepsFields = `
  completed
  id
  listingId
  step1
  step2
  step3
  step4
  step5
  step6
  step7
  step8
`
const accessHoursFields = `
  id
  listingAccessDaysId
  weekday
  openHour
  closeHour
  allday
  peaktime
`
const accessDaysFields = `
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
  accessHours { ${accessHoursFields} }
`
const mediaFields = `
  name
  type
  isCover
  category
`
const uploadMediaFields = `
  name
  type
  isCover
  category
`
const ruleFields = `
  id
  name
`
const amenityFields = `
  id
  name
`
const featureFields = `
  id
  name
`
const categoryFields = `
  id
  name
  slug
  parentId
  order
  isActive
`
const tagFields = `
  id
  name
  slug
  categoryId
  order
  isActive
`
const cancellationFields = `
  id
  policyName
  policyContent
`
const dataFields = `
  id
  listingId
  accessType
  bookingNoticeTime
  minTerm
  maxTerm
  description
  basePrice
  maxPrice
  peakPrice
  currency
  checkInStart
  checkInEnd
  checkOut
  isAbsorvedFee
  capacity
  cancellationPolicy
  size
  meetingRooms
  isFurnished
  carSpace
  sizeOfVehicle
  maxEntranceHeight
  bookingType
  spaceType
  status
  link
  listingType
  listingStyle
  direction
  alcoholLicence
  wifiSpeed
  wifiNetwork
  wifiPassword
  capacityCocktail
  capacityBanquet
  capacityTheatre
  capacityClassroom
  capacityBoardroom
`
const listingFields = `
  id
  userId
  locationId
  listSettingsParentId
  bookingPeriod
  title
  bookingType
  isPublished
  isReady
  status
  listingData { ${dataFields} }
  photos { ${mediaFields} } 
  accessDays { ${accessDaysFields} }
  amenities { id }
  rules { id }
  features { id }
  tags { id }
`
const locationFields = `
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
`

const queryGetV2Steps = gql`
  query getV2Steps($id: Int!) {
    getV2Steps(id: $id) {
      ${stepsFields}
    }
  }
`
const queryGetV2Listing = gql`
  query getV2Listing($id: Int!) {
    getV2Listing(id: $id) {
      ${listingFields}
    }
  }
`
const mutationPostV2Listing = gql`
  mutation postV2Listing {
    postV2Listing {
      ${listingFields}
    }
  }
`
const mutationPutV2Listing = gql`
  mutation putV2Listing($input: V2InputListing) {
    putV2Listing(input: $input) {
      ${listingFields}
    }
  }
`
const queryGetV2Rules = gql`
  query getV2Rules {
    getV2Rules {
      ${ruleFields}
    }
  }
`
const queryGetV2Amenities = gql`
  query getV2Amenities {
    getV2Amenities {
      ${amenityFields}
    }
  }
`
const queryGetV2Features = gql`
  query getV2Features {
    getV2Features {
      ${featureFields}
    }
  }
`
const queryGetV2RootCategories = gql`
  query getV2RootCategories {
    getV2RootCategories {
      ${categoryFields}
    }
  }
`
const queryGetV2CategoryTags = gql`
  query getV2CategoryTags($id: String!) {
    getV2CategoryTags(id: $id) {
      ${tagFields}
    }
  }
`
const queryGetV2Cancellations = gql`
  query getV2Cancellations {
    getV2Cancellations {
      ${cancellationFields}
    }
  }
`
const mutationPostV2Location = gql`
  mutation postV2Location($input: V2InputLocation) {
    postV2Location(input: $input) {
      ${locationFields}
    }
  }
`
const mutationPostV2Media = gql`
  mutation postV2Media($input: V2InputUpload) {
    postV2Media(input: $input) {
      ${uploadMediaFields}
    }
  }
`

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_LISTING_STEPS_REQUEST: {
      return {
        ...state,
        steps: {
          ...state.steps,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.GET_LISTING_STEPS_SUCCESS: {
      return {
        ...state,
        steps: {
          ...state.steps,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_LISTING_STEPS_FAILURE: {
      return {
        ...state,
        steps: {
          ...state.steps,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_LISTING_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.GET_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_LISTING_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.POST_LISTING_REQUEST:
    case Types.PUT_LISTING_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          isNotOwner: false,
          isLoading: true
        }
      }
    }
    case Types.POST_LISTING_SUCCESS:
    case Types.PUT_LISTING_SUCCESS: {
      return {
        ...state,
        get: {
          ...state.get,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.POST_LISTING_FAILURE:
    case Types.PUT_LISTING_FAILURE: {
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_RULES_REQUEST: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: true
        }
      }
    }
    case Types.GET_RULES_SUCCESS: {
      return {
        ...state,
        rules: {
          ...state.rules,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_RULES_FAILURE: {
      return {
        ...state,
        rules: {
          ...state.rules,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_AMENITIES_REQUEST: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: true
        }
      }
    }
    case Types.GET_AMENITIES_SUCCESS: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_AMENITIES_FAILURE: {
      return {
        ...state,
        amenities: {
          ...state.amenities,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_FEATURES_REQUEST: {
      return {
        ...state,
        features: {
          ...state.features,
          isLoading: true
        }
      }
    }
    case Types.GET_FEATURES_SUCCESS: {
      return {
        ...state,
        features: {
          ...state.features,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_FEATURES_FAILURE: {
      return {
        ...state,
        features: {
          ...state.features,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_ROOT_CATEGORIES_REQUEST: {
      return {
        ...state,
        categories: {
          ...state.categories,
          isLoading: true
        }
      }
    }
    case Types.GET_ROOT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: {
          ...state.categories,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_ROOT_CATEGORIES_FAILURE: {
      return {
        ...state,
        categories: {
          ...state.categories,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_TAGS_REQUEST: {
      return {
        ...state,
        tags: {
          ...state.tags,
          isLoading: true
        }
      }
    }
    case Types.GET_TAGS_SUCCESS: {
      return {
        ...state,
        tags: {
          ...state.tags,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_TAGS_FAILURE: {
      return {
        ...state,
        tags: {
          ...state.tags,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.GET_CANCELLATIONS_REQUEST: {
      return {
        ...state,
        cancellations: {
          ...state.cancellations,
          isLoading: true
        }
      }
    }
    case Types.GET_CANCELLATIONS_SUCCESS: {
      return {
        ...state,
        cancellations: {
          ...state.cancellations,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.GET_CANCELLATIONS_FAILURE: {
      return {
        ...state,
        cancellations: {
          ...state.cancellations,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.POST_LOCATION_REQUEST: {
      return {
        ...state,
        location: {
          ...state.location,
          isLoading: true
        }
      }
    }
    case Types.POST_LOCATION_SUCCESS: {
      return {
        ...state,
        location: {
          ...state.location,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.POST_LOCATION_FAILURE: {
      return {
        ...state,
        location: {
          ...state.location,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.POST_MEDIA_REQUEST: {
      return {
        ...state,
        media: {
          ...state.media,
          isLoading: true
        }
      }
    }
    case Types.POST_MEDIA_SUCCESS: {
      return {
        ...state,
        media: {
          ...state.media,
          object: action.payload,
          isLoading: false
        }
      }
    }
    case Types.POST_MEDIA_FAILURE: {
      return {
        ...state,
        media: {
          ...state.media,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case Types.POST_MEDIA_CLEAN: {
      return {
        ...state,
        media: {
          object: null,
          isLoading: false,
          error: null
        }
      }
    }
    case Types.POST_LOCATION_CLEAN: {
      return {
        ...state,
        location: {
          object: null,
          isLoading: false,
          error: null
        }
      }
    }
    default:
      return state
  }
}

export const onGetListingSteps = id => async dispatch => {
  dispatch({ type: Types.GET_LISTING_STEPS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetV2Steps,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_LISTING_STEPS_SUCCESS, payload: data.getV2Steps })
  } catch (err) {
    dispatch({ type: Types.GET_LISTING_STEPS_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetListing = id => async dispatch => {
  dispatch({ type: Types.GET_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetV2Listing,
      variables: { id: parseInt(id, 10) },
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_LISTING_SUCCESS, payload: data.getV2Listing })
  } catch (err) {
    dispatch({ type: Types.GET_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onPostListing = () => async dispatch => {
  dispatch({ type: Types.POST_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPostV2Listing
    })
    dispatch({ type: Types.POST_LISTING_SUCCESS, payload: data.postV2Listing })
  } catch (err) {
    dispatch({ type: Types.POST_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onPutListing = input => async dispatch => {
  console.log("INPUT ===>>> ", input)
  dispatch({ type: Types.PUT_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPutV2Listing,
      variables: { input }
    })
    dispatch({ type: Types.PUT_LISTING_SUCCESS, payload: data.putV2Listing })
  } catch (err) {
    dispatch({ type: Types.PUT_LISTING_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetRules = () => async dispatch => {
  dispatch({ type: Types.GET_RULES_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2Rules,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_RULES_SUCCESS, payload: data.getV2Rules })
  } catch (err) {
    dispatch({ type: Types.GET_RULES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetAmenities = () => async dispatch => {
  dispatch({ type: Types.GET_AMENITIES_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2Amenities,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_AMENITIES_SUCCESS, payload: data.getV2Amenities })
  } catch (err) {
    dispatch({ type: Types.GET_AMENITIES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetFeatures = () => async dispatch => {
  dispatch({ type: Types.GET_FEATURES_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2Features,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_FEATURES_SUCCESS, payload: data.getV2Features })
  } catch (err) {
    dispatch({ type: Types.GET_FEATURES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetRootCategories = () => async dispatch => {
  dispatch({ type: Types.GET_ROOT_CATEGORIES_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2RootCategories,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_ROOT_CATEGORIES_SUCCESS, payload: data.getV2RootCategories })
  } catch (err) {
    dispatch({ type: Types.GET_ROOT_CATEGORIES_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetCategoryTags = id => async dispatch => {
  dispatch({ type: Types.GET_TAGS_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2CategoryTags,
      fetchPolicy: 'network-only',
      variables: { id }
    })
    dispatch({ type: Types.GET_TAGS_SUCCESS, payload: data.getV2CategoryTags })
  } catch (err) {
    dispatch({ type: Types.GET_TAGS_FAILURE, payload: errToMsg(err) })
  }
}

export const onGetCancellations = () => async dispatch => {
  dispatch({ type: Types.GET_CANCELLATIONS_REQUEST })
  try {
    const { data } = await getClient(dispatch).query({
      query: queryGetV2Cancellations,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_CANCELLATIONS_SUCCESS, payload: data.getV2Cancellations })
  } catch (err) {
    dispatch({ type: Types.GET_CANCELLATIONS_FAILURE, payload: errToMsg(err) })
  }
}

export const onPostLocation = input => async dispatch => {
  dispatch({ type: Types.POST_LOCATION_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPostV2Location,
      variables: { input }
    })
    dispatch({ type: Types.POST_LOCATION_SUCCESS, payload: data.postV2Location })
  } catch (err) {
    dispatch({ type: Types.POST_LOCATION_FAILURE, payload: errToMsg(err) })
  }
}

export const onPostMedia = input => async dispatch => {
  dispatch({ type: Types.POST_MEDIA_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationPostV2Media,
      variables: { input }
    })
    dispatch({ type: Types.POST_MEDIA_SUCCESS, payload: data.postV2Media })
  } catch (err) {
    dispatch({ type: Types.POST_MEDIA_FAILURE, payload: errToMsg(err) })
  }
}

export const onCleanMedia = () => async dispatch => {
  dispatch({ type: Types.POST_MEDIA_CLEAN })
}

export const onCleanLocation = () => async dispatch => {
  dispatch({ type: Types.POST_LOCATION_CLEAN })
}
