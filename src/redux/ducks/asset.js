import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  GET_ALL_ASSETS_START: 'GET_ALL_ASSETS_START',
  GET_ALL_ASSETS_SUCCESS: 'GET_ALL_ASSETS_SUCCESS',
  GET_ALL_ASSETS_ERROR: 'GET_ALL_ASSETS_ERROR',
  CREATE_ASSET_START: 'CREATE_ASSET_START',
  CREATE_ASSET_SUCCESS: 'CREATE_ASSET_SUCCESS',
  CREATE_ASSET_FAILURE: 'CREATE_ASSET_FAILURE',
}

// Initial State
const initialState = {
  isLoading: false,
  error: {
    message: null
  },
  get: {
    assets: []
  }
}

// GraphQL
const queryGetAllAssets = gql`
  query getAssets {
    getAssets {
      assetId
      listingId
    }
  }
`

const mutationCreateAsset = gql`
  mutation createAsset($file: Upload, $folder: !String) {
    createAsset(file: $file, folder: $folder) {
      
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_ALL_ASSETS_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_ALL_ASSETS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          assets: action.payload
        }
      }
    }
    case Types.GET_ALL_ASSETS_ERROR: {
      return {
        ...state,
        isLoading: false,
        get: {
          assets: []
        },
        error: {
          message: action.payload
        }
      }
    }
    case Types.CREATE_ASSET_START: {
      return {
        ...state,
        get: {
          isLoading: true,
          error: null
        }
      }
    }
    case Types.CREATE_ASSET_SUCCESS: {
      return {
        ...state,
        get: {
          isLoading: false,
          object: action.payload
        }
      }
    }
    case Types.CREATE_ASSET_FAILURE: {
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
const getAllAssetsStart = () => {
  return { type: Types.GET_ALL_ASSETS_START }
}

const getAllAssetsSuccess = response => {
  return {
    type: Types.GET_ALL_ASSETS_SUCCESS,
    payload: response
  }
}

const getAllAssetsFailed = error => {
  return {
    type: Types.GET_ALL_ASSETS_ERROR,
    payload: error
  }
}

// Side Effects
export const onGetAllAssets = () => async dispatch => {
  dispatch(getAllAssetsStart())
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetAllAssets,
      fetchPolicy: 'network-only'
    })
    dispatch(getAllAssetsSuccess(data.getAssetsLegacy))
  } catch (err) {
    dispatch(getAllAssetsFailed(errToMsg(err)))
  }
}

export const onCreateAsset = (locationId, listSettingsParentId) => async dispatch => {
  dispatch({ type: Types.CREATE_ASSET_START })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationCreate,
      variables: {
        locationId,
        listSettingsParentId
      }
    })
    dispatch({ type: Types.CREATE_ASSET_SUCCESS, payload: data.createOrUpdateListing })
  } catch (err) {
    dispatch({ type: Types.CREATE_ASSET_FAILURE, payload: errToMsg(err) })
  }
}
