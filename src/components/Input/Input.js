import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { border, color } from 'styled-system'

const sizeStyle = {
  sm: css`
    padding: 10px 20px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 37px;
    height: 42px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 37px;
    height: 54px;
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
  text-align: left;
`

const InputStyled = styled.input`
  display: block;
  width: 100%;
  color: rgb(33, 37, 41);
  background-color: ${props => (props.error ? 'rgba(224, 82, 82, 0.1);' : '#ffffff')};
  border-width: 1px;
  border-color: ${props => (props.error ? '#e05252' : '#ebebeb')};
  border-style: solid;
  transition: color 0.2s ease-in-out 0s, border-style 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s,
    visibility 0.2s ease-in-out 0s, background 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s,
    text-decoration 0.2s ease-in-out 0s, box-shadow 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s,
    opacity 0.2s ease-in-out 0s;

  ${props => props.size && sizeStyle[props.size] && sizeStyle[props.size]};

  :focus {
    outline: 0px;
    box-shadow: 0 0 0 0.2rem ${props => (props.error ? 'rgba(224, 82, 82, 0.5)' : 'rgba(106, 220, 145, 0.5)')};
    border-color: ${props => (props.error ? '#e05252' : '#6adc91')};
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${border}
  ${color}
`

const Label = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

const RightContent = styled.div`
  position: absolute;
  right: 20px;
  top: ${props => (props.size === 'sm' ? '28%' : '57%')};

  ${props =>
    props.closeButton &&
    css`
      right: 1%;
      top: ${props.size === 'sm' ? '12%' : '49%'};
    `}

  @media only screen and (max-width: 600px) {
    right: 3%;
  }
`

const LoaderIcon = styled.i`
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;

  ::after,
  ::before {
    content: '';
    background: white;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-color: #6adc91 #6adc91 transparent transparent;
    border-style: solid;
    border-radius: 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    animation: around 0.7s ease-in-out infinite;
  }

  @keyframes around {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Button = styled.button`
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  outline: none;
  text-align: center;
  font-weight: bold;
  padding: 2px;
  position: relative;
  height: 32px;
  width: 32px;
  display: inline-block;
  background-color: #e2e2e2;
  color: white;
  font-size: 14px;
  outline: none;

  :hover {
    cursor: pointer;
    background-color: #707070;
  }
`

const ErrorMessage = styled.small`
  color: #e05252;
  margin-left: 20px;
`

const Input = ({ size, label, error, loading, closeButton, onClickCloseButton, ...props }) => {
  return (
    <WrapperInput>
      {label && <Label>{label}</Label>}
      <InputStyled {...props} size={size} error={error} />
      {(loading || closeButton) && (
        <RightContent size={size} closeButton={closeButton}>
          {loading && <LoaderIcon />}
          {closeButton && <Button onClick={onClickCloseButton}>x</Button>}
        </RightContent>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </WrapperInput>
  )
}

Input.defaultProps = {
  size: 'md',
  label: null
}

Input.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string
}

export default Input
