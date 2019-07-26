import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { config } from 'contants'

import logo from './spacenow_logo.png'

function NavBar() {
  const authUser = useSelector(state => state.auth.user)
  const _handlerGoToLegancy = () => {
    window.location.href = `${config.legacy}`
  }
  const _handlerLogout = () => {
    window.location.href = `${config.legacy}/logout`
  }
  return (
    <Navbar>
      <Link to='' onClick={_handlerGoToLegancy}>
        <Navbar.Brand>
          <img alt="" src={logo} width={230} className="d-inline-block align-top" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown alignRight title={authUser.firstName} id="basic-nav-dropdown">
            <NavDropdown.Item href={`${config.legacy}/dashboard/profile`}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={`${config.legacy}/dashboard`}>Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={_handlerLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
