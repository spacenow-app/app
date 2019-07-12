import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { NavBar } from 'components'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const HomePage = lazy(() => import('pages/HomePage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))
const Listing = lazy(() => import('routes/Listing'))

const Routes = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isAppLoading = useSelector(state => state.system.isAppLoading)

  if (isAppLoading) {
    return <div>Loading</div>
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PublicRoute exact path="/auth" isAuthenticated={isAuthenticated} component={() => <h1>Login Page</h1>} />
          <PrivateRoute
            {...props}
            path="/"
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
