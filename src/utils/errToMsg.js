/**
 * Extract a error message from a GraphQL exception.
 * Returning a generic message whether graphqlErrors doesn't exists.
 */
export default err => {
  if (err) {
    if (err.graphQLErrors && Array.isArray(err.graphQLErrors)) {
      const errObj = err.graphQLErrors.find(o => o)
      if (errObj && errObj.message) return errObj.message
    }
  }
  return `External error: ${err}`
}
