/* eslint-disable no-console */
import { from } from 'apollo-link'
import { InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'

import { config } from 'variables'

import { getByName } from 'utils/cookies'

const uploadLink = createUploadLink({ uri: config.graphQlHost, headers: { 'Accept-Encoding': 'gzip' } })

let apolloClientWithAuth
const authLink = dispatch =>
  setContext((_, { headers }) => {
    const idToken = getByName(config.token_name)
    if (!idToken || idToken.length <= 0) {
      apolloClientWithAuth = null
      return dispatch({ type: 'AUTH_2019_FAILED' })
    }
    return {
      headers: {
        ...headers,
        authorization: idToken ? `Bearer ${idToken}` : ''
      }
    }
  })

export const getClientWithAuth = dispatch => {
  if (!apolloClientWithAuth) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('Creating a new connection with Authentication to Apollo GraphQL.')
    }
    apolloClientWithAuth = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([authLink(dispatch), uploadLink])
    })
  }
  return apolloClientWithAuth
}

let apolloClient
export const getClient = () => {
  if (!apolloClient) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('Creating a new connection to Apollo GraphQL.')
    }
    apolloClient = new ApolloClient({ cache: new InMemoryCache(), link: uploadLink })
  }
  return apolloClient
}
