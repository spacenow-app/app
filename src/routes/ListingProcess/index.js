import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const LeadPage = lazy(() => import('pages/ListingProcess/LeadPage'))
const StepPage = lazy(() => import('pages/ListingProcess/StepPage'))
const AddressPage = lazy(() => import('pages/ListingProcess/AddressPage'))
const ProcessPage = lazy(() => import('pages/ListingProcess/ProcessPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const ListingProcess = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/lead`} />
        <Route exact component={LeadPage} path={`${match.path}/lead`} />
        <Route exact component={StepPage} path={`${match.path}/step`} />
        <Route exact component={AddressPage} path={`${match.path}/address`} />
        <Route component={ProcessPage} path={`${match.path}/space/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

ListingProcess.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default ListingProcess
