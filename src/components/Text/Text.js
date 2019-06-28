import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const WrapperStyled = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  padding: ${props => props.padding};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  height: 50px;

  ${props =>
    props.rounded &&
    css`
      border-radius: 37px;
    `}
  @media (max-width: 680px) {
    font-size: 30px;
  }
`

const Text = props => (
  <WrapperStyled
    sm={props.sm}
    rounded={props.rounded}
    textColor={props.textColor}
    bgColor={props.backgroundColor}
    fontSize={props.fontSize}
    fontWeight={props.fontWeight}
    padding={props.padding}
  >
    {props.children}
  </WrapperStyled>
)

Text.defaultProps = {
  backgroundColor: 'transparent',
  textColor: '#1F252A',
  sm: true,
  rounded: true,
  fontSize: '14px',
  fontWeight: 'normal',
  padding: '15px'
}

Text.propTypes = {
  children: PropTypes.element.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  sm: PropTypes.bool,
  rounded: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  padding: PropTypes.string
}

export default Text
