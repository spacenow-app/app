import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavBar, Modal, Loader } from 'components'
import { ToastContainer } from 'react-toastify'
import { Container } from 'react-bootstrap'

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
const Review = lazy(() => import('routes/Review'))
const ListingProcess = lazy(() => import('routes/ListingProcess'))
const Intro = lazy(() => import('routes/Intro'))
const BookingRequestConfirmation = lazy(() => import('routes/BookingRequestConfirmation'))

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
          {/* <PublicRoute
            path="/404"
            handlerCheckAuthentication={() => {}}
            isAuthenticated={null}
            component={otherProps => (
              <>
                <NavBar />
                <NotFoundPage {...otherProps} />
              </>
            )}
          /> */}
          <PublicRoute
            {...props}
            path="/auth"
            handlerCheckAuthentication={() => {}}
            isAuthenticated={isAuthenticated}
            component={Authentication}
            redirectToReferrer={redirectToReferrer}
          />
          <PublicRoute {...props} path="/lp" handlerCheckAuthentication={() => {}} component={LandingPages} />
          <PublicRoute {...props} path="/space" handlerCheckAuthentication={() => {}} component={Space} />
          <PublicRoute {...props} path="/search" handlerCheckAuthentication={() => {}} component={SearchPage} />
          <PublicRoute {...props} path="/welcome" handlerCheckAuthentication={() => {}} component={Intro} />
          <Redirect from="/account/dashboard" to="/account/profile" />
          <PrivateRoute
            {...props}
            path="/"
            handlerCheckAuthentication={_handlerCheckAuthentication}
            isAuthenticated={isAuthenticated}
            component={otherProps => {
              return (
                <>
                  {redirectToReferrer && <Redirect to={redirectToReferrer} />}
                  <Container>
                    <NavBar expand="lg" />
                  </Container>
                  <Switch>
                    <Route
                      {...otherProps}
                      exact
                      path={`${otherProps.match.path}/`}
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
                      path={`${otherProps.match.path}listing-process`}
                      isAuthenticated={isAuthenticated}
                      component={ListingProcess}
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
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}booking-confirmation-page`}
                      isAuthenticated={isAuthenticated}
                      component={BookingRequestConfirmation}
                    />
                    <Route
                      {...otherProps}
                      path={`${otherProps.match.path}review`}
                      isAuthenticated={isAuthenticated}
                      component={Review}
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
