import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

import InnerMenu from './innerMenu'
import { Wrapper, Box } from 'components'

const ProfilePage = lazy(() => import('pages/Account/ProfilePage'))
const PaymentPage = lazy(() => import('pages/Account/PaymentPage'))
const BookingPage = lazy(() => import('pages/Account/BookingPage'))
const ListingPage = lazy(() => import('pages/Account/ListingPage'))
const DocumentVerificationPage = lazy(() => import('pages/Account/DocumentVerificationPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const Account = ({ match, ...props }) => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper>
        <Box display="grid" gridTemplateColumns={{ small: "1fr", medium: '350px 1fr' }} gridColumnGap="30px" my="80px">
          <InnerMenu />
          <Box display="grid">
            <Switch>
              <Redirect exact from={match.path} to={`${match.path}/profile`} />
              <Route exact component={ProfilePage} path={`${match.path}/profile`} />
              <Route exact component={PaymentPage} path={`${match.path}/payment`} />
              <Route exact component={BookingPage} path={`${match.path}/booking`} />
              <Route exact component={ListingPage} path={`${match.path}/listing`} />
              <Route exact component={DocumentVerificationPage} path={`${match.path}/document-verification`} />
              <Route component={NotFoundPage} />
            </Switch>
          </Box>
        </Box>
      </Wrapper>
    </Suspense>
  )
}

Account.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Account
