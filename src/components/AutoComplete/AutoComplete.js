import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { Input } from 'components'

const Box = styled.div`
  border-radius: 27px;
  padding: 15px;
  z-index: 10;
  position: absolute;
  background-color: #fff;
`

const BoxItem = styled.div`
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  padding: 15px;
  color: #172439;
  font-size: 14px;

  background-color: ${props => props.active && '#fafafa'};

  :hover {
    background-color: #ededed;
    border-radius: 20px;
  }
`

const AutoComplete = props => {
  const _handleOnSelect = async (address, placeId) => {
    try {
      const decode = await geocodeByAddress(address)
      const formattedAddress = decode[0].formatted_address
      const unit = decode[0].address_components.find(item => {
        return item.types[0] === 'subpremise'
      })
      const position = await getLatLng(decode[0])
      const addressSeparate = formattedAddress.split('/')

      props.onSelectedAddess({
        decode,
        formattedAddress,
        unit: unit ? unit.long_name : '',
        position,
        address: addressSeparate.length <= 1 ? addressSeparate[0] : addressSeparate[1],
        placeId
      })
    } catch (error) {
      props.onHandleError(error)
    }
  }

  return (
    <PlacesAutocomplete
      {...props}
      value={props.address}
      onChange={props.onChangeAddress}
      onSelect={_handleOnSelect}
      onError={props.onHandleError}
      shouldFetchSuggestions={props.address.length > 3}
      searchOptions={{
        location: new window.google.maps.LatLng(-34, 151),
        radius: 2000,
        // types: ['address'],
        componentRestrictions: { country: ['AU', 'AE'] }
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input
            {...getInputProps({
              size: props.size,
              label: props.label,
              placeholder: props.placeholder,
              loading,
              // disabled: props.disabled,
              // onFocus: props.onClickCloseButton
              closeButton: props.closeButton,
              onClickCloseButton: props.onClickCloseButton
            })}
          />
          {suggestions.length > 0 && (
            <Box>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                return (
                  <BoxItem active={suggestion.active} {...getSuggestionItemProps(suggestion)}>
                    <strong>{suggestion.formattedSuggestion.mainText}</strong>{' '}
                    <small>{suggestion.formattedSuggestion.secondaryText}</small>
                  </BoxItem>
                )
              })}
            </Box>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  )
}

AutoComplete.defaultProps = {
  children: null,
  label: 'Address',
  placeholder: 'Type address or business name.'
}

AutoComplete.propTypes = {
  children: PropTypes.element
}

export default AutoComplete
