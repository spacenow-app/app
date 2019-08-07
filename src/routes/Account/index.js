import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const ProfilePage = lazy(() => import('pages/Account/ProfilePage'))
const PaymentPage = lazy(() => import('pages/Account/PaymentPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Listing = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/profile`} />
        <Route exact component={ProfilePage} path={`${match.path}/profile`} />
        <Route exact component={PaymentPage} path={`${match.path}/payment`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Listing.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Listing
