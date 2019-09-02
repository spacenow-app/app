import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import defaultMapStyle from './default_map_style.json'
import mapPinIcon from './spacenow_logo_pin.png'

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  height: 100px;
  margin-right: 20px;

  :before {
    content: ' ';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    position: absolute;
    top: -10px;
    left: 130px;
  }
`

const CardImage = styled.div`
  background-image: url(${props => props.src});
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
`

const CardContent = styled.div`
  line-height: 1.8rem;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CardContentTitle = styled.span`
  display: block;
  font-size: 16px;
  font-family: 'Montserrat-SemiBold';
`

const CardContentTextPrice = styled.span`
  display: block;
  font-size: 14px;
  font-family: 'MontSerrat-Medium';
`

const CardContentPrice = styled.span`
  font-family: 'MontSerrat-Bold';
`

const CardContentUser = styled.div``

const CardContentUserAvatar = styled.img`
  width: 30px;
  border-radius: 100%;
  border: 0.5px solid #ececec;
`

const CardContentUserTitle = styled.span`
  font-size: 12px;
  font-family: 'MontSerrat-Medium';
  margin-left: 5px;
`

const MapSearch = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={10}
      center={props.position}
      defaultCenter={props.position}
      defaultOptions={{
        maxZoom: 18,
        streetViewControl: true,
        mapTypeControl: false,
        styles: props.styles
      }}
    >
      {props.markers &&
        props.markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              props.onClickMarker(marker)
            }}
            icon={{
              url: mapPinIcon,
              scaledSize: new window.google.maps.Size(30, 35)
            }}
          />
        ))}

      {props.selectedMarker && (
        <InfoWindow
          onCloseClick={() => {
            props.onClickMarker(null)
          }}
          position={{
            lat: props.selectedMarker.lat,
            lng: props.selectedMarker.lng
          }}
        >
          <CardContainer>
            <CardImage src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            <CardContent>
              <CardContentTitle>Creative Space in Alexandria</CardContentTitle>
              <CardContentTextPrice>
                From <CardContentPrice>AU$3,000</CardContentPrice> Daily
              </CardContentTextPrice>
              <CardContentUser>
                <CardContentUserAvatar src="https://avatars3.githubusercontent.com/u/9704744?s=400&v=4" />
                <CardContentUserTitle>Bruno Valenga</CardContentUserTitle>
              </CardContentUser>
            </CardContent>
          </CardContainer>
        </InfoWindow>
      )}
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
  children: PropTypes.element
}

const comparisonFn = (prevProps, nextProps) => {
  if (!(prevProps.markers === nextProps.markers)) {
    return false
  }

  return prevProps.selectedMarker === nextProps.selectedMarker
}

export default memo(MapSearch, comparisonFn)
