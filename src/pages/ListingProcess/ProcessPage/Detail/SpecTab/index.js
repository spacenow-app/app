import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Select, Box, Checkbox, Input } from 'components'

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
`

const SpecTab = props => {
  return (
    <>
      <Title type="h3" title="Capacity and seating" />
      <CheckboxGroup>
        <Box mb="40px">
          <Input label="Maximum number of guests." placeholder="Ie. 200" />
        </Box>
      </CheckboxGroup>
      <CheckboxGroup>
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
      </CheckboxGroup>
      <br />
      <Title type="h3" title="Alcohol licence" />
      <CheckboxGroup>
        <Select name="alcohol">
          <option value="">Please select</option>
          <option value="">Licenced</option>
          <option value="">No licenced</option>
          <option value="">BYO</option>
        </Select>
      </CheckboxGroup>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/category') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/feature')
          // isLoading: isLoadingCreating
        }}
      />
    </>
  )
}

export default SpecTab
