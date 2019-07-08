import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import arrowSVG from './arrow.svg'

const sizeStyle = {
  sm: css`
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 37px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 37px;
    height: 50px;
  `,
  lg: css`
    padding: 0.5rem 1rem;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 37px;
  `
}

const WrapperInput = styled.div`
  position: relative;
`

const SelectStyled = styled.select`
  display: inline-block;
  width: 100%;
  color: rgb(33, 37, 41);
  background-color: #fff;
  border-width: 1px;
  border-color: #ebebeb;
  border-style: solid;
  transition: color 0.2s ease-in-out 0s, border-style 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s,
    visibility 0.2s ease-in-out 0s, background 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s,
    text-decoration 0.2s ease-in-out 0s, box-shadow 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s,
    opacity 0.2s ease-in-out 0s;

  ${props => props.size && sizeStyle[props.size]};

  background-color: ${props => (props.bgColor ? props.bgColor : '#fff')};
  background-position: 94% 50%;
  background-image: url(${arrowSVG}) !important;
  background-repeat: no-repeat;
  background-size: 20px 20px !important;

  :focus {
    outline: 0px;
    box-shadow: 0 0 0 0.2rem rgba(106, 220, 145, 0.5);
    border-color: #6adc91;
  }

  box-shadow: none;
  -webkit-appearance: none;
  /* padding: 10px;
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
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-shadow: none;
  color: #707070;
  font-weight: 600;
  line-height: 24px;
  font-size: 14px;
  min-width: 350px; */
`

const Label = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

const Select = ({ label, children, value, size, ...props }) => {
  if (children) {
    return (
      <SelectStyled {...props} value={value}>
        {children}
      </SelectStyled>
    )
  }
  return (
    <WrapperInput>
      {label && <Label>{label}</Label>}
      <SelectStyled {...props} size={size} value={value}>
        {props.options.map(item => (
          <option key={item.key} value={item.value}>
            {item.name}
          </option>
        ))}
      </SelectStyled>
    </WrapperInput>
  )
}

Select.defaultProps = {
  size: 'md',
  children: null,
  options: [{ key: 0, value: 0, name: 'Select one option' }],
  value: null,
  bgColor: null
}

Select.propTypes = {
  children: PropTypes.element,
  options: PropTypes.instanceOf(Array),
  bgColor: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Select
