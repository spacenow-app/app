import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import {NavBar} from 'components'

const PartnerPage = lazy(() => import('pages/Space/PartnerPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Space = ({ match, ...props }) => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <NavBar />
      <Switch>
        <Route exact component={PartnerPage} path={`${match.path}/partner/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Space.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Space
