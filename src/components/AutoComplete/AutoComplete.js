import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { Input } from 'components'

const Box = styled.div`
  border-radius: 27px;
  padding: 15px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
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
    background-color: #f7f7f7;
    border-radius: 20px;
  }
`

const AutoComplete = props => {
  const _handleOnSelect = async address => {
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
        address: addressSeparate.length <= 1 ? addressSeparate[0] : addressSeparate[1]
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
      shouldFetchSuggestions={props.address.length > 2}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Input
            {...getInputProps({
              size: props.size,
              label: props.label,
              placeholder: props.placeholder,
              loading,
              disabled: props.disabled,
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
  label: 'Address or Business name',
  placeholder: 'Type address or business name.'
}

AutoComplete.propTypes = {
  children: PropTypes.element
}

export default AutoComplete
