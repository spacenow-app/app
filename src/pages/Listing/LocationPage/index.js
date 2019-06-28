import React, { Component } from 'react'
import { Wrapper, Title, StepButtons } from '../../../components'

class LocationPage extends Component {
  render() {
    return (
      <Wrapper>
        <Title type="h3" title="Location" />
        <input />
        <StepButtons
          prev={{ disabled: false, onClick: () => this.props.history.goBack() }}
          next={{ disabled: false, onClick: () => this.props.history.push('/listing/category') }}
        />
      </Wrapper>
    )
  }
}

export default LocationPage
