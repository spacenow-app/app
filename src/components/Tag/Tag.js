import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color, size } from 'styled-system'

const SpanStyled = styled.div`
  border: ${props => (props.noBorder ? 'none' : '1px solid #c0c0c0')};
  border-radius: ${props => props.borderRadius && props.borderRadius};
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
  float: ${props => (props.right && 'right') || 'auto'};

  :hover {
    background-color: ${props => props.hover && props.hover};
  }
`

const TextStyled = styled.span`
  font-family: 'Montserrat-Medium';
  font-size: 12px;
  align-self: center;
  justify-self: start;
  line-height: 1.2;
`

const Tag = ({ icon, small, children, bg, noBorder, borderRadius, hover, right }) => (
  <SpanStyled
    icon={icon}
    small={small}
    bg={bg}
    noBorder={noBorder}
    borderRadius={borderRadius}
    hover={hover}
    right={right}
  >
    {icon && icon}
    <TextStyled>{children}</TextStyled>
  </SpanStyled>
)

Tag.defaultProps = {
  icon: null,
  color: 'quartenary',
  bg: 'white',
  small: false,
  noBorder: false,
  borderRadius: '8px',
  hover: 'auto',
  right: false
}

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  icon: PropTypes.element,
  small: PropTypes.bool,
  color: PropTypes.string,
  bg: PropTypes.string,
  noBorder: PropTypes.bool,
  borderRadius: PropTypes.string,
  hover: PropTypes.string,
  right: PropTypes.bool
}

export default Tag
