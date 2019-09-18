import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { space, layout } from 'styled-system'

const ContainerStyled = styled(Container)`
  padding-right: 20px !important;
  padding-left: 20px !important;
  &&& {
    ${space}
    ${layout}
  }
`

const Wrapper = ({ children, ...props }) => {
  return <ContainerStyled {...props}>{children}</ContainerStyled>
}

export default Wrapper
