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

const mutationSignUp = gql`
  mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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

const mutationRequestResetPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email) {
      status
    }
  }
`

const mutationResetPassword = gql`
  mutation resetPasswordUpdate($token: String!, $password: String!) {
    resetPasswordUpdate(token: $token, password: $password) {
      status
    }
  }
`

// Action Types
export const Types = {
  AUTH_SIGNIN_REQUEST: 'AUTH_SIGNIN_REQUEST',
  AUTH_SIGNIN_SUCCESS: 'AUTH_SIGNIN_SUCCESS',
  AUTH_SIGNUP_REQUEST: 'AUTH_SIGNUP_REQUEST',
  AUTH_SIGNUP_SUCCESS: 'AUTH_SIGNUP_SUCCESS',
  AUTH_RESET_PASSWORD_REQUEST: 'AUTH_RESET_PASSWORD_REQUEST',
  AUTH_RESET_PASSWORD_SUCCESS: 'AUTH_RESET_PASSWORD_SUCCESS',
  AUTH_RESET_PASSWORD_FAILURE: 'AUTH_RESET_PASSWORD_FAILURE',
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
  isLoading: true,
  isLoadingResetPassword: false,
  redirectToReferrer: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.AUTH_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case Types.AUTH_SIGNIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        redirectToReferrer: action.from
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
    case Types.AUTH_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoadingResetPassword: true
      }
    case Types.AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingResetPassword: false
      }
    case Types.AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoadingResetPassword: false,
        error: action.payload
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

export const signin = (email, password, from) => async dispatch => {
  dispatch({ type: Types.AUTH_SIGNIN_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { email, password },
      mutation: mutationLogin
    })
    const signinReturn = data.login
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SIGNIN_SUCCESS, payload: signinReturn.user, from })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const signup = (name, email, password) => async dispatch => {
  dispatch({ type: Types.AUTH_SIGNUP_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { firstName: name.first, lastName: name.last, email, password },
      mutation: mutationSignUp
    })
    const signupReturn = data.signup
    setToken(signupReturn.token, signupReturn.expiresIn)
    dispatch({ type: Types.AUTH_SIGNIN_SUCCESS, payload: signupReturn.user })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const requestResetPassword = (email, history) => async dispatch => {
  dispatch({ type: Types.AUTH_RESET_PASSWORD_REQUEST })
  try {
    await getClient().mutate({
      variables: { email },
      mutation: mutationRequestResetPassword
    })
    toast.info("If the email you specified exists in our system, we've sent a password reset link to it.")
    history.push('/auth/signin')
    dispatch({ type: Types.AUTH_RESET_PASSWORD_SUCCESS })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_RESET_PASSWORD_FAILURE,
      payload: err
    })
  }
}

export const resetPassword = (token, password, history) => async dispatch => {
  dispatch({ type: Types.AUTH_RESET_PASSWORD_REQUEST })
  try {
    await getClient().mutate({
      variables: { token, password },
      mutation: mutationResetPassword
    })
    toast.info('Your password has been reset.')
    history.push('/auth/signin')
    dispatch({ type: Types.AUTH_RESET_PASSWORD_SUCCESS })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_RESET_PASSWORD_FAILURE,
      payload: err
    })
  }
}

export const googleSignin = googleResponse => async dispatch => {
  dispatch({ type: Types.AUTH_SIGNIN_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { token: googleResponse.tokenId },
      mutation: mutationGoogleLogin
    })
    const signinReturn = data.tokenGoogleValidate
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SIGNIN_SUCCESS, payload: signinReturn.user })
  } catch (err) {
    toast.error(errToMsg(err))
    dispatch({
      type: Types.AUTH_FAILURE,
      payload: err
    })
  }
}

export const facebookSignin = facebookResponse => async dispatch => {
  dispatch({ type: Types.AUTH_SIGNIN_REQUEST })
  try {
    const { data } = await getClient().mutate({
      variables: { token: facebookResponse.accessToken },
      mutation: mutationFacebookLogin
    })
    const signinReturn = data.tokenFacebookValidate
    setToken(signinReturn.token, signinReturn.expiresIn)
    dispatch({ type: Types.AUTH_SIGNIN_SUCCESS, payload: signinReturn.user })
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
