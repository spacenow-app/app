import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const IntroPage = lazy(() => import('pages/Listing/IntroPage'))
const LocationPage = lazy(() => import('pages/Listing/LocationPage'))
const CategoryPage = lazy(() => import('pages/Listing/CategoryPage'))
const SpaceDetailsPage = lazy(() => import('pages/Listing/SpaceDetailsPage'))
const V2SpaceDetailsPage = lazy(() => import('pages/Listing/V2SpaceDetailsPage'))
const PreviewPage = lazy(() => import('pages/Listing/PreviewPage'))
const V2PreviewPage = lazy(() => import('pages/Listing/V2PreviewPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Listing = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/intro`} />
        <Route exact component={IntroPage} path={`${match.path}/intro`} />
        <Route exact component={LocationPage} path={`${match.path}/location`} />
        <Route exact component={CategoryPage} path={`${match.path}/category`} />
        <Route component={SpaceDetailsPage} path={`${match.path}/space/:id`} />
        <Route component={V2SpaceDetailsPage} path={`${match.path}/v2/space/:id`} />
        <Route exact component={PreviewPage} path={`${match.path}/preview/:id`} />
        <Route exact component={V2PreviewPage} path={`${match.path}/v2/preview/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Listing.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Listing
