import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import arrowSVG from './arrow.svg'

const SelectStyled = styled.select`
  padding: 10px;
  padding-left: 20px;
  border: 2px solid #ececec;
  border-radius: 50px;
  height: 50px;
  margin: 15px 0;
  background-position: 94% 50%;
  background-image: url(${arrowSVG}) !important;
  background-repeat: no-repeat;
  background-size: 20px 20px !important;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-shadow: none;
  color: #707070;
  background-color: ${props => (props.bgColor ? props.bgColor : '#ebebeb')};
  font-weight: 600;
  line-height: 24px;
  font-size: 14px;

  :focus {
    outline: none !important;
    border: 2px solid #6adc91;
  }
`

const Select = props => {
  if (props.children) {
    return (
      <SelectStyled {...props} value={props.value} onChange={props.handleChange}>
        {props.children}
      </SelectStyled>
    )
  }
  return (
    <SelectStyled {...props} value={props.value} onChange={props.handleChange}>
      {props.options.map(item => (
        <option key={item.key} value={item.value}>
          {item.name}
        </option>
      ))}
    </SelectStyled>
  )
}

Select.defaultProps = {
  children: null,
  options: [{ key: 0, value: 0, name: '' }],
  value: null,
  bgColor: null,
  handleChange: null
}

Select.propTypes = {
  children: PropTypes.element,
  options: PropTypes.instanceOf(Array),
  bgColor: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func
}

export default Select
