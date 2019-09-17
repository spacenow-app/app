import React from 'react'
import styled from 'styled-components'

const TabStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  justify-content: center;
  grid-gap: 30px;
  margin: 20px 0px;

  @media only screen and (max-width: 600px) {
    font-size: 12px;
    grid-gap: 15px;
  }

`

const Tab = props => {
  return <TabStyled>{props.children}</TabStyled>
}

export default Tab
