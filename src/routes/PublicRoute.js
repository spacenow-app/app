import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ handlerCheckAuthentication, isAuthenticated, component: Component, ...rest }) => {
  useEffect(() => {
    handlerCheckAuthentication()
  })
  return <Route {...rest} render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)} />
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object)
  ]).isRequired,
  handlerCheckAuthentication: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default PublicRoute