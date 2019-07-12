import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const IntroPage = lazy(() => import('pages/Listing/IntroPage'))
const LocationPage = lazy(() => import('pages/Listing/LocationPage'))
const CategoryPage = lazy(() => import('pages/Listing/CategoryPage'))
const SpacePage = lazy(() => import('pages/Listing/SpacePage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Listing = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/intro`} />
        <Route exact component={IntroPage} path={`${match.path}/intro`} />
        <Route exact component={LocationPage} path={`${match.path}/location`} />
        <Route exact component={CategoryPage} path={`${match.path}/category`} />
        <Route component={SpacePage} path={`${match.path}/space/:id`} />
        <Route exact component={() => <h1>Prview</h1>} path={`${match.path}/preview/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Listing.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Listing
