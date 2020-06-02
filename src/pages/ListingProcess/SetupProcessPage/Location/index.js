import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Box, Wrapper, Title, StepButtons, Input, Map, AutoComplete } from 'components'

import { onPostLocation, onCleanLocation } from 'redux/ducks/listing-process'

const LocationPage = ({ listing, values, handleChange, handleBlur, setFieldValue, setFieldTouched, ...props }) => {
  const [address, setAddress] = useState('')
  const [unit, setUnit] = useState('')
  const [latLng, setLatLng] = useState({})
  const [placeId, setGPlaceId] = useState('')

  const dispatch = useDispatch()
  const { object: location, isLoading, error } = useSelector(state => state.listing_process.location)

  useEffect(() => {
    props.setFatherValues(values)
    listing.locationId !== values.locationId &&
      props.history.push(`/listing-process/setup-process/${listing.id}/basics/space-type`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  useEffect(() => {
    if (location) {
      setFieldValue('locationId', location.id)
      dispatch(onCleanLocation())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const _handleNext = () => {
    props.setStepCompleted('step1')
    dispatch(onPostLocation({ address, unit, placeId }))
  }

  const _onSelectedAddess = obj => {
    const { unit: objUnit, position, address: objAddress, placeId: objPlaceId } = obj
    if (objUnit || objUnit === '') {
      setUnit(objUnit)
    }
    if (position) {
      setLatLng(position)
    }
    if (objAddress) {
      setAddress(objAddress)
    }
    if (objPlaceId) {
      setGPlaceId(objPlaceId)
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

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Location" />
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
            onClick: () => _handleNext(),
            isLoading
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_LocationForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      locationId: listing.locationId || null
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

LocationPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(LocationPage)
