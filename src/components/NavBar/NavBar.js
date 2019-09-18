import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Avatar, Box } from 'components'
import { logout } from 'redux/ducks/auth'

import { config } from 'variables'

import logo from './spacenow_logo.png'

const NavDropdownStyled = styled(NavDropdown)`
  &&& {
    .dropdown-toggle::after {
      display: none;
    }
  }
`

const DropdownItemStyled = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #172439;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  text-decoration: none;

  :hover {
    color: #172439;
    text-decoration: none;
    background-color: #f8f9fa;
  }

  :active {
    color: #fff;
    text-decoration: none;
    background-color: #51c482;
  }
`

const NavLinkStyled = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #172439;
  text-decoration: none;

  :hover {
    color: #51c482;
    text-decoration: none;
  }
`

const NavBar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.account.get)
  const { isAuthenticated } = useSelector(state => state.auth)

  const _handlerGoToLegancy = (page = false) => {
    window.location.href = `${config.static}/${page || ''}`
  }
  const _handlerLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar expand="lg">
      <Link to="#" onClick={() => _handlerGoToLegancy()}>
        <Navbar.Brand>
          <img alt="" src={logo} width={230} className="d-inline-block align-top" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="top-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="top-navbar-nav">
        <Nav style={{ alignItems: 'center' }}>
          <NavLinkStyled to="/listing">List Your Space</NavLinkStyled>
          <NavLinkStyled to="#" onClick={() => _handlerGoToLegancy('help')}>
            Help
          </NavLinkStyled>
          {!isAuthenticated ? (
            <>
              <NavLinkStyled to="/auth/signin">Sign In</NavLinkStyled>
              <NavLinkStyled to="/auth/signup">Sign Up</NavLinkStyled>
            </>
          ) : (
            <NavDropdownStyled
              alignRight
              title={
                <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="10px" color="quartenary">
                  <span style={{ alignSelf: 'center' }}>{user.profile.firstName || 'User Profile'}</span>
                  <Avatar style={{ width: '30px', height: '30px' }} image={user.profile.picture || null} />
                </Box>
              }
              id="basic-nav-dropdown"
            >
              <DropdownItemStyled to="/account/profile">Profile</DropdownItemStyled>
              <NavDropdown.Divider />
              <DropdownItemStyled to="/account/listing">Dashboard</DropdownItemStyled>
              <NavDropdown.Divider />
              <DropdownItemStyled to="#" onClick={_handlerLogout}>
                Logout
              </DropdownItemStyled>
            </NavDropdownStyled>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
