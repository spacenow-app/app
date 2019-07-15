import ApolloClient from 'apollo-boost'

let apolloClient = null

export const getClient = () => {
  if (apolloClient === null) {
    console.info('Creating a new connection to Apollo GraphQL.')
    apolloClient = new ApolloClient({
      uri: 'http://localhost:4000/graphql'
    })
  }
  return apolloClient
}
