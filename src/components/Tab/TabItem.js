import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const TabItemStyled = styled.div`
  &&& {
    a {
      text-decoration: none;
    }
  }
`

const NavLinkStyled = styled(NavLink)`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  color: #cbcbcb;
  text-transform: uppercase;
`

const BarStyled = styled.div`
  width: 100%;
  height: 10px;
  background-color: #cbcbcb;
  border-radius: 10px;

  ${TabItemStyled}:hover &,
  ${NavLinkStyled}.active & {
    background-color: #6adc91;
  }
`

const TitleStyled = styled.span`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  color: #cbcbcb;
  text-transform: uppercase;

  ${TabItemStyled}:hover &,
  ${NavLinkStyled}.active & {
    color: #6adc91;
  }

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }

`

const TabItem = ({ children, nav, ...props }) => {
  if (nav) {
    return (
      <TabItemStyled>
        <NavLinkStyled {...props} activeClassName="active">
          <BarStyled />
          <TitleStyled>{children}</TitleStyled>
        </NavLinkStyled>
      </TabItemStyled>
    )
  }
  return (
    <TabItemStyled>
      <BarStyled />
      <TitleStyled>{children}</TitleStyled>
    </TabItemStyled>
  )
}

export default TabItem
