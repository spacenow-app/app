import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const SpaceTypePage = lazy(() => import('./SpaceTypePage'))
const CategoryPage = lazy(() => import('./CategoryPage'))

const BasicsPage = ({ match, listing, dispatch, setFatherValues, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route
          exact
          path={`${match.path}/space-type`}
          render={routeProps => (
            <SpaceTypePage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/category`}
          render={routeProps => (
            <CategoryPage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Redirect exact from={match.path} to={`${match.path}/space-type`} />
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Suspense>
  )
}

BasicsPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default BasicsPage
