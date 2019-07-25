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
  return (
    <Navbar>
      <Link onClick={_handlerGoToLegancy}>
        <Navbar.Brand>
          <img alt="" src={logo} width={230} className="d-inline-block align-top" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link as={Link} to="/listing">
            List Your Space
          </Nav.Link>
          <Nav.Link href="">Help</Nav.Link>
          <NavDropdown title={authUser.firstName} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
