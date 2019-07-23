/* eslint-disable no-console */
import ApolloClient from 'apollo-boost'

import config from 'contants/config'

import getCookieByName from 'utils/getCookieByName'

export const getClientWithAuth = () => {
  console.info('Creating a new connection with Authentication to Apollo GraphQL.')
  // const idToken = getCookieByName('id_token')

  const idToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYwODg5ZTUwLTYwNTYtMTFlOS05OTE3LTdmMTUxYWI3NjBhNCIsImlhdCI6MTU2Mzg0OTM3MiwiZXhwIjoxNTc5NDAxMzcyfQ.xBrCCVm4yh5SGZ3B0LfZge6RfDODTynr91qzx75TesU'
  return new ApolloClient({
    uri: config.graphQlHost,
    headers: { authorization: idToken ? `Bearer ${idToken}` : '' }
  })
}

export const getClient = () => {
  console.info('Creating a new connection to Apollo GraphQL.')
  return new ApolloClient({ uri: config.graphQlHost })
}
