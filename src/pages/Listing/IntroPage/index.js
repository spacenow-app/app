import React, { Component } from 'react'
import styled from 'styled-components'
import { Wrapper, Card, Title } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;
`

class IntroPage extends Component {
  _goTo = type => {
    if (type === 'multiple') {
      window.location.href = 'https://www.spacenow.com/become-a-host'
      return
    }
    this.props.history.push('/listing/location')
  }

  render() {
    return (
      <Wrapper>
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
            description="If you’re only listing one space this is for you. Ie. a single car space, meeting room, event space, or storage area. TIP: If you’re a coworking space please use the multiple spaces link to the right."
            buttonText="Create"
            buttonHandleClick={() => this._goTo('single')}
          />
          <Card
            rounded
            border
            type="icon"
            icon="multiple-space"
            title="Multiple spaces"
            description="If you’re listing a couple of spaces or several this option is for you. Ie. an office space, meeting room, and a car spot. TIP: If you have more than 20 please contact us."
            buttonText="Create Spaces"
            buttonHandleClick={() => this._goTo('multiple')}
          />
        </WrapperStyled>
      </Wrapper>
    )
  }
}

export default IntroPage
