import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { layout, color, typography, position } from 'styled-system'

const TextStyled = styled.span`
${layout}
${color}
${typography}
${position}
`

const Text = ({ children, ...props }) => <TextStyled {...props}>{children}</TextStyled>

Text.defaultProps = {}

Text.propTypes = {
  children: PropTypes.element.isRequired
}

export default Text
