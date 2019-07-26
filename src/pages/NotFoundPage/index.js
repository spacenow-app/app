import React from 'react'
import styled from 'styled-components'
import { Box } from 'components'
import { ReactComponent as BackGround } from './bg.svg'

const TitleStyled = styled.h1`
  text-align: center;
`

const NotFoundPage = props => {
  return (
    <Box display="grid">
      <TitleStyled>Uh-oh!</TitleStyled>
      <Box width="100%" height="auto" maxWidth="100vh" justifySelf="center">
        <BackGround />
      </Box>
      <Box textAlign="center">
        <h3>ERROR CODE: 404</h3>
        <p>Path: {props.location.pathname}</p>
      </Box>
    </Box>
  )
}

export default NotFoundPage
