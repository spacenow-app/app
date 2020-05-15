/* eslint-disable no-console */
import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoComplete, Button as ButtonExternal } from 'components' //'pages/SearchFrame/node_modules/components'
import { Form } from 'react-bootstrap'

const Button = styled(ButtonExternal)`
  &&& {
    width: 100%;
  }
`

const Label = styled(Form.Label)`
  font-size: 12px;
  font-family: Montserrat-SemiBold;
`

const SearchFrame = ({ history, shownSearch, ...props }) => {
  const [address, setAddress] = useState('')
  const [latLng, setLatLng] = useState({})
  const [category, setCategory] = useState('')

  const _onHandleError = e => console.error(e)

  const _onSelectedAddess = obj => {
    const { position, address: objAddress } = obj

    if (position) setLatLng(position)
    if (objAddress) setAddress(objAddress)
  }

  const handleSubmit = e => {
    window.open(`/search?lat=${latLng.lat}&lng=${latLng.lng}&category=${category}&location=${address}&page=1`);
  }

  const _reset = () => {
    setLatLng({})
    setAddress('')
  }

  document.body.style = 'background: transparent;'

  return (
    <>
    <style type="text/css">
    {`
    .form-search-frame {
      height: 54px;
      box-shadow: none !important
    }

    .form-search-frame: focus {
      border:1px solid: #6adc91
    }
    `}
    </style>
      <Form>
        <Form.Group>
          <Label>Where:</Label>
            <AutoComplete
              searchOptions={{
                types: ['geocode']
              }}
              address={address}
              onChangeAddress={setAddress}
              onSelectedAddess={_onSelectedAddess}
              onHandleError={_onHandleError}
              onClickCloseButton={_reset}
              placeholder="Ie. Sydney, AU"
              size="md"
              style={{"box-shadow": "none"}}
              name="address"
              label={null}
            />
        </Form.Group>
        <Form.Group controlId="spaceType">
          <Label>I need a:</Label>
          <Form.Control as="select" size="sm" className="form-search-frame" onChange={ (e) => setCategory(e.target.value)}>
            <option disabled="" hidden="">Type of space</option>
            <option value="kitchen">Kitchen</option>
            <option value="eventSpace">Event Space</option>
            <option value="meetingSpace">Meeting Rooms</option>
            <option value="workspace">Work Space </option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit} block>
          Search
        </Button>
      </Form>
    </>
  )
}

export default SearchFrame