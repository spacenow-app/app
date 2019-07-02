import React, { Component } from 'react'
import { Wrapper, Title, StepButtons } from 'components'

class CategoryPage extends Component {
  render() {
    const { props } = this
    return (
      <Wrapper>
        <Title
          type="h3"
          title="Choose one category"
          subtitle="To list a space you’ll need to put it in the right category. The icons below all have categories drop down once selected. You can click on several to find the right category for your space."
        />

        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.goBack() }}
          next={{ disabled: false, onClick: () => props.history.push('/listing/category') }}
        />
      </Wrapper>
    )
  }
}

export default CategoryPage
