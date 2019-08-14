import { gql } from 'apollo-boost'
import { getDate, getMonth, getYear } from 'date-fns'
import { getClientWithAuth } from 'graphql/apolloClient'
import { toast } from 'react-toastify'

import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  ON_PROCESSING_PAYMENT: 'ON_PROCESSING_PAYMENT',
  GET_PAYMENT_ACCOUNT_SUCCESS: 'GET_PAYMENT_ACCOUNT_SUCCESS',
  GET_PAYMENT_ACCOUNT_ERROR: 'GET_PAYMENT_ACCOUNT_ERROR',
  CREATE_PAYMENT_ACCOUNT_SUCCESS: 'CREATE_PAYMENT_ACCOUNT_SUCCESS',
  CREATE_PAYMENT_ACCOUNT_ERROR: 'CREATE_PAYMENT_ACCOUNT_ERROR',
  DELETE_PAYMENT_ACCOUNT_SUCCESS: 'DELETE_PAYMENT_ACCOUNT_SUCCESS',
  DELETE_PAYMENT_ACCOUNT_ERROR: 'DELETE_PAYMENT_ACCOUNT_ERROR'
}

// Initial State
const initialState = {
  isLoading: true,
  error: {
    message: null
  },
  get: {
    object: null
  }
}

// GraphQL
const getPaymentAccount = gql`
  query getPaymentAccount {
    getPaymentAccount {
      __typename
      id
      legal_entity {
        __typename
        first_name
      }
      external_accounts {
        __typename
        data {
          __typename
          id
          last4
          routing_number
        }
      }
    }
  }
`

const createPaymentAccount = gql`
  mutation createPaymentAccount(
    $type: String!
    $email: String!
    $country: String!
    $object: String!
    $external_account_country: String!
    $currency: String!
    $routing_number: String!
    $account_number: String!
    $personal_id_number: String!
    $first_name: String!
    $last_name: String!
    $legal_entity_type: String!
    $business_tax_id: String
    $business_name: String
    $city: String!
    $line1: String!
    $postal_code: Int!
    $state: String!
    $day: Int!
    $month: Int!
    $year: Int!
  ) {
    createPaymentAccount(
      type: $type
      email: $email
      country: $country
      object: $object
      external_account_country: $external_account_country
      currency: $currency
      routing_number: $routing_number
      account_number: $account_number
      personal_id_number: $personal_id_number
      first_name: $first_name
      last_name: $last_name
      legal_entity_type: $legal_entity_type
      business_tax_id: $business_tax_id
      business_name: $business_name
      city: $city
      line1: $line1
      postal_code: $postal_code
      state: $state
      day: $day
      month: $month
      year: $year
    ) {
      __typename
      id
      legal_entity {
        __typename
        first_name
      }
      external_accounts {
        __typename
        data {
          __typename
          id
          last4
          routing_number
        }
      }
    }
  }
`

const removePaymentAccount = gql`
  mutation removePaymentAccount {
    removePaymentAccount {
      id
      object
      deleted
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.ON_PROCESSING_PAYMENT: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_PAYMENT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          object: action.payload
        }
      }
    }
    case Types.GET_PAYMENT_ACCOUNT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.CREATE_PAYMENT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          object: action.payload
        }
      }
    }
    case Types.CREATE_PAYMENT_ACCOUNT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.DELETE_PAYMENT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          object: null
        }
      }
    }
    case Types.DELETE_PAYMENT_ACCOUNT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    default:
      return state
  }
}

// Action Creators

// Side Effects
export const onGetPaymentAccount = () => async dispatch => {
  dispatch({ type: Types.ON_PROCESSING_PAYMENT })
  try {
    const { data } = await getClientWithAuth(dispatch).query({ query: getPaymentAccount })
    dispatch({ type: Types.GET_PAYMENT_ACCOUNT_SUCCESS, payload: data.getPaymentAccount })
  } catch (err) {
    dispatch({ type: Types.GET_PAYMENT_ACCOUNT_ERROR, payload: errToMsg(err) })
  }
}

/**
 * @param {*} account Details from 'Payment Preference Form'.
 * @param {*} user User data from 'Store' (auth)
 */
export const onCreatePaymentAccount = (account, user) => async dispatch => {
  dispatch({ type: Types.ON_PROCESSING_PAYMENT })
  const dateOfBirthday = new Date(account.dateOfBirthday)
  try {
    const paymentDetails = {
      type: 'custom',
      email: user.email,
      country: 'AU',
      object: 'bank_account',
      external_account_country: 'AU',
      currency: 'AUD',
      routing_number: account.bsb,
      account_number: account.account,
      personal_id_number: user.id,
      first_name: account.firstName,
      last_name: account.lastName,
      legal_entity_type: account.accountType,
      business_tax_id: account.businessTaxId,
      business_name: account.businessName,
      city: account.city,
      line1: account.address,
      postal_code: Number(account.zip),
      state: account.state,
      day: getDate(dateOfBirthday),
      month: getMonth(dateOfBirthday),
      year: getYear(dateOfBirthday)
    }
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: createPaymentAccount,
      variables: paymentDetails
    })
    toast.success('Payment Preferences details saved successfully.')
    dispatch({ type: Types.CREATE_PAYMENT_ACCOUNT_SUCCESS, payload: data.createPaymentAccount })
  } catch (err) {
    toast.error(`Error on create a new bank account! ${errToMsg(err)}`)
    dispatch({ type: Types.CREATE_PAYMENT_ACCOUNT_ERROR, payload: errToMsg(err) })
  }
}

export const onDeletePaymentAccount = () => async dispatch => {
  dispatch({ type: Types.ON_PROCESSING_PAYMENT })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({ mutation: removePaymentAccount })
    toast.success('Bank details removed successfully.')
    dispatch({ type: Types.DELETE_PAYMENT_ACCOUNT_SUCCESS, payload: data.removePaymentAccount })
  } catch (err) {
    toast.error(`Error on remove your bank account! ${errToMsg(err)}`)
    dispatch({ type: Types.DELETE_PAYMENT_ACCOUNT_ERROR, payload: errToMsg(err) })
  }
}
