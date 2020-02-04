import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Title, StepButtons, Input, Map, AutoComplete, ProgressBar } from 'components'

const GroupInput = styled.div`
  display: grid;
  grid-template-columns: auto 200px;
  grid-gap: 20px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`

const AddressPage = ({ match, ...props }) => {

  const dispatch = useDispatch()
  const listingId = match.params.id

  const { isLoading, error } = useSelector(state => state.location)
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})

  const _onSelectedAddess = obj => {
    const { unit: objUnit, position, address: objAddress } = obj
    if (objUnit || objUnit === '') {
      setUnit(objUnit)
    }
    if (position) {
      setLatLng(position)
    }
    if (objAddress) {
      setAddress(objAddress)
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

  const _onNext = async () => {
    // await dispatch(actions.onGetOrCreateLocation(address, unit, props.history))
    props.history.push(`/listing-process/space/${listingId}/type`)
  }

  return (
    <Wrapper>
      <Helmet title="Listing Location - Spacenow" />
      <ProgressBar percent="5" />
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
        prev={{ disabled: false, onClick: () => props.history.replace(`/listing-process/step/${listingId}`) }}
        next={{
          disabled: !(latLng && (latLng.lat || latLng.lng)) || isLoading,
          onClick: _onNext,
          isLoading
        }}
      />
    </Wrapper>
  )
}

AddressPage.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
}

export default AddressPage
