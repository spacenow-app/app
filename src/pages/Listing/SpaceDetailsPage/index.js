import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, Tab, TabItem, Loader, Tag, Icon, Box } from 'components'

import { onGetListingById, onUpdate } from 'redux/ducks/listing'
import { openModal, TypesModal } from 'redux/ducks/modal'

// import CancellationTab from './CancellationTab'
import BookingTab from './BookingTab'
import SpecificationTab from './SpecificationTab'
import AvailabilityTab from './AvailabilityTab'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

const SpaceDetailsPage = ({ match, history, location, ...props }) => {
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

  const _parseCategoryIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  return (
    <Wrapper>
      <Box my={{ _: '20px', medium: '40px' }}>
        <Box display="flex" justifyContent="start">
          <Box>
            <Tag
              icon={
                <Icon
                  width="24px"
                  name={_parseCategoryIconName(objectListing.settingsParent.category.otherItemName, false)}
                />
              }
            >
              {objectListing.settingsParent.category.itemName}
            </Tag>
          </Box>
          <Box margin="0 10px">
            <Tag
              icon={
                <Icon
                  width="24px"
                  name={_parseCategoryIconName(objectListing.settingsParent.subcategory.otherItemName, true)}
                />
              }
            >
              {objectListing.settingsParent.subcategory.itemName}
            </Tag>
          </Box>
        </Box>
      </Box>
      <Tab>
        <TabItem nav to={`${match.url}/specification`}>
          Specification
        </TabItem>
        <TabItem nav to={`${match.url}/booking`}>
          Booking
        </TabItem>
        <TabItem nav to={`${match.url}/availability`}>
          Availability
        </TabItem>
        {/* <TabItem nav to={`${match.url}/cancellation`}>
          Cancellation
        </TabItem> */}
      </Tab>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/specification`} />
        <ScrollToTop>
          <Route
            path={`${match.path}/specification`}
            render={routeProps => (
              <SpecificationTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/booking`}
            render={routeProps => (
              <BookingTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
              />
            )}
          />
          <Route
            path={`${match.path}/availability`}
            render={routeProps => (
              <AvailabilityTab
                {...routeProps}
                {...props}
                listing={objectListing}
                dispatch={dispatch}
                setFatherValues={_setFatherValues}
                match={match}
              />
            )}
          />
          {/* <Route
            path={`${match.path}/cancellation`}
            render={routeProps => (
              <CancellationTab {...routeProps} {...props} listing={objectListing} match={match} dispatch={dispatch} />
            )}
          /> */}
        </ScrollToTop>
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Wrapper>
  )
}

SpaceDetailsPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
}

export default SpaceDetailsPage
