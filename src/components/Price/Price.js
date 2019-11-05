import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from 'components'

const ContainerStyled = styled.span`
  font-family: ${props => (props.lightPrice ? 'Montserrat-SemiBold' : 'Montserrat-Bold')}};
  display: grid;
  line-heigh: 1;
  text-align: ${props => {
    if (props.right) return 'end'
    return 'start'
  }};

  @media screen and (max-width: 991px) {
    text-align: start;
  }
`

const TextStyled = styled(Text)`
  font-family: ${props => {
    if (props.lightPeriod) return 'Montserrat-Regular'
  }};
  font-size: ${props => (props.periodSize ? props.periodSize : props.size)};
`

const Price = ({ currency, currencySymbol, price, bookingPeriod, bookingType, size, ...props }) => {
  return (
    <ContainerStyled {...props}>
      {bookingType !== 'poa' ? (
        <Text fontSize={size} {...props}>
          {`${currency || ''} ${currencySymbol}${(Math.round((price || 0) * 100) / 100).toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} `}
          <TextStyled {...props}>{bookingPeriod || ''}</TextStyled>
        </Text>
      ) : (
        <Text fontSize={size}>POA</Text>
      )}
    </ContainerStyled>
  )
}

Price.defaultProps = {
  currencySymbol: '$',
  price: 0,
  size: '28px'
}

Price.propTypes = {
  currency: PropTypes.string,
  currencySymbol: PropTypes.string,
  price: PropTypes.number,
  bookingPeriod: PropTypes.string,
  bookingType: PropTypes.string.isRequired,
  size: PropTypes.string,
  right: PropTypes.bool,
  lightPeriod: PropTypes.bool,
  lightPrice: PropTypes.bool
}

export default Price
