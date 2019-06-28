import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import { IntroPage, LocationPage } from '../../pages'

const Listing = ({ match, ...props }) => {
  return (
    <Fragment>
      <Route {...props} exact component={IntroPage} path={match.path} />
      <Route {...props} component={LocationPage} path={`${match.path}/location`} />
      <Route {...props} exact component={() => <h1>Category</h1>} path={`${match.path}/category`} />
      <Route {...props} exact component={() => <h1>Listing Edit</h1>} path={`${match.path}/space/:id`} />
      <Route {...props} exact component={() => <h1>Prview</h1>} path={`${match.path}/:id/preview`} />
    </Fragment>
  )
}

export default Listing
