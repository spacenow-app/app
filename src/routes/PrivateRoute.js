import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ handlerCheckAuthentication, isAuthenticated, component: Component, location, ...rest }) => {
  useEffect(() => {
    handlerCheckAuthentication()
  })

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object)
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handlerCheckAuthentication: PropTypes.func.isRequired,
  location: PropTypes.instanceOf(Object)
}

export default PrivateRoute
