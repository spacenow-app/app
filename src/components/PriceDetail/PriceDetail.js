import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 8px;
  font-size: 14px;
  margin: 0 0 35px 0;
`

const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
`

const LeftTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  align-self: center;
  justify-self: start;
`

const LeftStyled = styled.span`
  align-self: center;
  justify-self: start;
`

const RightTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  align-self: center;
  justify-self: end;
  font-weight: 700;
`

const RightStyled = styled.span`
  font-family: 'Montserrat-Bold';
  align-self: center;
  justify-self: end;
  font-weight: 700;
`

const PriceDetail = ({
  currency,
  currencySymbol,
  price,
  totalDays,
  periodLabel,
  days,
  quantity,
  guestServiceFee,
  total,
  ...props
}) => (
  <WrapperStyled>
    <ContentStyled>
      <LeftTitleStyled>Description</LeftTitleStyled>
      <RightTitleStyled>Value ({`${currency} ${currencySymbol}`})</RightTitleStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>{`${currency} ${currencySymbol} ${price.toFixed(2)} x ${days} ${periodLabel}`}</LeftStyled>
      <RightStyled>{`${currency} ${currencySymbol}${totalDays.toFixed(2)}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Quantity x{quantity}</LeftStyled>
      <RightStyled>{`${currency} ${currencySymbol}${totalDays.toFixed(2)}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Service fee</LeftStyled>
      <RightStyled>{`${currency} ${currencySymbol}${(price * days * quantity * guestServiceFee).toFixed(
        2
      )}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Total</LeftStyled>
      <RightStyled>{`${currency} ${currencySymbol}${total.toFixed(2)}`}</RightStyled>
    </ContentStyled>
  </WrapperStyled>
)

PriceDetail.defaultProps = {
  currency: 'AUD',
  currencySymbol: '$',
  price: 0,
  days: 1,
  quantity: 1,
  guestServiceFee: 0.035,
  total: 0,
  totalDays: 0,
  periodLabel: 'Day'
}

PriceDetail.propTypes = {
  currency: PropTypes.string,
  currencySymbol: PropTypes.string,
  price: PropTypes.number,
  days: PropTypes.number,
  quantity: PropTypes.number,
  guestServiceFee: PropTypes.number,
  total: PropTypes.number,
  totalDays: PropTypes.number,
  periodLabel: PropTypes.string
}

export default PriceDetail
