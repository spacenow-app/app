import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const LeadFormRequirement = lazy(() => import('pages/LandingPages/LeadFormRequirement'))
const RentMyOfficeSpace = lazy(() => import('pages/LandingPages/RentMyOfficeSpace'))
const RentMyCarSpace = lazy(() => import('pages/LandingPages/RentMyCarSpace'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Landingpages = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={LeadFormRequirement} path={`${match.path}/lead-form-requirement`} />
        <Route exact component={RentMyOfficeSpace} path={`${match.path}/rent-my-office-space`} />
        <Route exact component={RentMyCarSpace} path={`${match.path}/rent-my-car-space`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Landingpages.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Landingpages
