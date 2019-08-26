/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { toast } from 'react-toastify'
import { getClient } from 'graphql/apolloClient'
import { getByName, setToken, deleteToken } from 'utils/cookies'
import { config } from 'variables'

const mutationTokenValidate = gql`
  mutation tokenValidate($token: String!) {
    tokenValidate(token: $token) {
      status
      user {
        id
        email
        profile {
          profileId
          firstName
          lastName
          picture
        }
        verification {
          id
          isEmailConfirmed
        }
      }
    }
  }
`

const mutatioLogin = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      expiresIn
    }
  }
`
// Action Types
export const Types = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_CLEAN_ERROR: 'AUTH_CLEAN_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_TOKEN_VERIFY_SUCCESS: 'AUTH_TOKEN_VERIFY_SUCCESS',
  AUTH_TOKEN_VERIFY_FAILURE: 'AUTH_TOKEN_VERIFY_FAILURE'
}

// Reducer
const initialState = {
  error: null,
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
  isAuthenticated: false,
  isLoading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case Types.AUTH_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    }
    case Types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: initialState.user,
        error: action.payload
      }
    case Types.AUTH_TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case Types.AUTH_TOKEN_VERIFY_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: initialState.user
      }
    case Types.AUTH_CLEAN_ERROR:
      return {
        ...state,
        error: null
      }
    case Types.AUTH_LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}

// Action Creators
export const onTokenValidation = () => async dispatch => {
  const idToken = getByName(config.token_name)
  if (!idToken) {
    return
  }
  try {
    const { data } = await getClient().mutate({
      variables: { token: idToken },
      mutation: mutationTokenValidate
    })
    if (data && data.tokenValidate) {
      if (data.tokenValidate.status && data.tokenValidate.status === 'OK') {
        dispatch({
          type: Types.AUTH_TOKEN_VERIFY_SUCCESS,
          payload: data.tokenValidate.user
        })
        return
      }
    }
    dispatch({ type: Types.AUTH_TOKEN_VERIFY_FAILURE })
  } catch (err) {
    dispatch({ type: Types.AUTH_TOKEN_VERIFY_FAILURE })
  }
}

export const onIsTokenExists = () => dispatch => {
  const idToken = getByName(config.token_name)
  if (!idToken || idToken.length <= 0) dispatch({ type: Types.AUTH_TOKEN_VERIFY_FAILURE, payload: 'No token found' })
}

export const signin = (email, password) => async dispatch => {
  dispatch({ type: Types.AUTH_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { email, password },
      mutation: mutatioLogin
    })
    setToken(data.login.token)
    dispatch({ type: Types.AUTH_SUCCESS, payload: {} })
  } catch (err) {
    toast.error(`Error: ${err}`)
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const logout = () => async dispatch => {
  deleteToken()
  dispatch({
    type: Types.AUTH_LOGOUT
  })
}
