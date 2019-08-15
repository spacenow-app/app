/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClientWithAuth } from 'graphql/apolloClient'

// Actions
export const Types = {
  GET_PROVIDER_BY_LISTING_REQUEST: 'GET_PROVIDER_BY_LISTING_REQUEST',
  GET_PROVIDER_BY_LISTING_SUCCESS: 'GET_PROVIDER_BY_LISTING_SUCCESS',
  GET_PROVIDER_BY_LISTING_FAILURE: 'GET_PROVIDER_BY_LISTING_FAILURE',
}

const queryGetProviderByListingId =gql`
  query getListingById($id: Int!, $isPublic: Boolean) {
    getListingById(id: $id, isPublic: $isPublic) {
      id
      user {
        id
        provider
      }
    }
  }
`

// Initial State
const initialState = {
  isLoading: false,
  provider: {
    isLoading: false,
    data: null
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_PROVIDER_BY_LISTING_REQUEST: {
      return {
        ...state,
        provider: {
          ...state.provider,
          isLoading: true
        }
      }
    }
    case Types.GET_PROVIDER_BY_LISTING_SUCCESS: {
      return {
        ...state,
        provider: {
          ...state.provider,
          isLoading: false,
          data: action.payload
        }
      }
    }
    case Types.GET_PROVIDER_BY_LISTING_FAILURE: {
      return {
        ...state,
        provider: {
          ...state.provider,
          isLoading: false
        }
      }
    }
    default:
      return state
  }
}

// Action Creators

// Side Effects
export const onGetProviderByListingId = (id, isPublic = true) => async dispatch => {
  dispatch({ type: Types.GET_PROVIDER_BY_LISTING_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: queryGetProviderByListingId,
      variables: { id: parseInt(id, 10), isPublic },
      fetchPolicy: 'network-only'
    })
    const { user } = data.getListingById
    dispatch({ type: Types.GET_PROVIDER_BY_LISTING_SUCCESS, payload: user })
  } catch (err) {
    dispatch({ type: Types.GET_PROVIDER_BY_LISTING_FAILURE })
  }
}