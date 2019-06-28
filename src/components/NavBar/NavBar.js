import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import logo from './spacenow_logo.png'

function NavBar() {
  return (
    <Navbar>
      <Navbar.Brand href="#home">
        <img alt="" src={logo} width={230} className="d-inline-block align-top" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="#home">List Your Space</Nav.Link>
          <Nav.Link href="#link">Help</Nav.Link>
          <NavDropdown title="Usuario_Name" id="basic-nav-dropdown">
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
