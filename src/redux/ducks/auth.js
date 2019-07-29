/* eslint-disable no-console */
import { gql } from 'apollo-boost'

import { getClient } from 'graphql/apolloClient'
import { getByName } from 'utils/cookies'
import config from 'contants/config'

// Action Types
export const Types = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_CLEAN_ERROR: 'AUTH_CLEAN_ERROR',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_2019_START: 'AUTH_2019_START',
  AUTH_2019_SUCCESS: 'AUTH_2019_SUCCESS',
  AUTH_2019_FAILED: 'AUTH_2019_FAILED'
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
  isAuthenticated: true,
  isLoading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTH_2019_START:
      return {
        ...state,
        isLoading: true
      }
    case Types.AUTH_2019_SUCCESS: {
      const userProfileObj = action.payload
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: userProfileObj
      }
    }
    case Types.AUTH_2019_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null
      }
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...action.payload,
          userObj: action.payload,
          roles: JSON.parse(action.payload.roles)
        },
        error: null,
        isAuthenticated: true
      }
    case Types.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      }
    case Types.AUTH_CLEAN_ERROR:
      return {
        ...state,
        error: null
      }
    case Types.AUTH_LOGOUT:
      return {
        ...initialState,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

// Action Creators
function loginError(error) {
  return {
    type: Types.AUTH_FAILURE,
    payload: error
  }
}

export const loginLoading = value => ({
  type: Types.AUTH_LOADING,
  payload: value
})

export const loginAppLoading = value => ({
  type: Types.AUTH_APP_LOADING,
  payload: value
})

export const loginSuccess = obj => ({
  type: Types.AUTH_SUCCESS,
  payload: obj
})

export const userLogout = error => ({
  type: Types.AUTH_LOGOUT,
  payload: error
})

const authentication2019Start = () => ({ type: Types.AUTH_2019_START })

const authentication2019Success = userProfileObj => ({
  type: Types.AUTH_2019_SUCCESS,
  payload: userProfileObj.user
})

const authentication2019Failed = () => ({ type: Types.AUTH_2019_FAILED })

export const onTokenValidation = () => async dispatch => {
  dispatch(authentication2019Start())
  try {
    const idToken = getByName(config.token_name)
    if (idToken) {
      const { data } = await getClient().mutate({
        variables: { token: idToken },
        mutation: gql`
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
      })
      if (data && data.tokenValidate) {
        if (data.tokenValidate.status && data.tokenValidate.status === 'OK') {
          return dispatch(authentication2019Success(data.tokenValidate))
        }
      }
    }
    return dispatch(authentication2019Failed())
  } catch (err) {
    console.error(err)
    return dispatch(authentication2019Failed())
  }
}

export const onIsTokenExists = () => dispatch => {
  const idToken = getByName(config.token_name)
  if (!idToken || idToken.length <= 0) dispatch(authentication2019Failed())
}

export const login = (email, password) => async dispatch => {
  dispatch(loginLoading(true))
  try {
    // const response = await loginApi(email, password)
    // window.localStorage.xcllusiveJWT = response.accessToken
    // setAuthorizationHeader(response.accessToken)
    // dispatch(loginSuccess(response.user))
  } catch (err) {
    dispatch(loginError(err.message))
  }
}

export const loginWithToken = () => async dispatch => {
  try {
    // const response = await loginWithTokenApi()
    // dispatch(loginSuccess(response.user))
  } catch (err) {
    window.localStorage.removeItem('xcllusiveJWT')
    // setAuthorizationHeader()
    dispatch(loginError(err))
  }
}

export const logout = (user, error = null) => async dispatch => {
  try {
    // await logoutApi(user)
    // window.localStorage.removeItem('xcllusiveJWT')
    // setAuthorizationHeader()
    // dispatch(userLogout(error))
  } catch (err) {
    dispatch(loginError(err))
  }
}
