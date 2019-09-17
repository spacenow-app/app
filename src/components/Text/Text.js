import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { layout, color, typography, position, space, flexbox } from 'styled-system'

const TextStyled = styled.span`
${layout}
${color}
${typography}
${position}
${space}
${flexbox}
${props =>
  props.width
    ? `
    display: inline-block;
    width: ${props.width};
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  `
    : 'width: auto'}
`

const Text = ({ children, ...props }) => <TextStyled {...props}>{children}</TextStyled>

Text.defaultProps = {
  color: 'quartenary',
  width: 'auto'
}

Text.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Array),
    PropTypes.element
  ]).isRequired,
  width: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default Text
