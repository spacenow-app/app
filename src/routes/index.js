import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Listing from './Listing'
import { NavBar } from '../components'
import { HomePage, NotFoundPage } from '../pages'

const Routes = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const isAppLoading = useSelector(state => state.system.isAppLoading)

  if (isAppLoading) {
    return <div>Loading</div>
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/auth" isAuthenticated={isAuthenticated} component={() => <h1>Login Page</h1>} />
        <PrivateRoute
          {...props}
          path="/"
          isAuthenticated={isAuthenticated}
          component={props => {
            return (
              <>
                <NavBar />
                <Switch>
                  <PrivateRoute
                    {...props}
                    exact
                    path={props.match.path}
                    isAuthenticated={isAuthenticated}
                    component={HomePage}
                  />
                  <Route
                    {...props}
                    path={`${props.match.path}listing`}
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
    </BrowserRouter>
  )
}

export default Routes
