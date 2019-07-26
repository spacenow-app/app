import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Wrapper, Title, StepButtons, Input, Map, AutoComplete } from 'components'

import * as actions from 'redux/ducks/location'

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-column-gap: 20px;
  width: 80%;
`

const LocationPage = props => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(state => state.location)
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})

  const _onSelectedAddess = obj => {
    const { unit, position, address } = obj
    if (unit || unit === '') {
      setUnit(unit)
    }
    if (position) {
      setLatLng(position)
    }
    if (address) {
      setAddress(address)
    }
  }

  const _onHandleError = () => {
    setLatLng({})
  }

  const _reset = () => {
    setUnit('')
    setLatLng({})
    setAddress('')
  }

  const _onNext = () => {
    dispatch(actions.onGetOrCreateLocation(address, props.history))
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default LocationPage
