import React from 'react'
import { Wrapper, Box, Title, StepButtons, Checkbox, Radio } from 'components'

const FeatureTab = ({ listing, ...props }) => {
  return (
    <Wrapper>
      <Box>
        <Title type="h3" title="Style of space" subtitle="What style best describes the space?" subTitleMargin="10px" />
        <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
          <Radio
            value=""
            name="style"
            checked
            // handleChange={_handleRadioChange}
            label="Luxurious"
            mediumLabel
          />
          <Radio
            value=""
            name="style"
            checked
            // handleChange={_handleRadioChange}
            label="Luxurious"
            mediumLabel
          />
          <Radio
            value=""
            name="style"
            checked
            // handleChange={_handleRadioChange}
            label="Luxurious"
            mediumLabel
          />
        </Box>
      </Box>
      <Box>
        <Title
          type="h3"
          title="Features of the space"
          subtitle="What style best describes the space?"
          subTitleMargin="10px"
        />
        <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
          <Checkbox
            key={1}
            label="Cyc wall"
            name="features"
            value=""
            checked
            mediumLabel
            // handleCheckboxChange={_handleCheckboxChange}
          />
          <Checkbox
            key={1}
            label="Cyc wall"
            name="features"
            value=""
            checked
            mediumLabel
            // handleCheckboxChange={_handleCheckboxChange}
          />
          <Checkbox
            key={1}
            label="Cyc wall"
            name="features"
            value=""
            checked
            mediumLabel
            // handleCheckboxChange={_handleCheckboxChange}
          />
          <Checkbox
            key={1}
            label="Cyc wall"
            name="features"
            value=""
            checked
            mediumLabel
            // handleCheckboxChange={_handleCheckboxChange}
          />
          <Checkbox
            key={1}
            label="Cyc wall"
            name="features"
            value=""
            checked
            mediumLabel
            // handleCheckboxChange={_handleCheckboxChange}
          />
        </Box>
      </Box>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('specification') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('detail')
          // isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default FeatureTab
