import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { Wrapper, Box, Footer } from 'components'
import InnerMenu from './innerMenu'

const ProfilePage = lazy(() => import('pages/Account/ProfilePage'))
const PaymentPage = lazy(() => import('pages/Account/PaymentPage'))
const BookingPage = lazy(() => import('pages/Account/BookingPage'))
const ListingPage = lazy(() => import('pages/Account/ListingPage'))
const NotificationPage = lazy(() => import('pages/Account/NotificationPage'))
const DocumentVerificationPage = lazy(() => import('pages/Account/DocumentVerificationPage'))
const MessagePage = lazy(() => import('pages/Account/MessagePage'))
const MessageDetailPage = lazy(() => import('pages/Account/MessageDetailPage'))
const NotFoundPage = lazy(() => import('pages/NotFoundPage'))

const BoxStyled = styled(Box)`
  display: grid;
  grid-column-gap: 30px;
  grid-template-columns: 300px 1fr;

  @media only screen and (max-width: 1199px) {
    grid-template-columns: 280px 1fr;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const Account = ({ match, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper>
        <BoxStyled my="20px">
          <InnerMenu />
          <Box>
            <Switch>
              <Redirect exact from={match.path} to={`${match.path}/profile`} />
              <Route exact component={ProfilePage} path={`${match.path}/profile`} />
              <Route exact component={PaymentPage} path={`${match.path}/payment`} />
              <Route exact component={BookingPage} path={`${match.path}/booking`} />
              <Route exact component={ListingPage} path={`${match.path}/listing`} />
              <Route exact component={NotificationPage} path={`${match.path}/notification`} />
              <Route exact component={DocumentVerificationPage} path={`${match.path}/document-verification`} />
              <Route exact component={MessagePage} path={`${match.path}/messages`} />
              <Route exact component={MessageDetailPage} path={`${match.path}/message/:id`} />
              <Route component={NotFoundPage} />
            </Switch>
          </Box>
        </BoxStyled>
        <Footer />
      </Wrapper>
    </Suspense>
  )
}

Account.propTypes = {
  match: PropTypes.objectOf(Object)
}

export default Account
