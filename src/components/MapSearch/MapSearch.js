import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap } from 'react-google-maps'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

import { Price } from 'components'

import defaultMapStyle from './default_map_style.json'


const MapSearch = withGoogleMap(props => {

  var bounds = new window.google.maps.LatLngBounds();

  return (
    <GoogleMap
      defaultZoom={12}
      center={{ lat: parseFloat(props.position.lat), lng: parseFloat(props.position.lng) }}
      defaultCenter={{ lat: parseFloat(props.position.lat), lng: parseFloat(props.position.lng) }}
      defaultOptions={{
        maxZoom: 18,
        streetViewControl: true,
        mapTypeControl: false,
        styles: props.styles,
        scrollwheel: false
      }}
      fitBounds={bounds}
    >
      {props.markers &&
        props.markers.map(marker => {
          const pos = { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }
          bounds.extend(pos)
          return(
          <>
            <MarkerWithLabel
              key={marker.id}
              position={pos}
              onClick={() => {
                props.onClickMarker(marker)
              }}
              defaultIcon=" "
              raiseOnDrag={true}
              labelAnchor={{ x: 55, y: 40 }}
              children={
                <Price
                  key={`price-${marker.id}`}
                  currency={marker.currency}
                  price={marker.price}
                  currencySymbol="$"
                  bookingPeriod={marker.bookingPeriod}
                  bookingType={marker.bookingType}
                  size="12px"
                />
              }
              zIndex={props.selectedMarker && props.selectedMarker.id === marker.id ? 2 : 1}
              labelStyle={{
                backgroundColor: props.selectedMarker
                  ? props.selectedMarker.id === marker.id
                    ? '#6adc91'
                    : '#ffffff'
                  : '#ffffff',
                fontSize: '16px',
                padding: '8px 14px',
                borderRadius: '50px',
                color: props.selectedMarker
                  ? props.selectedMarker.id === marker.id
                    ? '#ffffff'
                    : '#172439'
                  : '#172439',
                border: '1px solid #CBCBCB',
                fontFamily: 'Montserrat-Bold'
              }}
            />
          </>
          )
        })}
    </GoogleMap>
  )
})

MapSearch.defaultProps = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  position: { lat: -33.8, lng: 151.2 },
  styles: defaultMapStyle
}

MapSearch.propTypes = {
  markers: PropTypes.instanceOf(Array),
  onClickMarker: PropTypes.func,
  selectedMarker: PropTypes.shape({
    id: PropTypes.number,
    lat: PropTypes.number,
    lng: PropTypes.number,
    photo: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    period: PropTypes.string,
    host: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string
    })
  })
}

const comparisonFn = (prevProps, nextProps) => {
  if (!(prevProps.markers === nextProps.markers)) {
    return false
  }
  if (!(prevProps.position === nextProps.position)) {
    return false
  }
  return prevProps.selectedMarker === nextProps.selectedMarker
}

export default memo(MapSearch, comparisonFn)
