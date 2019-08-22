import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkRouter } from 'react-router-dom'
import styled from 'styled-components'
import { color } from 'styled-system'

const Link = styled(LinkRouter)`
  ${color}

  :hover {
    ${color}
  }
`

Link.defaultProps = {
  color: 'secondary'
}

Link.propTypes = {}

export default Link
