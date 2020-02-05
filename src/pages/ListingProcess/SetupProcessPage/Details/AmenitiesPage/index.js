import React from 'react'
import { Box, Wrapper, Title, StepButtons, Checkbox } from 'components'

const AmenitiesPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box>
        <Title
          type="h3"
          title="Amenities"
          subtitle="What amenities does your space offer guests?"
          subTitleMargin="10px"
        />
        <Box display="grid" gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }} gridGap="30px">
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
        </Box>
      </Box>
      <Box>
        <Title
          type="h3"
          title="Rules"
          subtitle="Tick any rules you’d like to highlight for your guests."
          subTitleMargin="10px"
        />
        <Box display="grid" gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }} gridGap="30px">
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
        </Box>
      </Box>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('detail') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace(`/listing-process/setup-process/${listing.id}/scene`)
          // isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default AmenitiesPage
