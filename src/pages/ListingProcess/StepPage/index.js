import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Title, RadioCheckbox, Grid, Cell, Button, Link, Box, ProgressBar } from 'components'

import {
  onGetListingSteps,
  onGetListing,
  onPostListing
} from 'redux/ducks/listing-process'

const CellStyled = styled(Cell)`
  display: grid;
  align-items: center;
`

const StepPage = ({ match, ...props }) => {

  const dispatch = useDispatch()
  const listingId = match.params.id

  const { object: listing, isLoading: isListingLoading } = useSelector(state => state.listing_process.get)
  const { object: steps, isLoading: isStepsLoading } = useSelector(state => state.listing_process.steps)

  useEffect(() => {
    if (listingId) {
      dispatch(onGetListingSteps(listingId))
      dispatch(onGetListing(listingId))
    } else {
      dispatch(onPostListing())
    }
  }, [dispatch, listingId])

  return (
    <Wrapper my="40px">
      <Helmet title="Listing Intro - Spacenow" />
      <ProgressBar percent={steps && steps.completed} />
      <Title
        type="h3"
        title="Barrett, tell us about your space"
        subtitle="The more details you list, the faster the bookings."
        subTitleMargin={10}
      />
      <Grid columns={12}>
        {list.map((item) => {
          return (
            <Fragment key={item.id}>
              <CellStyled width={1}>
                <RadioCheckbox checked={steps && steps[item.id] === "completed" || false} onChange={() => { }} />
              </CellStyled>
              <CellStyled width={8}>
                <Box my="10px" ml="-20px">
                  <Title
                    type="h6"
                    title={item.title}
                    subtitle={item.subtitle}
                    subTitleMargin={12}
                    mediumBold
                    noMargin
                  />
                </Box>
              </CellStyled>
              <CellStyled width={3}>
                {!listingId && (
                  <Button onClick={() => props.history.push(`/listing-process/address/${listingId}`)} style={{ justifySelf: 'end' }}>
                    Get started
                  </Button>
                )}
                {listingId && (
                  <Link to={`${item.path}/${listingId}`} style={{ justifySelf: 'end' }}>
                    Edit
                  </Link>
                )}
              </CellStyled>
            </Fragment>
          )
        })}
      </Grid>
      <Box display="grid" justifyItems="end">
        <Button disabled={steps && steps.completed !== 100} onClick={() => props.history.push(`/listing-process/preview/${listing.id}`)}>Preview</Button>
      </Box>
    </Wrapper>
  )
}

StepPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
}

export default StepPage

// Mock data
const list = [
  {
    id: 'step1',
    title: '1. Location',
    subtitle: 'You can provide a street address or a business name',
    checked: false,
    path: '/listing-process/address'
  },
  {
    id: 'step2',
    title: '2. The basics',
    subtitle: 'Kind of property and intended us',
    checked: false,
    path: '/listing-process/details'
  },
  {
    id: 'step3',
    title: '3. The details',
    subtitle: 'Capacity, features, title, description etc.',
    checked: false,
    path: '/listing-process/details'
  },
  { id: 'step4', title: '4. Set the scene', subtitle: 'Upload photos and any media', checked: false, path: 'address' },
  { id: 'step5', title: '5. Pricing', subtitle: 'Set pricing and extras', checked: false, path: 'address' },
  {
    id: 'step6',
    title: '6. Accessing the space',
    subtitle: 'Tell guests how they can access the space',
    checked: false,
    path: 'address'
  },
  { id: 'step7', title: '7. Opening hours', subtitle: 'Set the availability of the space', checked: false, path: 'address' },
  {
    id: 'step8',
    title: '8. Cancellation policy',
    subtitle: 'Choose the policy that suits your space',
    checked: false,
    path: 'address'
  }
]
