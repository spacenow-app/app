import React from 'react'
import styled from 'styled-components'
import { Title, StepButtons, Checkbox, Radio } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 20px;

  @media (max-width: 680px) {
    grid-row-gap: 15px;
  }
`

const SectionStyled = styled.div``

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 50%;
  @media (max-width: 680px) {
    width: 100%;
  }
`

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
  }
`

const FeatureTab = props => {
  return (
    <WrapperStyled>
      <SectionStyled>
        <Title type="h3" title="Style of space" subtitle="What style best describes the space?" subTitleMargin="10px" />
        <RadioGroup>
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
        </RadioGroup>
      </SectionStyled>
      <SectionStyled>
        <Title
          type="h3"
          title="Features of the space"
          subtitle="What style best describes the space?"
          subTitleMargin="10px"
        />
        <CheckboxGroup>
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
        </CheckboxGroup>
      </SectionStyled>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing-process/space/357/specification') }}
        next={{
          // disabled: !location,
          onClick: () => props.history.replace('/listing-process/space/357/detail')
          // isLoading: isLoadingCreating
        }}
      />
    </WrapperStyled>
  )
}

export default FeatureTab
