import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from 'components'

const ContainerStyled = styled.span`
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
`

const Price = ({ currency, currencySymbol, price, bookingPeriod, bookingType, size, ...props }) => {
  return (
    <ContainerStyled {...props}>
      {bookingType !== 'poa' ? (
        <Text fontSize={size} fontFamily="bold" {...props}>
          {`${currency} ${currencySymbol}${(Math.round((price || 0) * 100) / 100)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} `}
          <TextStyled {...props}>{bookingPeriod || ''}</TextStyled>
        </Text>
      ) : (
        <Text fontSize={size} fontFamily="bold">
          POA
        </Text>
      )}
    </ContainerStyled>
  )
}

Price.defaultProps = {
  currency: 'EUR',
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
  lightPeriod: PropTypes.bool
}

export default Price
