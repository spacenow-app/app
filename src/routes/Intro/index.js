import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

const IntroHostPage = lazy(() => import('pages/IntroPage/IntroHostPage'))
const IntroGuestPage = lazy(() => import('pages/IntroPage/IntroGuestPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Intro = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact component={IntroHostPage} path={`${match.path}/host`} />
        <Route exact component={IntroGuestPage} path={`${match.path}/guest`} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}

Intro.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Intro
