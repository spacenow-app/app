import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NotFoundPage, IntroPage, LocationPage, CategoryPage, SpacePage } from 'pages'

const Listing = ({ match, ...props }) => {
  return (
    <>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/intro`} />
        <Route exact component={IntroPage} path={`${match.path}/intro`} />
        <Route exact component={LocationPage} path={`${match.path}/location`} />
        <Route exact component={CategoryPage} path={`${match.path}/category`} />
        <Route component={SpacePage} path={`${match.path}/space/:id`} />
        <Route exact component={() => <h1>Prview</h1>} path={`${match.path}/preview/:id`} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  )
}

export default Listing
