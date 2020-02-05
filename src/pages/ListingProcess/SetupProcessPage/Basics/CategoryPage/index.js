import React from 'react'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox } from 'components'

const CategoryPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Title
            type="h3"
            title="Primary use for the space"
            subtitle="Select the primary use for your pace."
            subTitleMargin="10px"
          />
          <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
            <Select name="category">
              <option value="">Event Space</option>
              <option value="">Meeting Room</option>
              <option value="">Event Space</option>
              <option value="">Meeting Room</option>
            </Select>
          </Box>
        </Box>
        <Box>
          <Title
            type="h3"
            title="Activities"
            subtitle="What activities are welcome in your space"
            subTitleMargin="10px"
          />
          <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
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
          </Box>
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.replace('space-type') }}
          next={{
            // disabled: !location,
            onClick: () => props.history.replace('specification')
            // isLoading: isLoadingCreating
          }}
        />
      </Box>
    </Wrapper>
  )
}

export default CategoryPage
