import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { color, border } from 'styled-system'
import propTypes from '@styled-system/prop-types'

const LabelStyled = styled.span`
  min-width: 125px;
  height: min-content;
  width: max-content;
  padding: 10px;
  text-align: center;
  font-weight: 700;
  align-self: ${props => props.align};
  justify-self: ${props => props.justify};
  ${color}
  ${border}
`

const Label = ({ children, align, justify, ...props }) => (
  <LabelStyled {...props} align={align} justify={justify}>
    {children}
  </LabelStyled>
)

Label.defaultProps = {
  align: 'center',
  justify: 'center',
  bg: 'greyLight',
  color: 'greyscale.2',
  borderRadius: '8px'
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  align: PropTypes.string,
  justify: PropTypes.string,
  ...propTypes.color,
  ...propTypes.border,
  ...propTypes.bg
}

export default Label
