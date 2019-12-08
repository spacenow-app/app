import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, size } from 'styled-system'

const SpanStyled = styled.div`
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  justify-items: center;
  align-items: center;
  display: grid;
  /* min-width: 110px; */
  grid-column-gap: 10px;
  padding: ${props => (props.small ? '5px 10px' : '10px')};
  background-color: ${props => props.bg && props.bg};
  width: fit-content;
  ${props =>
    props.icon &&
    css`
      grid-template-columns: 20px 1fr;
    `}
  ${color};
  ${size};
`

const TextStyled = styled.span`
  font-family: 'Montserrat-Medium';
  font-size: 12px;
  align-self: center;
  justify-self: start;
  line-height: 1.2;
`

const Tag = ({ icon, small, children, bg }) => (
  <SpanStyled icon={icon} small={small} bg={bg}>
    {icon && icon}
    <TextStyled>{children}</TextStyled>
  </SpanStyled>
)

Tag.defaultProps = {
  icon: null,
  color: 'quartenary',
  bg: 'white',
  small: false
}

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  icon: PropTypes.element,
  small: PropTypes.bool,
  color: PropTypes.string,
  bg: PropTypes.string
}

export default Tag
