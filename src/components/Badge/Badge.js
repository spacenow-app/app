import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Text = styled.span``

const SpanStyled = styled.div`
  width: 35px;
  height: 35px;
  /* margin: 5px 5px; */
  background-color: red;
  display: flex;
  justify-content: center;
  align-self: center;
  align-items: center;
  text-transform: none;
  font-weight: 700;
  border: 0 solid transparent;
  border-radius: 100%;
  cursor: ${props => (props.handleClick ? 'pointer' : 'default')};
  background-color: #6adc91;
  border-color: #6adc91;
  color: #172439;

  ${props =>
    props.handleClick &&
    css`
      :hover {
        background-color: #172439;
        content: ' ';

        ${Text} {
          display: none;
        }
      }
    `}
`

const Icon = styled.svg`
  width: 20px;
  height: 20px;
  display: none;

  ${SpanStyled}:hover & {
    fill: #6adc91;
    display: block;
  }
`

const Badge = props => (
  <SpanStyled {...props} onClick={props.handleClick && (e => props.handleClick(e))}>
    <Text>{props.children}</Text>
    {props.handleClick && (
      <Icon viewBox="0 0 25 25" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(1 0)">
          <path
            d="M642.434,490.968h-4.4a3.107,3.107,0,0,0-2.954-2.615h-2.66a3.106,3.106,0,0,0-2.953,2.615h-4.538a1.776,1.776,0,0,0-1.774,1.774v.931a1.768,1.768,0,0,0,1.139,1.654l1.876,16.365a2.016,2.016,0,0,0,2.04,1.883H639.2a2.082,2.082,0,0,0,2.038-1.859l1.746-16.347a1.675,1.675,0,0,0,1.226-1.7v-.931A1.776,1.776,0,0,0,642.434,490.968Zm-10.018-.84h2.66a1.293,1.293,0,0,1,1.119.84h-4.9A1.293,1.293,0,0,1,632.417,490.128Zm7,21.357,0,.051c0,.2-.2.22-.265.22H628.207a.278.278,0,0,1-.268-.272l-1.849-16.037h15.177Zm3.012-17.813H624.928l0-.93h17.508Z"
            transform="translate(-623.152 -488.353)"
            fill="#6adc91"
          />
          <path
            d="M632.265,499.166a.8.8,0,0,0-.615-.135.955.955,0,0,0-.622.389.75.75,0,0,0-.141.55l.316,9.912a.919.919,0,0,0,.879.757h.081l.036-.006a.957.957,0,0,0,.629-.391.747.747,0,0,0,.141-.549l-.314-9.9A.949.949,0,0,0,632.265,499.166Z"
            transform="translate(-624.011 -489.54)"
            fill="#6adc91"
          />
          <path
            d="M638.143,499.034l-.087-.009a.98.98,0,0,0-.932.829l-.308,9.854a.979.979,0,0,0,.888.932.935.935,0,0,0,.888-.83l.307-9.853A.968.968,0,0,0,638.143,499.034Z"
            transform="translate(-624.672 -489.541)"
            fill="#6adc91"
          />
        </g>
      </Icon>
    )}
  </SpanStyled>
)

Badge.defaultProps = {
  rounded: false,
  handleClick: null,
  children: ''
}

Badge.propTypes = {
  rounded: PropTypes.bool,
  handleClick: PropTypes.func,
  children: PropTypes.string
}

export default Badge
