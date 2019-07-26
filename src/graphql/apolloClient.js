/* eslint-disable no-console */
import ApolloClient from 'apollo-boost'

import config from 'contants/config'

import { getByName } from 'utils/cookies'

let apolloClientWithAuth
export const getClientWithAuth = dispatch => {
  const idToken = getByName(config.token_name)
  if (!idToken || idToken.length <= 0) {
    apolloClientWithAuth = null
    return dispatch({ type: 'AUTH_2019_FAILED' })
  }
  if (!apolloClientWithAuth) {
    console.info('Creating a new connection with Authentication to Apollo GraphQL.')
    apolloClientWithAuth = new ApolloClient({
      uri: config.graphQlHost,
      headers: { authorization: idToken ? `Bearer ${idToken}` : '' }
    })
  }
  return apolloClientWithAuth
}

let apolloClient
export const getClient = () => {
  if (!apolloClient) {
    console.info('Creating a new connection to Apollo GraphQL.')
    apolloClient = new ApolloClient({ uri: config.graphQlHost })
  }
  return apolloClient
}
