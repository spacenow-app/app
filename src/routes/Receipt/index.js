import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const ReceiptPage = lazy(() => import('pages/ReceiptPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Receipt = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={ReceiptPage} path={`${match.path}/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Receipt.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Receipt
