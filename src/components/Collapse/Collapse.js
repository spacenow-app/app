import React from 'react'
import styled from 'styled-components'
import { Collapse as SpacenowCollapse } from 'react-bootstrap/Collapse'

const CollapseStyled = styled(SpacenowCollapse)`
`

const Collapse = props => {
  return <CollapseStyled {...props} />
}

export default Collapse
