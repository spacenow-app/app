import React from 'react'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox, Input } from 'components'

const SpecificationPage = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box display="grid" gridGap="30px">
        <Box>
          <Title type="h3" title="Capacity and seating" />
          <Box>
            <Input label="Maximum number of guests." placeholder="Ie. 200" />
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
          <Box>
            <Checkbox
              key={1}
              label="Cocktail"
              name="amenities"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            {/* <Image src=""/> */}
            <Box ml="25px">
              <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
              <Input placeholder="Ie. 200" />
            </Box>
          </Box>
          <Box>
            <Checkbox
              key={1}
              label="Banquet"
              name="amenities"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            {/* <Image src=""/> */}
            <Box ml="25px">
              <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
              <Input placeholder="Ie. 180" />
            </Box>
          </Box>
          <Box>
            <Checkbox
              key={1}
              label="Theatre"
              name="amenities"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            {/* <Image src=""/> */}
            <Box ml="25px">
              <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
              <Input placeholder="Ie. 180" />
            </Box>
          </Box>
          <Box>
            <Checkbox
              key={1}
              label="Classroom"
              name="amenities"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            {/* <Image src=""/> */}
            <Box ml="25px">
              <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
              <Input placeholder="Ie. 180" />
            </Box>
          </Box>
          <Box>
            <Checkbox
              key={1}
              label="Boardroom"
              name="amenities"
              value=""
              checked
              mediumLabel
              // handleCheckboxChange={_handleCheckboxChange}
            />
            <Box ml="25px">
              <Box bg="#F7F7F7" width="100%" height="93px" my="10px" borderRadius="10px" />
              <Input placeholder="Ie. 180" />
            </Box>
          </Box>
        </Box>
        <Box>
          <Title type="h3" title="Alcohol licence" />
          <Select name="alcohol">
            <option value="">Please select</option>
            <option value="">Licenced</option>
            <option value="">No licenced</option>
            <option value="">BYO</option>
          </Select>
        </Box>
        <StepButtons
          prev={{
            disabled: false,
            onClick: () => props.history.replace(`/listing-process/setup-process/${listing.id}/basics`)
          }}
          next={{
            // disabled: !location,
            onClick: () => props.history.replace('feature')
            // isLoading: isLoadingCreating
          }}
        />
      </Box>
    </Wrapper>
  )
}

export default SpecificationPage
