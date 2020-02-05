import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const LeadPage = lazy(() => import('pages/ListingProcess/LeadPage'))
const ViewPage = lazy(() => import('pages/ListingProcess/ViewPage'))
const SetupProcessPage = lazy(() => import('pages/ListingProcess/SetupProcessPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const ListingProcess = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/lead`} />
        <Route exact component={LeadPage} path={`${match.path}/lead`} />
        <Route component={SetupProcessPage} path={`${match.path}/setup-process/:id?`} />
        <Route component={ViewPage} path={`${match.path}/view/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

ListingProcess.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default ListingProcess
