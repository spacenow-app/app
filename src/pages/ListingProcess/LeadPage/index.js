import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Helmet from 'react-helmet'
import { Wrapper, Card, Title, Text } from 'components'
import { config } from 'variables'

import { onPostListing } from 'redux/ducks/listing-process'

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 50px;
  margin-top: 50px;
  @media (max-width: 680px) {
    grid-template-columns: auto;
    margin-bottom: 20px;
  }
`

const LeadPage = props => {
  
  const dispatch = useDispatch()
  const { object: listing, isLoading } = useSelector(state => state.listing_process.get)

  const _goTo = type => {
    if (type === 'multiple') {
      window.location.href = `${config.static}/contact-us`
      return
    }
    dispatch(onPostListing())
  }

  useEffect(() => {
    !isLoading && listing &&
    props.history.push(`/listing-process/setup-process/${listing.id}`)
  }, [listing, isLoading, props.history])

  return (
    <Wrapper>
      <Helmet title="Listing Intro - Spacenow" />
      <Title type="h3" title="Let’s get started!" />
      <Text>If you have more than 5 spaces please select the contact option.</Text>
      <WrapperStyled>
        <Card
          border
          rounded
          type="icon"
          icon="amenitie-storeRoom"
          title="Setup and self manage"
          description="Simple set up with a preview page before publishing."
          buttonText="Get started"
          buttonHandleClick={() => _goTo('single')}
        />

        <Card
          rounded
          border
          type="icon"
          icon="amenitie-storeRoom"
          icon2="amenitie-storeRoom"
          title="More than 5 spaces"
          description="Fill in a contact form for a team member to get in contact."
          buttonText="Contact us"
          buttonHandleClick={() => _goTo('multiple')}
        />
      </WrapperStyled>
    </Wrapper>
  )
}

export default LeadPage
