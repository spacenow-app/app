import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const ItineraryPage = lazy(() => import('pages/ItineraryPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Itinerary = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={ItineraryPage} path={`${match.path}/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Itinerary.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Itinerary
