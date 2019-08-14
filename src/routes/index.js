import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavBar, Modal, Loader } from 'components'
import { ToastContainer } from 'react-toastify'

import { onTokenValidation, onIsTokenExists } from 'redux/ducks/auth'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const HomePage = lazy(() => import('pages/HomePage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))
const Listing = lazy(() => import('routes/Listing'))
const Space = lazy(() => import('routes/Space'))
const Account = lazy(() => import('routes/Account'))
const LandingPages = lazy(() => import('routes/LandingPages'))

const Routes = props => {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isLoading = useSelector(state => state.auth.isLoading)

  const _handlerCheckAuthentication = () => dispatch(onIsTokenExists())

  useEffect(() => {
    dispatch(onTokenValidation())
  }, [dispatch, isAuthenticated])

  if (isLoading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ToastContainer hideProgressBar />
        <Switch>
          <Redirect exact from="/" to="/listing/intro" />
          <PublicRoute
            exact
            path="/auth"
            handlerCheckAuthentication={_handlerCheckAuthentication}
            isAuthenticated={isAuthenticated}
            component={() => <h1>Login Page</h1>}
          />
          <PublicRoute
            {...props}
            path="/landing-page"
            handlerCheckAuthentication={() => {}}
            // isAuthenticated={isAuthenticated}
            component={LandingPages}
          />
            <PublicRoute
            {...props}
            path="/space"
            handlerCheckAuthentication={() => {}}
            // isAuthenticated={isAuthenticated}
            component={Space}
          />
          <PrivateRoute
            {...props}
            path="/"
            handlerCheckAuthentication={_handlerCheckAuthentication}
            isAuthenticated={isAuthenticated}
            component={otherProps => {
              return (
                <>
                  <NavBar />
                  <Modal />
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
                    {/* <Route
                      {...otherProps}
                      path={`${otherProps.match.path}space`}
                      // isAuthenticated={isAuthenticated}
                      component={Space}
                    /> */}
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
