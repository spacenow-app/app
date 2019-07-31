import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Wrapper, Tab, TabItem, Loader, Tag, Icon, Box } from 'components'
import { onGetListingById, onUpdate } from 'redux/ducks/listing'
import { useDispatch, useSelector } from 'react-redux'
import CancellationTab from './CancellationTab'
import BookingTab from './BookingTab'
import SpecificationTab from './SpecificationTab'
import AvailabilityTab from './AvailabilityTab'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

const SpacePage = ({ match, history, location, ...props }) => {
  const dispatch = useDispatch()
  const { object: objectListing, isLoading } = useSelector(state => state.listing.get)
  const [values, setValues] = useState({})

  useEffect(() => {
    // dispatch(onGetListingById(match.params.id, props.history))
    dispatch(onGetListingById(match.params.id))
  }, [dispatch, match.params.id])

  useEffect(() => {
    if (history.action === 'PUSH') {
      dispatch(onUpdate(objectListing, values))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.key])

  const _setFatherValues = obj => {
    setValues(obj)
  }

  if (isLoading) {
    return <Loader text="Loading listing process" />
  }

  const _parseCategoryIconName = (name, isSub) => {
    let prefix = 'category-'
    if (isSub) prefix = 'sub-category-'
    return prefix + name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
  }

  return (
    <Wrapper>
      <Box mb="50px" mt="50px">
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
        <TabItem nav to={`${match.url}/cancellation`}>
          Cancelation Policy
        </TabItem>
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
              <AvailabilityTab {...routeProps} {...props} listing={objectListing} dispatch={dispatch} />
            )}
          />
          <Route
            path={`${match.path}/cancellation`}
            render={routeProps => (
              <CancellationTab {...routeProps} {...props} listing={objectListing} match={match} dispatch={dispatch} />
            )}
          />
        </ScrollToTop>
        <Route component={() => <h1>not found</h1>} />
      </Switch>
    </Wrapper>
  )
}

SpacePage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired
}

export default SpacePage
