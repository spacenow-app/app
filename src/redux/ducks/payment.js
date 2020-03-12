import { gql } from 'apollo-boost'
import update from 'react-addons-update'
import { getDate, getMonth, getYear, format } from 'date-fns'
import { getClientWithAuth } from 'graphql/apolloClient'
import { toast } from 'react-toastify'
import { sendMail } from 'redux/ducks/mail'

import errToMsg from 'utils/errToMsg'

// Actions
export const Types = {
  ON_PROCESSING_PAYMENT: 'ON_PROCESSING_PAYMENT',
  GET_PAYMENT_ACCOUNT_SUCCESS: 'GET_PAYMENT_ACCOUNT_SUCCESS',
  GET_PAYMENT_ACCOUNT_ERROR: 'GET_PAYMENT_ACCOUNT_ERROR',
  CREATE_PAYMENT_ACCOUNT_SUCCESS: 'CREATE_PAYMENT_ACCOUNT_SUCCESS',
  CREATE_PAYMENT_ACCOUNT_ERROR: 'CREATE_PAYMENT_ACCOUNT_ERROR',
  DELETE_PAYMENT_ACCOUNT_SUCCESS: 'DELETE_PAYMENT_ACCOUNT_SUCCESS',
  DELETE_PAYMENT_ACCOUNT_ERROR: 'DELETE_PAYMENT_ACCOUNT_ERROR',
  GET_CREDIT_CARDS_REQUEST: 'GET_CREDIT_CARDS_REQUEST',
  GET_CREDIT_CARDS_SUCCESS: 'GET_CREDIT_CARDS_SUCCESS',
  GET_CREDIT_CARDS_FAILURE: 'GET_CREDIT_CARDS_FAILURE',
  CREATE_CREDIT_CARD_REQUEST: 'CREATE_CREDIT_CARD_REQUEST',
  CREATE_CREDIT_CARD_SUCCESS: 'CREATE_CREDIT_CARD_SUCCESS',
  CREATE_CREDIT_CARD_FAILURE: 'CREATE_CREDIT_CARD_FAILURE',
  DELETE_CREDIT_CARD_REQUEST: 'DELETE_CREDIT_CARD_REQUEST',
  DELETE_CREDIT_CARD_SUCCESS: 'DELETE_CREDIT_CARD_SUCCESS',
  DELETE_CREDIT_CARD_FAILURE: 'DELETE_CREDIT_CARD_FAILURE',
  DOING_PAYMENT_REQUEST: 'DOING_PAYMENT_REQUEST',
  DOING_PAYMENT_SUCCESS: 'DOING_PAYMENT_SUCCESS',
  DOING_PAYMENT_FAILURE: 'DOING_PAYMENT_FAILURE',
  UPDATE_DEFAULT_CARD_REQUEST: 'UPDATE_DEFAULT_CARD_REQUEST',
  UPDATE_DEFAULT_CARD_SUCCESS: 'UPDATE_DEFAULT_CARD_SUCCESS',
  UPDATE_DEFAULT_CARD_ERROR: 'UPDATE_DEFAULT_CARD_ERROR'
}

