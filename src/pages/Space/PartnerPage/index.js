import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Wrapper, Loader } from 'components'
import { onGetListingById, onGetAllSpecifications } from 'redux/ducks/listing'
import { onSimilarSpaces } from 'redux/ducks/search'

import WeWorkPage from './WeWork'
import HoytsPage from './Hoyts'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])
  return children
}

const SetupProcessPage = ({ match, location, ...props }) => {
  const dispatch = useDispatch()
  const { object: listing, isLoading } = useSelector(state => state.listing.get)
  const { similar } = useSelector(state => state.search)
  const { object: specifications } = useSelector(state => state.listing.specifications)

  useEffect(() => {
    dispatch(onGetListingById(match.params.id, null, true))
  }, [dispatch, match.params.id])

  useEffect(() => {
    listing && dispatch(onGetAllSpecifications(listing.settingsParent.id, listing.listingData))
  }, [dispatch, listing])

  useEffect(() => {
    listing && dispatch(onSimilarSpaces(listing.id))
  }, [dispatch, listing])

  if (isLoading) {
    return <Loader text="Loading listing" />
  }

  return (
    <Wrapper>
      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/wework`} />
        <ScrollToTop>
          <Route
            exact
            path={`${match.path}/wework`}
            render={routeProps => (
              <WeWorkPage
                {...routeProps}
                {...props}
                listing={listing}
                similar={similar}
                specifications={specifications}
                dispatch={dispatch}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/hoyts`}
            render={routeProps => (
              <HoytsPage
                {...routeProps}
                {...props}
                listing={listing}
                similar={similar}
                specifications={specifications}
                dispatch={dispatch}
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
  location: PropTypes.instanceOf(Object).isRequired
}

export default SetupProcessPage
