import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Grid, Cell, Select, Checkbox } from 'components'

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const CategoryTab = props => {
  return (
    <>
      <Title
        type="h3"
        title="Primary use for the space"
        subtitle="Select the primary use for your pace."
        subTitleMargin="10px"
      />
      <Grid columns={3}>
        <Cell width={1}>
          <Select name="category">
            <option value="">Event Space</option>
            <option value="">Meeting Room</option>
            <option value="">Event Space</option>
            <option value="">Meeting Room</option>
          </Select>
        </Cell>
      </Grid>
      <br />
      <Title type="h3" title="Activities" subtitle="What activities are welcome in your space" subTitleMargin="10px" />
      <CheckboxGroup>
        <Checkbox
          key={1}
          label="All events."
          subtitle="You’ll be found for all event searches and requests to match."
          name="amenities"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="All events."
          subtitle="You’ll be found for all event searches and requests to match."
          name="amenities"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="All events."
          subtitle="You’ll be found for all event searches and requests to match."
          name="amenities"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="All events."
          subtitle="You’ll be found for all event searches and requests to match."
          name="amenities"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
      </CheckboxGroup>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/type') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/specification')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default CategoryTab
