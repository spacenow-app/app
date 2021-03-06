import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckBoxWrapper = styled.div`
  position: relative;
`

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 22px;
  border-radius: 15px;
  background: #cbcbcb;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 2px;
    background: #ffffff;
    transition: 0.2s;
  }
`

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 22px;
  &:checked + ${CheckBoxLabel} {
    background: #6adc91;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 22px;
      transition: 0.2s;
    }
  }
`

const Switch = ({ name, checked, handleCheckboxChange, disabled }) => {
  return (
    <CheckBoxWrapper>
      <CheckBox
        id={`checkbox-${name}`}
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={e => handleCheckboxChange(e, { checked: e.target.checked, name })}
      />
      <CheckBoxLabel htmlFor={`checkbox-${name}`} disabled={disabled} />
    </CheckBoxWrapper>
  )
}

Switch.defaultProps = {}

Switch.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Switch
