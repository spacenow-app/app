/* eslint-disable no-console */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Avatar, Box, AutoComplete, Text } from 'components'
import { logout } from 'redux/ducks/auth'

import { config } from 'variables'

import logo from './spacenow_logo.png'

const NavStyled = styled(Nav)`
  align-items: center;

  @media only screen and (max-width: 600px) {
    align-items: initial;
  }
`

const NavDropdownStyled = styled(NavDropdown)`
  &&& {
    .dropdown-toggle::after {
      display: none;
    }

    @media only screen and (max-width: 600px) {
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
  align-items: center;

  :hover {
    color: #51c482;
    text-decoration: none;
  }

  @media only screen and (max-width: 600px) {
    align-items: initial;
    border-bottom: 1px solid #ececec;
  }
`

const LinkStyled = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #172439;
  text-decoration: none;
  align-items: center;

  :hover {
    color: #51c482;
    text-decoration: none;
  }

  @media only screen and (max-width: 600px) {
    align-items: initial;
    border-bottom: 1px solid #ececec;
  }
`

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 20px;
  width: 714px;
  padding: 0 5px;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    width: 100%;
    margin-bottom: 10px;
    padding: 0;
    margin: 15px 0px;
  }
`

const NavBar = ({ history, shownSearch, ...props }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.account.get)
  const { isAuthenticated } = useSelector(state => state.auth)
  const [address, setAddress] = useState('')
  const [, setLatLng] = useState({})

  const _handlerGoToLegancy = (page = false) => {
    window.location.href = `${config.static}/${page || ''}`
  }
  const _handlerLogout = () => {
    dispatch(logout())
  }

  const _onHandleError = e => console.error(e)

  const _onSelectedAddess = obj => {
    const { position, address: objAddress } = obj

    if (position) setLatLng(position)
    if (objAddress) setAddress(objAddress)

    _onSearch(position.lat, position.lng, objAddress)
  }

  const _reset = () => {
    setLatLng({})
    setAddress('')
  }

  const _onSearch = (lat, lng, addr) => {
    history.push({
      pathname: '/search',
      search: `?lat=${lat}&lng=${lng}&location=${addr}&page=1`
    })
  }

  return (
    <Navbar expand="lg">
      <Link to="#" onClick={() => _handlerGoToLegancy()}>
        <Navbar.Brand>
          <img alt="" src={logo} width={200} className="d-inline-block align-top" />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="top-navbar-nav" />
      {shownSearch && (
        <SearchBar>
          <AutoComplete
            searchOptions={{
              types: ['geocode']
            }}
            address={address}
            onChangeAddress={setAddress}
            onHandleError={_onHandleError}
            onSelectedAddess={_onSelectedAddess}
            // disabled={latLng && (latLng.lat || latLng.lng)}
            // closeButton={latLng && (latLng.lat || latLng.lng)}
            onClickCloseButton={_reset}
            size="sm"
            placeholder="Ie. Sydney, AU"
            label={null}
          />
          {/* <Button size="sm" onClick={_onSearch}>
            Search
          </Button> */}
        </SearchBar>
      )}
      <Navbar.Collapse className="justify-content-end" id="top-navbar-nav">
        <NavStyled>
          {isAuthenticated && (
            <Box
              display={{ _: 'flex', small: 'none' }}
              color="quartenary"
              borderBottom="1px solid #ececec"
              alignItems="center"
              p="0.5rem"
            >
              <Avatar style={{ width: '30px', height: '30px', margin: 0 }} image={user.profile.picture} />
              <Text ml="10px">{user.profile.firstName || 'User Profile'}</Text>
            </Box>
          )}
          <NavLinkStyled to="/listing">List your space</NavLinkStyled>
          <NavLinkStyled to="#" onClick={() => _handlerGoToLegancy('help')}>
            Help
          </NavLinkStyled>
          {!isAuthenticated ? (
            <>
              <LinkStyled to={{ pathname: '/auth/signin', from: props.location }}>Sign In</LinkStyled>
              <LinkStyled to={{ pathname: '/auth/signup', from: props.location }}>Sign Up</LinkStyled>
            </>
          ) : (
            <>
              <Box display={{ _: 'block', small: 'none' }}>
                <NavLinkStyled to="/account/profile">Profile</NavLinkStyled>
                <NavLinkStyled to="/account/listing">Dashboard</NavLinkStyled>
                <NavLinkStyled to="#" onClick={_handlerLogout}>
                  Logout
                </NavLinkStyled>
              </Box>
              <NavDropdownStyled
                alignRight
                title={
                  <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="10px" color="quartenary">
                    <span style={{ alignSelf: 'center' }}>{user.profile.firstName || 'User Profile'}</span>
                    <Avatar style={{ width: '30px', height: '30px' }} image={user.profile.picture} />
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
            </>
          )}
        </NavStyled>
      </Navbar.Collapse>
    </Navbar>
  )
}

NavBar.propTypes = {
  shownSearch: PropTypes.bool,
  history: PropTypes.instanceOf(Object)
}

export default NavBar
