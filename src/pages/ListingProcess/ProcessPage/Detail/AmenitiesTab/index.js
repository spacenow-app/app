import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Checkbox, Radio } from 'components'

const CheckboxGroupAmenities = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const CheckboxGroupRules = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const AmenitiesTab = props => {
  return (
    <>
      <Title
        type="h3"
        title="Amenities"
        subtitle="What amenities does your space offer guests?"
        subTitleMargin="10px"
      />
      <CheckboxGroupAmenities>
        <Checkbox
          key={1}
          label="24 hour access"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="24 hour access"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="24 hour access"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="24 hour access"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
      </CheckboxGroupAmenities>
      <br />
      <Title
        type="h3"
        title="Rules"
        subtitle="Tick any rules you’d like to highlight for your guests."
        subTitleMargin="10px"
      />
      <CheckboxGroupRules>
        <Checkbox
          key={1}
          label="Cleaning fees apply"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Cleaning fees apply"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Cleaning fees apply"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Cleaning fees apply"
          name="features"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
      </CheckboxGroupRules>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/detail') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/media')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default AmenitiesTab
