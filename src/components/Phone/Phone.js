import React from 'react'
import styled from 'styled-components'
import { layout, color, typography, position, space, flexbox } from 'styled-system'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const PhoneI = styled(PhoneInput)`
  display: block;
  cursor: text;
  width: 100%;
  color: rgb(33,37,41);
  background-color: #fefefe;
  border-width: 1px;
  border-color: #cacaca;
  border-style: solid;
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 8px;
  height: 54px;
  .react-phone-number-input__icon {
    height: 22px;
    border: none
  }
  input {
    border: none;
    background: transparent;
  }
  ${layout}
  ${color}
  ${typography}
  ${position}
  ${space}
  ${flexbox}
`

const WrapperInput = styled.div`
  position: relative;
  text-align: left;
`

const Label = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

const ErrorMessage = styled.small`
  color: #e05252;
  margin-left: 20px;
`

const Phone = ({...props }) => (
  <WrapperInput>
    {props.label && <Label>{props.label}</Label>}
    <PhoneI {...props} />
    {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
  </WrapperInput>
)


export default Phone