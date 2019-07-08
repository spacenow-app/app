import React from 'react'
import styled from 'styled-components'

const TabStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  justify-content: center;
  grid-column-gap: 30px;
  margin: 20px 0px;
`

const Tab = props => {
  return <TabStyled>{props.children}</TabStyled>
}

export default Tab
