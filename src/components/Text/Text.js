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
`

const Text = ({ children, ...props }) => <TextStyled {...props}>{children}</TextStyled>

Text.defaultProps = {
  color: 'quartenary'
}

Text.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Array),
    PropTypes.element
  ]).isRequired
}

export default Text
