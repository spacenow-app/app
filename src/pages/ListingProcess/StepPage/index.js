import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Title, RadioCheckbox, Grid, Cell, Button, Link, Box, ProgressBar } from 'components'

const CellStyled = styled(Cell)`
  display: grid;
  align-items: center;
`

const StepPage = ({ match, ...props }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    const listingId = match.params.id
    dispatch(onGetSteps(listingId))
  }, [])

  return (
    <Wrapper my="40px">
      <Helmet title="Listing Intro - Spacenow" />
      <ProgressBar percent="0" />
      <Title
        type="h3"
        title="Barrett, tell us about your space"
        subtitle="The more details you list, the faster the bookings."
        subTitleMargin={10}
      />
      <Grid columns={12}>
        {list.map((item, index) => {
          return (
            <Fragment key={index}>
              <CellStyled width={1}>
                <RadioCheckbox checked={item.checked} onChange={() => { }} />
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
                {index === 0 && !item.checked && (
                  <Button onClick={() => props.history.push('/listing-process/address')} style={{ justifySelf: 'end' }}>
                    Get started
                  </Button>
                )}
                {index !== 0 && item.checked && (
                  <Link to={item.path} style={{ justifySelf: 'end' }}>
                    Edit
                  </Link>
                )}
              </CellStyled>
            </Fragment>
          )
        })}
      </Grid>
      <Box display="grid" justifyItems="end">
        <Button onClick={() => props.history.push('/listing-process/preview')}>Preview</Button>
      </Box>
    </Wrapper>
  )
}

export default StepPage

// Mock data
const list = [
  {
    title: '1. Location',
    subtitle: 'You can provide a street address or a business name',
    checked: false,
    path: '/listing-process/address'
  },
  {
    title: '2. The basics',
    subtitle: 'Kind of property and intended us',
    checked: false,
    path: '/listing-process/details'
  },
  {
    title: '3. The details',
    subtitle: 'Capacity, features, title, description etc.',
    checked: false,
    path: '/listing-process/details'
  },
  { title: '4. Set the scene', subtitle: 'Upload photos and any media', checked: false, path: 'address' },
  { title: '5. Pricing', subtitle: 'Set pricing and extras', checked: false, path: 'address' },
  {
    title: '6. Accessing the space',
    subtitle: 'Tell guests how they can access the space',
    checked: false,
    path: 'address'
  },
  { title: '7. Opening hours', subtitle: 'Set the availability of the space', checked: false, path: 'address' },
  {
    title: '8. Cancellation policy',
    subtitle: 'Choose the policy that suits your space',
    checked: false,
    path: 'address'
  }
]
