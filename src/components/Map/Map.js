import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import default_map_style from './default_map_style.json'
import mapPinIcon from './spacenow_logo_pin.png'

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    center={props.position}
    defaultCenter={props.position}
    defaultOptions={{
      scrollwheel: false,
      maxZoom: 18,
      minZoom: 14,
      streetViewControl: false,
      mapTypeControl: false,
      styles: props.styles
    }}
  >
    <Marker
      position={props.position}
      icon={{
        url: mapPinIcon
      }}
    />
  </GoogleMap>
))

Map.defaultProps = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `450px`, margin: `50px 0` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  position: { lat: -33.86882, lng: 151.20929 },
  styles: default_map_style
}

Map.propTypes = {
  children: PropTypes.element
}

export default Map
