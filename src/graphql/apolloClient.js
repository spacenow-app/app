/* eslint-disable no-console */
import ApolloClient from 'apollo-boost'

import config from 'contants/config'

import getCookieByName from 'utils/getCookieByName'

export const getClientWithAuth = () => {
  console.info('Creating a new connection with Authentication to Apollo GraphQL.')
  const idToken = getCookieByName('id_token')
  return new ApolloClient({
    uri: config.graphQlHost,
    headers: { authorization: idToken ? `Bearer ${idToken}` : '' }
  })
}

export const getClient = () => {
  console.info('Creating a new connection to Apollo GraphQL.')
  return new ApolloClient({ uri: config.graphQlHost })
}
