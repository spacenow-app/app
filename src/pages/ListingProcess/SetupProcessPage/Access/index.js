import React from 'react'
import { Wrapper, Box, Title, StepButtons, Select, Text } from 'components'

const AccessPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Box>
            <Title
              type="h3"
              title="Let your guests book right away"
              subtitle="Allow your guests to book instantly or ask them to send a request first."
              subTitleMargin={10}
            />
          </Box>
          <Box display="grid" gridGap="10px">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select>
                <option>Select guest booking</option>
              </Select>
            </Box>
            <Box display="grid">
              <Text>TIP: If you want to let a guest book any free date instantly, select the instant option.</Text>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title type="h3" title="What time can guests check-in between?" />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select label="From">
                <option>Start:</option>
              </Select>
              <Select label="To">
                <option>To:</option>
              </Select>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title type="h3" title="What time do guests need to check-out?" />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select label="Check-out:">
                <option>Check-out:</option>
              </Select>
            </Box>
          </Box>
        </Box>

        <Box>
          <Box>
            <Title
              type="h3"
              title="Access information"
              subtitle="Select the way guests will gain access to your space."
              subTitleMargin={10}
            />
          </Box>
          <Box display="grid">
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: '1fr 1fr 1fr' }} gridGap="30px">
              <Select>
                <option>Select category type</option>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/scene`)
        }}
        next={{
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/opening-hours`)
        }}
      />
    </Wrapper>
  )
}

export default AccessPage
