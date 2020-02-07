import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Wrapper, Title, StepButtons, Input, Map, AutoComplete } from 'components'

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: auto 200px;
  grid-gap: 20px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const LocationPage = ({ match, listing, ...props }) => {
  const { isLoading, error } = useSelector(state => state.location)
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})
  const [, setGPlaceId] = useState('')

  const _onSelectedAddess = obj => {
    const { unit: objUnit, position, address: objAddress, placeId } = obj
    if (objUnit || objUnit === '') {
      setUnit(objUnit)
    }
    if (position) {
      setLatLng(position)
    }
    if (objAddress) {
      setAddress(objAddress)
    }
    if (placeId) {
      setGPlaceId(placeId)
    }
    props.setFatherValues({ ...listing, location: { address: objAddress, unit: objUnit, placeId } })
  }

  const _onHandleError = () => {
    setLatLng({})
  }

  const _reset = () => {
    setUnit('')
    setLatLng({})
    setAddress('')
    setGPlaceId('')
  }

  return (
    <Wrapper>
      <Helmet title="Listing Location - Spacenow" />
      <Title type="h3" title="Location" />
      <GroupInput>
        <AutoComplete
          address={address}
          onChangeAddress={setAddress}
          onHandleError={_onHandleError}
          onSelectedAddess={_onSelectedAddess}
          disabled={latLng && (latLng.lat || latLng.lng)}
          closeButton={latLng && (latLng.lat || latLng.lng)}
          onClickCloseButton={_reset}
        />
        {latLng && (latLng.lat || latLng.lng) && (
          <Input label="Unit" placeholder="E.g 128" value={unit} onChange={e => setUnit(e.target.value)} />
        )}
      </GroupInput>
      {error.message && <div className="text-danger">{error.message}</div>}
      {latLng && latLng.lat && latLng.lng && <Map position={latLng} />}
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.push(`steps`) }}
        next={{
          disabled: !(latLng && (latLng.lat || latLng.lng)) || isLoading,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/basics`),
          isLoading
        }}
      />
    </Wrapper>
  )
}

LocationPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  listing: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired
}

export default LocationPage
