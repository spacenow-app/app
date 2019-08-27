import React from 'react'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import default_map_style from './default_map_style.json'
import mapPinIcon from './spacenow_logo_pin.png'

const MapSearch = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={16}
      center={props.position}
      defaultCenter={props.position}
      defaultOptions={{
        scrollwheel: false,
        maxZoom: 18,
        // minZoom: 14,
        streetViewControl: false,
        mapTypeControl: false,
        styles: props.styles
      }}
    >
      {props.markers && (
        <MarkerClusterer onClick={props.onMarkerClustererClick} averageCenter enableRetinaIcons gridSize={60}>
          {props.markers.map(marker => (
            // <Marker key={marker.photo_id} position={{ lat: marker.lat, lng: marker.lng }} />
            // <MarkerWithLabel
            //   key={marker.photo_id}
            //   position={{ lat: marker.lat, lng: marker.lng }}
            //   labelAnchor={new window.google.maps.Point(0, 0)}
            //   labelStyle={{ backgroundColor: 'yellow', fontSize: '32px', padding: '16px' }}
            // >
            //   <div>Hello There!</div>
            // </MarkerWithLabel>
            <Marker
              key={marker.photo_id}
              position={{ lat: marker.lat, lng: marker.lng }}
              title="teste"
              shape={{
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
              }}
            >
              {/* <InfoWindow>{mapPinIcon}</InfoWindow> */}
            </Marker>
          ))}
        </MarkerClusterer>
      )}

      {props.isMarkerShown && (
        <Marker
          position={props.position}
          icon={{
            url: mapPinIcon
          }}
        />
      )}
    </GoogleMap>
  )
})

MapSearch.defaultProps = {
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `450px`, margin: `50px 0` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  position: { lat: -33.8, lng: 151.2 },
  styles: default_map_style,
  isMarkerShown: true
}

MapSearch.propTypes = {
  children: PropTypes.element
}

export default MapSearch
