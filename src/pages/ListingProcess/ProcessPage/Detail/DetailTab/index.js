import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Input, TextArea, Checkbox, Grid, Cell, Select } from 'components'

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 40px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const DetailTab = props => {
  return (
    <>
      <Title
        type="h3"
        title="Title"
        subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
        subTitleMargin="10px"
      />
      <Grid columns={12}>
        <Cell width={8}>
          <Input placeholder="e.g. Car park 100m walk to Central Station" />
        </Cell>
      </Grid>
      <Title type="h3" title="Description" subtitle="Sell 'em the dream." subTitleMargin="10px" />
      <TextArea placeholder="Description" />
      <Title
        type="h3"
        title="Directions"
        subtitle="Give guest any instructions for arriving, access or parking."
        subTitleMargin="10px"
      />
      <TextArea placeholder="This helps guest find spaces that aren’t easy to find" />
      <Title type="h3" title="Transport" subtitle="Tick options within a 10 minute walk." subTitleMargin="10px" />
      <CheckboxGroup>
        <Checkbox
          key={1}
          label="Bus"
          name="transport"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Train"
          name="transport"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Tram/light rail"
          name="transport"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
        <Checkbox
          key={1}
          label="Ferry"
          name="transport"
          value=""
          checked
          mediumLabel
          // handleCheckboxChange={_handleCheckboxChange}
        />
      </CheckboxGroup>
      <Title
        type="h3"
        title="Wifi"
        subtitle="Wifi username and password only sent to guest after the booking is successful"
        subTitleMargin="10px"
      />
      <Grid columns={12}>
        <Cell width={3}>
          <Select>
            <option>Select wifi speed</option>
            <option>hola</option>
          </Select>
        </Cell>
        <Cell width={3}>
          <Input placeholder="Wifi user name" />
        </Cell>
        <Cell width={3}>
          <Input placeholder="Wifi password" />
        </Cell>
      </Grid>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/feature') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/amenities')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default DetailTab
