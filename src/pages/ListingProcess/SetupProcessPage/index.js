import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, Loader, ProgressBar } from 'components'
import { onGetListingSteps, onGetListing, onPostListing } from 'redux/ducks/listing-process'
import { openModal, TypesModal } from 'redux/ducks/modal'

import LocationPage from './Location'
import StepPage from './Steps'
// import Scene from './Scene'
// import Pricing from './Pricing'
// import Access from './Access'
// import OpeningHours from './OpeningHours'
// import Cancellation from './Cancellation'

// import SpaceTypeTab from './Basic/SpaceTypeTab'
import BasicsPage from './Basics'
import DetailsPage from './Details'
// import SpecTab from './Detail/SpecTab'
// import FeatureTab from './Detail/FeatureTab'
// import DetailTab from './Detail/DetailTab'
// import AmenitiesTab from './Detail/AmenitiesTab'
// import MediaTab from './Detail/MediaTab'
// import PriceTab from './Detail/PriceTab'
// import AccessTab from './Detail/AccessTab'
// import TimetableTab from './Detail/TimetableTab'
// import CancelTab from './Detail/CancelTab'

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
    } else {
      dispatch(onPostListing())
    }
  }, [dispatch, listingId])

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
          {/* <Route
            path={`${match.path}/type`}
            render={routeProps => (
              <SpaceTypeTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/category`}
            render={routeProps => (
              <CategoryTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/specification`}
            render={routeProps => (
              <SpecTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/feature`}
            render={routeProps => (
              <FeatureTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/details`}
            render={routeProps => (
              <DetailTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/amenities`}
            render={routeProps => (
              <AmenitiesTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/media`}
            render={routeProps => (
              <MediaTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/price`}
            render={routeProps => (
              <PriceTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/access`}
            render={routeProps => (
              <AccessTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/timetable`}
            render={routeProps => (
              <TimetableTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/cancellation`}
            render={routeProps => (
              <CancelTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          /> */}
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
