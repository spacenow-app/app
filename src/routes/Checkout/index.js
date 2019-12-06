import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const InfoTab = lazy(() => import('pages/Checkout/InfoTab'))
const MessageTab = lazy(() => import('pages/Checkout/MessageTab'))
const CheckoutTab = lazy(() => import('pages/Checkout/CheckoutTab'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Checkout = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={InfoTab} path={`${match.path}/:id/info`} />
        <Route exact component={MessageTab} path={`${match.path}/:id/message`} />
        <Route exact component={CheckoutTab} path={`${match.path}/:id/pay`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Checkout.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Checkout
