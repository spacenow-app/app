import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const LeadFormRequirement = lazy(() => import('pages/LandingPages/LeadFormRequirement'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Landingpages = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={LeadFormRequirement} path={`${match.path}/lead-form-requirement`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Landingpages.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Landingpages
