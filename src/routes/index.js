import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavBar, Modal, Loader } from 'components'
import { ToastContainer } from 'react-toastify'

import { onTokenValidation, onIsTokenExists } from 'redux/ducks/auth'
import { HomePage, SearchPage, NotFoundPage } from 'pages'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const Authentication = lazy(() => import('routes/Authentication'))
const Listing = lazy(() => import('routes/Listing'))
const Space = lazy(() => import('routes/Space'))
const Account = lazy(() => import('routes/Account'))
const LandingPages = lazy(() => import('routes/LandingPages'))
const Checkout = lazy(() => import('routes/Checkout'))
const Itinerary = lazy(() => import('routes/Itinerary'))
const Receipt = lazy(() => import('routes/Receipt'))

const Routes = props => {
  const dispatch = useDispatch()

  const { isAuthenticated, redirectToReferrer, isLoading } = useSelector(state => state.auth)

  const _handlerCheckAuthentication = () => dispatch(onIsTokenExists())

  useEffect(() => {
    dispatch(onTokenValidation())
  }, [dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToastContainer hideProgressBar />
        <Modal />
        <Switch>
          <PublicRoute
            path="/404"
            component={otherProps => (
              <>
                <NavBar />
                <NotFoundPage {...otherProps} />
              </>
            )}
          />
          <PublicRoute
            {...props}
            path="/auth"
            component={Authentication}
          />
          <PublicRoute {...props} path="/lp" component={LandingPages} />
          <PublicRoute {...props} path="/space" component={Space} />
          <PublicRoute {...props} path="/search" component={SearchPage} />
          <PrivateRoute
            {...props}
            path="/"
            handlerCheckAuthentication={_handlerCheckAuthentication}
            isAuthenticated={isAuthenticated}
            component={otherProps => {
              return (
                <>
                  {redirectToReferrer && <Redirect to={redirectToReferrer} />}
                  <NavBar />
                  <Switch>
                    <Route
                      {...otherProps}
                      exact
                      path={otherProps.match.path}
                      isAuthenticated={isAuthenticated}
                      component={HomePage}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}listing`}
                      isAuthenticated={isAuthenticated}
                      component={Listing}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}account`}
                      isAuthenticated={isAuthenticated}
                      component={Account}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}checkout`}
                      isAuthenticated={isAuthenticated}
                      component={Checkout}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}itinerary`}
                      isAuthenticated={isAuthenticated}
                      component={Itinerary}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}receipt`}
                      isAuthenticated={isAuthenticated}
                      component={Receipt}
                    />
                    <Route component={NotFoundPage} />
                  </Switch>
                </>
              )
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
