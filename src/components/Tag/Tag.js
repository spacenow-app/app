import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const SpanStyled = styled.div`
  justify-self: center;
  align-self: center;
  background-color: #fff;
  border: 1px solid #cbcbcb;
  border-radius: 8px;
  padding: 2px 10px;
  margin-right: 10px;

  color: ${props => props.theme.badge.textColor};

  ${props =>
    props.icon &&
    css`
      display: inline-flex;
    `}
`

const TextStyled = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 2.5;
`

const Tag = ({ theme, icon, text }) => (
  <SpanStyled theme={theme} icon={icon}>
    {icon && icon}
    <TextStyled text={text}>{text}</TextStyled>
  </SpanStyled>
)

Tag.defaultProps = {
  icon: null,
  text: ' '
}

Tag.propTypes = {
  theme: PropTypes.instanceOf(Object),
  icon: PropTypes.object,
  text: PropTypes.string
}

export default Tag
