import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const CheckoutPage = lazy(() => import('pages/CheckoutPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Checkout = ({ match, ...props }) => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={CheckoutPage} path={`${match.path}/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Checkout.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Checkout
