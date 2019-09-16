import React, { Component } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { Wrapper, Card, Title } from 'components'
// import FormContactUs from './FormContactUs'

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px;

  @media (max-width: 680px) {
    grid-template-columns: auto;
  }
`

class IntroPage extends Component {
  _goTo = type => {
    if (type === 'multiple') {
      window.location.href = `/become-a-host`
      return
    }
    this.props.history.push('/listing/location')
  }

  render() {
    return (
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow" />
        <Title
          type="h3"
          title="Are you creating a single space or managing multiple?"
          subtitle="We’ve created two listing options for quicker space management. If you are only listing one space please select single space. If you have more than one, ie a meeting room, car park and office space please select the multiple spaces."
        />
        <WrapperStyled>
          <Card
            border
            rounded
            type="icon"
            icon="single-space"
            title="Single Space"
            description="If you’re only listing one space this is for you. Ie. a single car space, meeting room, event space, or storage area.<separate>TIP: If you’re a coworking space please use the multiple spaces link to the right."
            buttonText="Create"
            buttonHandleClick={() => this._goTo('single')}
          />

          {/* <FormContactUs /> */}
          <Card
            rounded
            border
            type="icon"
            icon="multiple-space"
            title="Multiple spaces"
            description="If you're listing more than one or 2 spaces, please contact us and we will be happy to help get everything set up on your behalf – get ready for the smoothest on boarding ever."
            buttonText="Contact Us"
            buttonHandleClick={() => this._openModal('multiple')}
          />
        </WrapperStyled>
      </Wrapper>
    )
  }
}

export default IntroPage
