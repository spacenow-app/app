import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

const SpecificationPage = lazy(() => import('./SpecificationPage'))
const FeaturePage = lazy(() => import('./FeaturePage'))
const AmenitiesPage = lazy(() => import('./AmenitiesPage'))
const DetailPage = lazy(() => import('./DetailPage'))

const DetailsPage = ({ match, listing, dispatch, setFatherValues, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/specification`} />
        <Route
          path={`${match.path}/specification`}
          render={routeProps => (
            <SpecificationPage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Route
          path={`${match.path}/feature`}
          render={routeProps => (
            <FeaturePage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Route
          path={`${match.path}/amenities`}
          render={routeProps => (
            <AmenitiesPage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Route
          path={`${match.path}/detail`}
          render={routeProps => (
            <DetailPage
              {...routeProps}
              {...props}
              listing={listing}
              dispatch={dispatch}
              setFatherValues={setFatherValues}
            />
          )}
        />
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Suspense>
  )
}

DetailsPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired
}

export default DetailsPage
