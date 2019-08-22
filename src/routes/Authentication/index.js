import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Loader } from 'components'
import { SigninPage, SignupPage, ForgotPasswordPage } from 'pages'

const Landingpages = ({ match, ...props }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Route exact component={SigninPage} path={`${match.path}/signin`} />
      <Route exact component={SignupPage} path={`${match.path}/signup`} />
      <Route exact component={ForgotPasswordPage} path={`${match.path}/forgot_password`} />
    </Suspense>
  )
}

Landingpages.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Landingpages
