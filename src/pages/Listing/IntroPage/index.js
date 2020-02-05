import React, { Component } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Wrapper, Card, Title, Text } from 'components'
import { config } from 'variables'
// import FormContactUs from './FormContactUs'

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

class IntroPage extends Component {
  _goTo = type => {
    if (type === 'multiple') {
      window.location.href = `${config.static}/contact-us`
      return
    }
    this.props.history.push('/listing/location')
  }

  render() {
    return (
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow" />
        <Title type="h3" title="Want to list one at a time or multiple?" />
        <Text>
          We’ve created two listing options for quicker space management. <br />
          Multiple spaces is for spaces that share the same address, ie. an office and a meeting room.
        </Text>
        <WrapperStyled>
          <Card
            border
            rounded
            type="icon"
            icon="amenitie-storeRoom"
            title="One at a time"
            description="Simple option to list one at a time. With a preview page before publishing. <separate> TIP: Manage your own space"
            buttonText="Get started"
            buttonHandleClick={() => this._goTo('single')}
          />

          {/* <FormContactUs /> */}
          <Card
            rounded
            border
            type="icon"
            icon="amenitie-storeRoom"
            icon2="amenitie-storeRoom"
            title="Multiple spaces"
            description="Best option for listing multiple spaces with same address. <separate> TIP: Talk with one of our account managers"
            buttonText="Contact us"
            buttonHandleClick={() => this._goTo('multiple')}
          />
        </WrapperStyled>
      </Wrapper>
    )
  }
}

export default IntroPage
