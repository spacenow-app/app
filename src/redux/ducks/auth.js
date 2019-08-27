/* eslint-disable no-console */
import { gql } from 'apollo-boost'
import { toast } from 'react-toastify'
import { getClient } from 'graphql/apolloClient'
import { getByName, setToken, deleteToken } from 'utils/cookies'
import errToMsg from 'utils/errToMsg'
import { config } from 'variables'

const loginBaseFields = `
  status
  token
  expiresIn
  user {
    id
    email
    emailConfirmed
    profile {
      profileId
      firstName
      lastName
      picture
    }
    verification {
      id
      isEmailConfirmed
      isFacebookConnected
      isGoogleConnected
    }
  }
`

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

const mutationLogin = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      ${loginBaseFields}
    }
  }
`

const mutationGoogleLogin = gql`
  mutation tokenGoogleValidate($token: String!) {
    tokenGoogleValidate(token: $token) {
      ${loginBaseFields}
    }
  }
`

const mutationFacebookLogin = gql`
  mutation tokenFacebookValidate($token: String!) {
    tokenFacebookValidate(token: $token) {
      ${loginBaseFields}
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
  isLoading: true
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
        ...initialState,
        isLoading: false
      }
    default:
      return state
  }
}

// Action Creators
export const onTokenValidation = () => async dispatch => {
  const idToken = getByName(config.token_name)
  if (!idToken) {
    dispatch({ type: Types.AUTH_TOKEN_VERIFY_FAILURE })
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
    deleteToken()
    dispatch({ type: Types.AUTH_TOKEN_VERIFY_FAILURE })
  } catch (err) {
    deleteToken()
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
      mutation: mutationLogin
    })
    const signinReturn = data.login
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SUCCESS, payload: signinReturn.user })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const googleSignin = googleResponse => async dispatch => {
  dispatch({ type: Types.AUTH_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { token: googleResponse.tokenId },
      mutation: mutationGoogleLogin
    })
    const signinReturn = data.tokenGoogleValidate
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SUCCESS, payload: signinReturn.user })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const facebookSignin = facebookResponse => async dispatch => {
  dispatch({ type: Types.AUTH_REQUEST })
  try {
    console.log(facebookResponse)
    const { data } = await getClient().mutate({
      variables: { token: facebookResponse.accessToken },
      mutation: mutationFacebookLogin
    })
    const signinReturn = data.tokenFacebookValidate
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SUCCESS, payload: signinReturn.user })
  } catch (err) {
    toast.error(errToMsg(err))
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
