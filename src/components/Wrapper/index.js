import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const ContainerStyled = styled(Container)`
  &&& {
  }
`

const Wrapper = ({ children }) => {
  return <ContainerStyled>{children}</ContainerStyled>
}

export default Wrapper
