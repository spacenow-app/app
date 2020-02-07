import React from 'react'
import { Wrapper, Box, Title, StepButtons, Select, Input, Icon, Text, Checkbox } from 'components'

const PricingPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Title
            type="h3"
            title="Let your guests book right away"
            subtitle="Allow your guests to book instantly or ask them to send a request first."
            subTitleMargin="10px"
          />
        </Box>
        <Box display="grid" gridGap="30px">
          <Box>
            <Box borderBottom="1px solid #CBCBCB">
              <Icon name="category-venue" width="44px" />
              <Text verticalAlign="bottom">Event space</Text>
            </Box>
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto auto' }} gridGap="30px">
            <Input placeholder="$" label="Hourly rate" />
            <Select label="Minimum hours">
              <option>Select</option>
            </Select>
            <Input placeholder="$" label="Full day rate" />
            <Input placeholder="$" label="Peak day rate" />
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
            <Checkbox label="Price includes GST" />
            <Checkbox label="Show as starting price (From $x..)" checked />
          </Box>
        </Box>
        <StepButtons
          prev={{
            disabled: false,
            onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/scene`)
          }}
          next={{
            onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/access`)
          }}
        />
      </Box>
    </Wrapper>
  )
}

export default PricingPage
