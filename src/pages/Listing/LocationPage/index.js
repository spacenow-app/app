import React, { useState } from 'react'
import styled from 'styled-components'
import { Wrapper, Title, StepButtons, Input, Map, AutoComplete } from 'components'

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-column-gap: 20px;
  width: 80%;
`

const LocationPage = props => {
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})
  const [error, setError] = useState(null)

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
        <Input label="Unit" placeholder="E.g 128" value={unit} onChange={e => setUnit(e.target.value)} />
      </GroupInput>
      {latLng && latLng.lat && latLng.lng && <Map position={latLng} />}
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.goBack() }}
        next={{
          disabled: !(latLng && (latLng.lat || latLng.lng)),
          onClick: () => props.history.push('/listing/category')
        }}
      />
    </Wrapper>
  )
}

export default LocationPage
