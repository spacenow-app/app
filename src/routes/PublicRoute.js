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
  component: PropTypes.func.isRequired,
  handlerCheckAuthentication: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default PublicRoute
