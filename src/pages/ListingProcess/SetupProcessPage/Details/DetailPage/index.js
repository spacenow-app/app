import React from 'react'
import { Wrapper, Box, Title, StepButtons, Input, TextArea, Checkbox, Select } from 'components'

const DetailPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box>
        <Title
          type="h3"
          title="Title"
          subtitle="Your title sets the scene. Make it short, powerful and identify someone’s need for it."
          subTitleMargin="10px"
        />
        <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto' }} gridGap="30px">
          <Input placeholder="e.g. Car park 100m walk to Central Station" />
        </Box>
      </Box>
      <Box>
        <Title type="h3" title="Description" subtitle="Sell 'em the dream." subTitleMargin="10px" />
        <TextArea placeholder="Description" />
      </Box>
      <Box>
        <Title
          type="h3"
          title="Directions"
          subtitle="Give guest any instructions for arriving, access or parking."
          subTitleMargin="10px"
        />
        <TextArea placeholder="This helps guest find spaces that aren’t easy to find" />
      </Box>
      <Box>
        <Title type="h3" title="Transport" subtitle="Tick options within a 10 minute walk." subTitleMargin="10px" />
        <Box display="grid" gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }} gridGap="30px">
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
        </Box>
      </Box>
      <Box>
        <Title
          type="h3"
          title="Wifi"
          subtitle="Wifi username and password only sent to guest after the booking is successful"
          subTitleMargin="10px"
        />
        <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
          <Select>
            <option>Select wifi speed</option>
            <option>hola</option>
          </Select>
          <Input placeholder="Wifi user name" />
          <Input placeholder="Wifi password" />
        </Box>
      </Box>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('feature') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('amenities')
          // isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default DetailPage
