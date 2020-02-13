import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, Loader, ProgressBar } from 'components'
import { onGetListingSteps, onGetListing, onPutListing } from 'redux/ducks/listing-process'
import { openModal, TypesModal } from 'redux/ducks/modal'

import LocationPage from './Location'
import StepPage from './Steps'
import ScenePage from './Scene'
import PricingPage from './Pricing'
import AccessPage from './Access'
import OpeningHoursPage from './OpeningHours'
import CancellationPage from './Cancellation'
import BasicsPage from './Basics'
import DetailsPage from './Details'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

const SetupProcessPage = ({ match, history, location, ...props }) => {
  const dispatch = useDispatch()
  const listingId = match.params.id
  const { object: listing, isLoading, isNotOwner } = useSelector(state => state.listing_process.get)
  const { object: steps } = useSelector(state => state.listing_process.steps)
  const [values, setValues] = useState({})

  const _setFatherValues = obj => {
    setValues(obj)
  }

  useEffect(() => {
    if (listingId) {
      dispatch(onGetListingSteps(listingId))
      dispatch(onGetListing(listingId))
    }
  }, [dispatch, listingId])

  useEffect(() => {
    if (history.action === 'PUSH') dispatch(onPutListing({ ...listing, ...values }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.key, dispatch])

  if (isLoading) {
    return <Loader text="Loading listing process" />
  }

  if (isNotOwner) {
    history.replace('/')
    dispatch(
      openModal(TypesModal.MODAL_TYPE_WARN, {
        options: {
          title: 'Access denied',
          text: `This space does not belong to the logged in user.`,
          handlerCallback: false,
          handlerTitle: 'OK'
        }
      })
    )
    return null
  }

  return (
    <Wrapper>
      <Wrapper>
        <ProgressBar percent={steps && steps.completed} />
      </Wrapper>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/steps`} />
        <ScrollToTop>
          <Route
            exact
            path={`${match.path}/steps`}
            render={routeProps => (
              <StepPage
                {...routeProps}
                {...props}
                steps={steps}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/location`}
            render={routeProps => (
              <LocationPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/basics`}
            render={routeProps => (
              <BasicsPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/details`}
            render={routeProps => (
              <DetailsPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/scene`}
            render={routeProps => (
              <ScenePage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/pricing`}
            render={routeProps => (
              <PricingPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/access`}
            render={routeProps => (
              <AccessPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/opening-hours`}
            render={routeProps => (
              <OpeningHoursPage
                {...routeProps}
                {...props}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/cancellation`}
            render={routeProps => (
              <CancellationPage
                {...routeProps}
                {...props}
                steps={steps}
                listing={listing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
        </ScrollToTop>
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Wrapper>
  )
}

SetupProcessPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
}

export default SetupProcessPage
