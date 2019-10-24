import { gql } from 'apollo-boost'
import { getClientWithAuth } from 'graphql/apolloClient'
import errToMsg from 'utils/errToMsg'
import _ from 'lodash'
import { toast } from 'react-toastify'

// Actions
export const Types = {
  GET_MESSAGES_USER_REQUEST: 'GET_MESSAGES_USER_REQUEST',
  GET_MESSAGES_USER_SUCCESS: 'GET_MESSAGES_USER_SUCCESS',
  GET_MESSAGES_USER_ERROR: 'GET_MESSAGES_USER_ERROR',
  GET_MESSAGE_REQUEST: 'GET_MESSAGE_REQUEST',
  GET_MESSAGE_SUCCESS: 'GET_MESSAGE_SUCCESS',
  GET_MESSAGE_ERROR: 'GET_MESSAGE_ERROR',
  CREATE_MESSAGE_REQUEST: 'CREATE_MESSAGE_REQUEST',
  CREATE_MESSAGE_SUCCESS: 'CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_ERROR: 'CREATE_MESSAGE_ERROR',
  READ_MESSAGE_REQUEST: 'READ_MESSAGE_REQUEST',
  READ_MESSAGE_SUCCESS: 'READ_MESSAGE_SUCCESS',
  READ_MESSAGE_ERROR: 'READ_MESSAGE_ERROR',
  CREATE_MESSAGE_ITEM_REQUEST: 'CREATE_MESSAGE_ITEM_REQUEST',
  CREATE_MESSAGE_ITEM_SUCCESS: 'CREATE_MESSAGE_ITEM_SUCCESS',
  CREATE_MESSAGE_ITEM_ERROR: 'CREATE_MESSAGE_ITEM_ERROR',
  GET_MESSAGE_ITEMS_REQUEST: 'GET_MESSAGE_ITEMS_REQUEST',
  GET_MESSAGE_ITEMS_SUCCESS: 'GET_MESSAGE_ITEMS_SUCCESS',
  GET_MESSAGE_ITEMS_ERROR: 'GET_MESSAGE_ITEMS_ERROR'
}

// Initial State
const initialState = {
  isLoading: true,
  error: {
    message: null
  },
  list: {
    isLoading: true,
    array: null
  },
  get: {
    isLoading: true,
    object: null
  },
  create: {
    object: null
  },
  read: {
    isRead: null
  },
  getItems: {
    isLoading: true,
    object: {}
  }
}

const messageFields = `
  __typename
  id
  guest {
    __typename
    id
    profile {
      __typename
      displayName
      picture
    }
  }
  host {
    __typename
    id
    profile {
      __typename
      displayName
      picture
    }
  }
  listing {
    __typename
    id
  }
  isRead
  unreadItems
`

const messageItemFields = `
  __typename
  id
  messageId
  sent {
    __typename
    id
    profile {
      picture
    }
  }
  content
  isRead
  createdAt
  updatedAt
`

// GraphQL
const getMessagesByUser = gql`
  query getMessagesByUser($id: String!, $type: String!, $pageIndex: Int!, $pageSize: Int!) {
    getMessagesByUser(id: $id, type: $type, pageIndex: $pageIndex, pageSize: $pageSize) {
      __typename
      count
      rows {
        ${messageFields}
        messageItems {
          ${messageItemFields}
        }
      }
    }
  }
`

const getMessage = gql`
  query getMessage($id: String!) {
    getMessage(id: $id) {
      ${messageFields}
    }
  }
`

const createMessage = gql`
  mutation createMessage($listingId: Int!, $guestId: String!, $hostId: String!, $content: String!) {
    postMessage(listingId: $listingId, guestId: $guestId, hostId: $hostId, content: $content) {
      ${messageFields}
    }
  }
`

const readMessage = gql`
  mutation readMessage($id: String!, $userId: String!) {
    readMessage(id: $id, userId: $userId) {
      isRead
    }
  }
`

const createMessageItem = gql`
  mutation createMessageItem($messageId: String!, $sentBy: String!, $content: String!, $isRead: Int) {
    postMessageItem(messageId: $messageId, sentBy: $sentBy, content: $content, isRead: $isRead) {
      ${messageItemFields}
    }
  }
`

