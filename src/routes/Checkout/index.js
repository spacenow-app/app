import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const InfoPage = lazy(() => import('pages/Checkout/InfoPage'))
const MessagePage = lazy(() => import('pages/Checkout/MessagePage'))
const CheckoutPage = lazy(() => import('pages/Checkout/CheckoutPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Checkout = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={InfoPage} path={`${match.path}/:id/info`} />
        <Route exact component={MessagePage} path={`${match.path}/:id/message`} />
        <Route exact component={CheckoutPage} path={`${match.path}/:id/pay`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Checkout.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Checkout
