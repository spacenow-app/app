import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const ReviewPage = lazy(() => import('pages/ReviewPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Review = ({ match }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={ReviewPage} path={`${match.path}/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Review.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Review
