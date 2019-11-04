import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const HostReviewPage = lazy(() => import('pages/ReviewPage/HostReviewPage'))
const GuestReviewPage = lazy(() => import('pages/ReviewPage/GuestReviewPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Review = ({ match }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={HostReviewPage} path={`${match.path}/:id/host`} />
        <Route exact component={GuestReviewPage} path={`${match.path}/:id/guest`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Review.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Review
