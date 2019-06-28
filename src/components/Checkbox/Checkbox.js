import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  margin-top: -8px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? '#6ADC91' : '#fff')}
  border: 2px solid ${props => (props.checked ? '#6ADC91' : '#CBCBCB')};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #6ADC91;
    border: 2px solid #6ADC91;;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

const LabelStyled = styled.span`
  margin-left: 8px;
`

const Checkbox = ({ className, name, checked, label, handleCheckboxChange, ...props }) => (
  <label>
    <CheckboxContainer {...props} className={className}>
      <HiddenCheckbox
        name={name}
        checked={checked}
        onChange={e => handleCheckboxChange(e, { checked: !e.target.checked, name })}
      />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
    {label && <LabelStyled>{label}</LabelStyled>}
  </label>
)

Checkbox.defaultProps = {
  checked: false,
  label: false
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func.isRequired
}

export default Checkbox