// Initial State
const initialState = {
  isLoading: true,
  error: {
    message: null
  },
  get: {
    object: null
  },
  cards: {
    array: [],
    id: null,
    isLoading: false,
    isCreating: false
  },
  defaultCard: null,
  pay: {
    isLoading: false,
    bookingState: null
  },
  newCard: {}
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

const queryGetCards = gql`
  query getCards {
    getPaymentCards {
      id
      default_source
      sources {
        data {
          id
          name
          last4
          exp_month
          exp_year
          brand
          country
        }
      }
    }
  }
`

const mutationCreateCard = gql`
  mutation createCard($cardName: String!, $cardNumber: String!, $expMonth: Int!, $expYear: Int!, $cvc: String!) {
    createPaymentCard(cardName: $cardName, cardNumber: $cardNumber, expMonth: $expMonth, expYear: $expYear, cvc: $cvc) {
      id
      sources {
        data {
          id
          name
          last4
          exp_month
          exp_year
          brand
          country
        }
      }
      lastCardCreated {
        id
        name
      }
    }
  }
`

const mutationDeleteCard = gql`
  mutation deleteCard($cardId: String!) {
    deletePaymentCard(cardId: $cardId) {
      id
      sources {
        data {
          id
          name
          last4
          exp_month
          exp_year
          brand
          country
        }
      }
    }
  }
`

const mutationDoPayment = gql`
  mutation doPayment($cardId: String!, $bookingId: String!) {
    createPayment(cardId: $cardId, bookingId: $bookingId) {
      status
      bookingId
      bookingState
    }
  }
`

const mutationDefaultCard = gql`
  mutation updateDefaultCard($cardId: String!) {
    updateDefaultCard(cardId: $cardId) {
      id
      default_source
      sources {
        data {
          id
          name
          last4
          exp_month
          exp_year
          brand
          country
        }
      }
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
    case Types.GET_CREDIT_CARDS_REQUEST: {
      return {
        ...state,
        cards: {
          ...state.cards,
          isLoading: true
        }
      }
    }
    case Types.GET_CREDIT_CARDS_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          array: action.payload.sources.data,
          id: action.payload.id,
          isLoading: false
        },
        defaultCard: action.payload.default_source
      }
    }
    case Types.CREATE_CREDIT_CARD_REQUEST: {
      return {
        ...state,
        cards: {
          ...state.cards,
          isCreating: true
        }
      }
    }
    case Types.CREATE_CREDIT_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          isCreating: false,
          array: action.payload.sources.data
        },
        newCard: action.payload.lastCardCreated
      }
    }
    case Types.CREATE_CREDIT_CARD_FAILURE: {
      return {
        ...state,
        cards: {
          ...state.cards,
          isCreating: false
        }
      }
    }
    case Types.DELETE_CREDIT_CARD_REQUEST: {
      const key = state.cards.array.findIndex(o => o.id === action.payload)
      return update(state, {
        cards: {
          array: {
            [key]: {
              isLoading: { $set: true }
            }
          }
        }
      })
    }
    case Types.DELETE_CREDIT_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          array: action.payload.sources.data
        }
      }
    }
    case Types.DELETE_CREDIT_CARD_FAILURE: {
      return {
        ...state,
        cards: {
          ...state.cards
        }
      }
    }
    case Types.DOING_PAYMENT_REQUEST: {
      return {
        ...state,
        pay: {
          ...state.pay,
          isLoading: true
        }
      }
    }
    case Types.DOING_PAYMENT_SUCCESS: {
      return {
        ...state,
        pay: {
          ...state.pay,
          bookingState: action.payload.bookingState,
          isLoading: false
        },
        newCard: {}
      }
    }
    case Types.DOING_PAYMENT_FAILURE: {
      return {
        ...state,
        pay: {
          ...state.pay,
          isLoading: false
        }
      }
    }
    case Types.UPDATE_DEFAULT_CARD_REQUEST: {
      return {
        ...state,
        cards: {
          ...state.cards
          // isLoading: true
        },
        defaultCard: state.defaultCard
      }
    }
    case Types.UPDATE_DEFAULT_CARD_SUCCESS: {
      return {
        ...state,
        cards: {
          ...state.cards,
          array: action.payload.sources.data,
          id: action.payload.id
          // isLoading: false
        },
        defaultCard: action.payload.default_source
      }
    }
    case Types.UPDATE_DEFAULT_CARD_ERROR: {
      return {
        ...state,
        cards: {
          ...state.cards
          // isLoading: true
        },
        defaultCard: state.defaultCard
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
      month: getMonth(dateOfBirthday) + 1,
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

export const getUserCards = () => async dispatch => {
  dispatch({ type: Types.GET_CREDIT_CARDS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({ query: queryGetCards })
    dispatch({ type: Types.GET_CREDIT_CARDS_SUCCESS, payload: data.getPaymentCards })
  } catch (err) {
    dispatch({ type: Types.GET_CREDIT_CARDS_FAILURE, payload: errToMsg(err) })
  }
}

export const createUserCard = (card, bookingId, metadata) => async dispatch => {
  dispatch({ type: Types.CREATE_CREDIT_CARD_REQUEST })

  const newCard = {
    cardName: card.name,
    cardNumber: card.number,
    expMonth: +card.expiry.split('/')[0],
    expYear: +card.expiry.split('/')[1],
    cvc: card.cvc
  }

  try {
    const { data } = await getClientWithAuth(dispatch).mutate({ mutation: mutationCreateCard, variables: newCard })
    dispatch({ type: Types.CREATE_CREDIT_CARD_SUCCESS, payload: data.createPaymentCard })
    // return data.createPaymentCard.lastCardCreated
  } catch (err) {
    toast.error(`${errToMsg(err)}`)

    // Send payment issue email
    const emailValues = {
      currentDate: format(new Date(), 'EEEE d MMMM, yyyy'),
      guestName: metadata.guestName,
      bookingId,
      appLink: metadata.location
    }
    const emailHost = {
      template: 'payment-issue',
      destination: metadata.guestEmail,
      data: JSON.stringify(Object.assign(emailValues, { email: metadata.guestEmail }))
    }
    dispatch(sendMail(emailHost))
    dispatch({ type: Types.CREATE_CREDIT_CARD_FAILURE, payload: errToMsg(err) })
  }
}

export const deleteUserCard = id => async dispatch => {
  dispatch({ type: Types.DELETE_CREDIT_CARD_REQUEST, payload: id })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationDeleteCard,
      variables: { cardId: id }
    })
    dispatch({ type: Types.DELETE_CREDIT_CARD_SUCCESS, payload: data.deletePaymentCard })
  } catch (err) {
    toast.error(`${errToMsg(err)}`)
    dispatch({ type: Types.DELETE_CREDIT_CARD_FAILURE, payload: errToMsg(err) })
  }
}

export const pay = (cardId, bookingId, history, metadata) => async dispatch => {
  dispatch({ type: Types.DOING_PAYMENT_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationDoPayment,
      variables: { cardId, bookingId }
    })
    toast.success('Paid')
    dispatch({ type: Types.DOING_PAYMENT_SUCCESS, payload: data.createPayment })
    history.push(`/itinerary/${bookingId}`)
  } catch (err) {
    toast.error(`${errToMsg(err)}`)

    // Send payment issue email
    const emailValues = {
      currentDate: format(new Date(), 'EEEE d MMMM, yyyy'),
      guestName: metadata.guestName,
      bookingId,
      appLink: metadata.location
    }
    const emailHost = {
      template: 'payment-issue',
      destination: metadata.guestEmail,
      data: JSON.stringify(Object.assign(emailValues, { email: metadata.guestEmail }))
    }
    dispatch(sendMail(emailHost))
    dispatch({ type: Types.DOING_PAYMENT_FAILURE, payload: errToMsg(err) })
  }
}

export const onUpdateDefaultCard = cardId => async dispatch => {
  dispatch({ type: Types.UPDATE_DEFAULT_CARD_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({
      mutation: mutationDefaultCard,
      variables: { cardId }
    })
    dispatch({ type: Types.UPDATE_DEFAULT_CARD_SUCCESS, payload: data.updateDefaultCard })
  } catch (err) {
    toast.error(`${errToMsg(err)}`)
    dispatch({ type: Types.UPDATE_DEFAULT_CARD_ERROR, payload: errToMsg(err) })
  }
}
