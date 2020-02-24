import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const BookingRequestConfirmationPage = lazy(() => import('pages/BookingRequestConfirmationPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const BookingRequestConfirmation = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={BookingRequestConfirmationPage} path={`${match.path}/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

BookingRequestConfirmation.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default BookingRequestConfirmation
