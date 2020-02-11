import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Helmet from 'react-helmet'
import { Box, Wrapper, Title, StepButtons, Input, Map, AutoComplete } from 'components'

import { onPostLocation } from 'redux/ducks/listing-process'

const LocationPage = ({ listing, values, handleChange, handleBlur, ...props }) => {
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})
  const [gPlaceId, setGPlaceId] = useState('')

  const dispatch = useDispatch()
  const { object: location, isLoading, error } = useSelector(state => state.listing_process.location)

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

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
    dispatch(onPostLocation({ address: objAddress, unit: objUnit, placeId }))
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
      <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto 280px' }} gridGap="30px">
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
      </Box>
      {error && error.message && <div className="text-danger">{error.message}</div>}
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

export default LocationPage
