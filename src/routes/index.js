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
const Authentication = lazy(() => import('routes/Authentication'))
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
          <Redirect exact from="/" to="/listing/intro" />
          <PublicRoute
            path="/auth"
            handlerCheckAuthentication={() => {}}
            isAuthenticated={isAuthenticated}
            component={Authentication}
          />
          <PublicRoute
            {...props}
            path="/lp"
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
                      isAuthenticated={isAuthenticated}
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
