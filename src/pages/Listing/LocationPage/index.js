import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { Wrapper, Title, StepButtons, Input, Map, AutoComplete, Footer } from 'components'

import * as actions from 'redux/ducks/location'

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-gap: 20px;
  width: 80%;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const LocationPage = props => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.location)
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})
  const [gPlaceId, setGPlaceId] = useState('')

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

  const _onNext = () => {
    dispatch(actions.onGetOrCreateLocation(address, unit, props.history, gPlaceId))
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
        prev={{ disabled: false, onClick: () => props.history.goBack() }}
        next={{
          disabled: !(latLng && (latLng.lat || latLng.lng)) || isLoading,
          onClick: _onNext,
          isLoading
        }}
      />
      <Footer />
    </Wrapper>
  )
}

export default LocationPage
