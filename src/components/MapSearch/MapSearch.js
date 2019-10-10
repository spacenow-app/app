import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withGoogleMap, GoogleMap, InfoWindow, Children } from 'react-google-maps'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import { Avatar, Price } from 'components'
import defaultMapStyle from './default_map_style.json'

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 10px;
  height: 100px;
  margin-right: 20px;
  min-width: 350px;

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
  margin-left: -1px;
  cursor: pointer;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 245px;
`

const CardContentTextPrice = styled.span`
  display: block;
  font-size: 14px;
  font-family: 'MontSerrat-Medium';
`

const CardContentPrice = styled.span`
  font-family: 'MontSerrat-Bold';
`

const CardContentUser = styled.div`
  display: flex;
`

const CardContentUserTitle = styled.span`
  font-size: 12px;
  font-family: 'MontSerrat-Medium';
  margin-left: 5px;
`

const MapSearch = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={15}
      center={{ lat: parseFloat(props.position.lat), lng: parseFloat(props.position.lng) }}
      defaultCenter={{ lat: parseFloat(props.position.lat), lng: parseFloat(props.position.lng) }}
      defaultOptions={{
        maxZoom: 18,
        streetViewControl: true,
        mapTypeControl: false,
        styles: props.styles,
        scrollwheel: false
      }}
    >
      {props.markers &&
        props.markers.map(marker => (
          <>
            <MarkerWithLabel
              key={marker.id}
              position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
              onClick={() => {
                props.onClickMarker(marker)
              }}
              defaultIcon=" "
              labelAnchor={{ x: 55, y: 40 }}
              children={
                <Price
                  key={`price-${marker.id}`}
                  currency={marker.currency}
                  price={marker.price}
                  currencySymbol="$"
                  bookingPeriod={marker.bookingPeriod}
                  bookingType={marker.bookingType}
                  size="16px"
                />
              }
              labelStyle={{
                backgroundColor: 'white',
                fontSize: '16px',
                padding: '8px 14px',
                borderRadius: '50px',
                color: '#172439',
                border: '1px solid #CBCBCB',
                fontFamily: 'Montserrat-Bold'
              }}
            />
          </>
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
            <CardImage
              src={props.selectedMarker.photo}
              onClick={() => props.history.push(`/space/${props.selectedMarker.id}`)}
            />
            <CardContent>
              <CardContentTitle>{props.selectedMarker.title}</CardContentTitle>
              <CardContentTextPrice>
                From <CardContentPrice>{props.selectedMarker.price}</CardContentPrice> {props.selectedMarker.period}
              </CardContentTextPrice>
              <CardContentUser>
                <Avatar width="30px" height="30px" image={props.selectedMarker.host.photo} />
                <CardContentUserTitle>{props.selectedMarker.host.name}</CardContentUserTitle>
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