const getMessageItems = gql`
  query getMessageItems($id: String!, $pageIndex: Int!, $pageSize: Int!) {
    getMessageItems(id: $id, pageIndex: $pageIndex, pageSize: $pageSize) {
      count
      rows {
        ${messageItemFields}
      }
    }
  }
`

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_MESSAGES_USER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_MESSAGES_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        list: {
          isLoading: false,
          array: action.payload
        },
        getItems: {
          object: null
        }
      }
    }
    case Types.GET_MESSAGES_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.GET_MESSAGE_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_MESSAGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        get: {
          object: action.payload
        }
      }
    }
    case Types.GET_MESSAGE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.CREATE_MESSAGE_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.CREATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        create: {
          object: action.payload
        }
      }
    }
    case Types.CREATE_MESSAGE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.READ_MESSAGE_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.READ_MESSAGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        read: {
          isRead: action.payload
        }
      }
    }
    case Types.READ_MESSAGE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.CREATE_MESSAGE_ITEM_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.CREATE_MESSAGE_ITEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getItems: {
          isLoading: false,
          object: {
            ...state.getItems.object,
            rows: [action.payload, ...state.getItems.object.rows]
          }
        }
      }
    }
    case Types.CREATE_MESSAGE_ITEM_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: {
          message: action.payload
        }
      }
    }
    case Types.GET_MESSAGE_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Types.GET_MESSAGE_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getItems: {
          isLoading: false,
          object: _.mergeWith(state.getItems.object, action.payload, _customizer)
        }
      }
    }
    case Types.GET_MESSAGE_ITEMS_ERROR: {
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
export const onGetMessagesByUser = args => async dispatch => {
  dispatch({ type: Types.GET_MESSAGES_USER_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({
      query: getMessagesByUser,
      variables: args,
      fetchPolicy: 'network-only'
    })
    dispatch({ type: Types.GET_MESSAGES_USER_SUCCESS, payload: data.getMessagesByUser })
  } catch (err) {
    dispatch({ type: Types.GET_MESSAGES_USER_ERROR, payload: errToMsg(err) })
  }
}

export const onGetMessage = id => async dispatch => {
  dispatch({ type: Types.GET_MESSAGE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({ query: getMessage, variables: { id } })
    dispatch({ type: Types.GET_MESSAGE_SUCCESS, payload: data.getMessage })
  } catch (err) {
    dispatch({ type: Types.GET_MESSAGE_ERROR, payload: errToMsg(err) })
  }
}

export const onCreateMessage = values => async dispatch => {
  dispatch({ type: Types.CREATE_MESSAGE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({ mutation: createMessage, variables: values })
    dispatch({ type: Types.CREATE_MESSAGE_SUCCESS, payload: data.createMessage })
    toast.success(`Your message was sent to the host.`)
  } catch (err) {
    dispatch({ type: Types.CREATE_MESSAGE_ERROR, payload: errToMsg(err) })
    toast.error(`Problem sending the message, try again later.`)
  }
}

export const onReadMessage = (id, userId) => async dispatch => {
  dispatch({ type: Types.READ_MESSAGE_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({ mutation: readMessage, variables: { id, userId } })
    dispatch({ type: Types.READ_MESSAGE_SUCCESS, payload: data.readMessage })
  } catch (err) {
    dispatch({ type: Types.READ_MESSAGE_ERROR, payload: errToMsg(err) })
  }
}

export const onCreateMessageItem = values => async dispatch => {
  dispatch({ type: Types.CREATE_MESSAGE_ITEM_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).mutate({ mutation: createMessageItem, variables: values })
    dispatch({ type: Types.CREATE_MESSAGE_ITEM_SUCCESS, payload: data.postMessageItem })
  } catch (err) {
    dispatch({ type: Types.CREATE_MESSAGE_ITEM_ERROR, payload: errToMsg(err) })
  }
}

export const onGetMessageItems = values => async dispatch => {
  dispatch({ type: Types.GET_MESSAGE_ITEMS_REQUEST })
  try {
    const { data } = await getClientWithAuth(dispatch).query({ query: getMessageItems, variables: values })
    dispatch({ type: Types.GET_MESSAGE_ITEMS_SUCCESS, payload: data.getMessageItems })
  } catch (err) {
    dispatch({ type: Types.GET_MESSAGE_ITEMS_ERROR, payload: errToMsg(err) })
  }
}

// Helpers
const _customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}
