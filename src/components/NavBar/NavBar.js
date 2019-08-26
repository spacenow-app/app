import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

function NavBar() {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const _handlerGoToLegancy = () => {
    window.location.href = `${config.legacy}`
  }
  const _handlerLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar>
      <Link to="" onClick={_handlerGoToLegancy}>
        <Navbar.Brand>
          <img alt="" src={logo} width={230} className="d-inline-block align-top" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      {isAuthenticated && (
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdownStyled
              alignRight
              title={
                <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="10px" color="quartenary">
                  <span style={{ alignSelf: 'center' }}>{authUser.profile.firstName || 'User Profile'}</span>
                  <Avatar style={{ width: '30px', height: '30px' }} image={authUser.profile.picture || null} />
                </Box>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href={`${config.legacy}/dashboard/profile`}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`${config.legacy}/dashboard`}>Dashboard</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={_handlerLogout}>Logout</NavDropdown.Item>
            </NavDropdownStyled>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  )
}

export default NavBar
