import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object)
  ]).isRequired
}

export default PublicRoute
