import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { color } from 'styled-system'

const SpanStyled = styled.div`
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  justify-items: center;
  display: grid;
  min-width: 110px;
  grid-column-gap: 10px;
  padding: 10px;
  width: fit-content;
  ${props =>
    props.icon &&
    css`
      grid-template-columns: 20px 1fr;
    `}
  ${color};
`

const TextStyled = styled.span`
  font-family: 'Montserrat-Medium';
  font-size: 12px;
  align-self: center;
`

const Tag = ({ icon, children }) => (
  <SpanStyled icon={icon}>
    {icon && icon}
    <TextStyled>{children}</TextStyled>
  </SpanStyled>
)

Tag.defaultProps = {
  icon: null,
  color: 'quartenary',
  bg: 'white'
}

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  icon: PropTypes.element
}

export default Tag
