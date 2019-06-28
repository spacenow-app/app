import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

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

const PriceDetail = props => (
  <WrapperStyled>
    <ContentStyled>
      <LeftTitleStyled>Description</LeftTitleStyled>
      <RightTitleStyled>Value ({`${props.currency} ${props.currencySymbol}`})</RightTitleStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>{`${props.currency} ${props.currencySymbol} ${props.price.toFixed(2)} x ${props.days} ${
        props.periodLabel
      }`}</LeftStyled>
      <RightStyled>{`${props.currency} ${props.currencySymbol}${props.totalDays.toFixed(2)}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Quantity x{props.quantity}</LeftStyled>
      <RightStyled>{`${props.currency} ${props.currencySymbol}${props.totalDays.toFixed(2)}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Service fee</LeftStyled>
      <RightStyled>{`${props.currency} ${props.currencySymbol}${(
        props.price *
        props.days *
        props.quantity *
        props.guestServiceFee
      ).toFixed(2)}`}</RightStyled>
    </ContentStyled>
    <ContentStyled>
      <LeftStyled>Total</LeftStyled>
      <RightStyled>{`${props.currency} ${props.currencySymbol}${props.total.toFixed(2)}`}</RightStyled>
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
