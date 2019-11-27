import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, Loader, ProgressBar } from 'components'

import { onGetListingById, onUpdate } from 'redux/ducks/listing'
import { openModal, TypesModal } from 'redux/ducks/modal'

import SpaceTypeTab from './Basic/SpaceTypeTab'
import CategoryTab from './Basic/CategoryTab'
import SpecTab from './Detail/SpecTab'
import FeatureTab from './Detail/FeatureTab'
import DetailTab from './Detail/DetailTab'
import AmenitiesTab from './Detail/AmenitiesTab'
import MediaTab from './Detail/MediaTab'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

const ProcessPage = ({ match, history, location, ...props }) => {
  const dispatch = useDispatch()

  const { object: objectListing, isLoading, isNotOwner } = useSelector(state => state.listing.get)
  const { user } = useSelector(state => state.account.get)

  const [values, setValues] = useState({})

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, user.id))
  }, [dispatch, match.params.id, user])

  useEffect(() => {
    if (history.action === 'PUSH' && values.isValid) dispatch(onUpdate(objectListing, values))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.key])

  const _setFatherValues = obj => {
    setValues(obj)
  }

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
      <ProgressBar percent="5" />
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/type`} />
        <ScrollToTop>
          <Route
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
            path={`${match.path}/detail`}
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
        </ScrollToTop>
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Wrapper>
  )
}

ProcessPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
}

export default ProcessPage
