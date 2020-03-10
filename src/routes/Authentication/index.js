import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'components'
import { SigninPage, SignupPage, ForgotPasswordPage, ResetPasswordPage } from 'pages'

const Landingpages = ({ match, ...props }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact {...props} component={SigninPage} path={`${match.path}/signin`} />
        <Route exact {...props} component={SignupPage} path={`${match.path}/signup`} />
        <Route exact {...props} component={ForgotPasswordPage} path={`${match.path}/forgot_password`} />
        <Route exact {...props} component={ResetPasswordPage} path={`${match.path}/reset_password`} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  )
}

Landingpages.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Landingpages
