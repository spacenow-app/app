import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TimeField from 'react-simple-timefield'

const InputStyled = styled.input`
  text-align: center;
  width: 100%;
  position: relative;
  display: inline-block;
  /* padding: 4px 7px; */
  height: 28px;
  cursor: text;
  font-size: 16px;
  line-height: 1.5;
  color: #172439;
  background-color: #fff;
  background-image: none;
  border: none;
  transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  :focus {
    outline: none;
  }
`

const TimePicker = ({ value, disabled, ...props }) => {
  return <TimeField {...props} value={value} input={<InputStyled />} disabled={disabled} />
}

TimePicker.defaultProps = {
  value: null,
  disabled: false
}

TimePicker.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool
}

export default TimePicker
