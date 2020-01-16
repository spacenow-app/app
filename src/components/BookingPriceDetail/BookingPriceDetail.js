import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Box, Text } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 4px;
  font-size: ${props => props.fontSize};
  margin: 0 0 35px 0;
  ${space}
  line-height: 1.5;
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
`

const RightStyled = styled.span`
  // align-self: center;
  justify-self: end;
`

const BookingPriceDetail = props => (
  <>
    {props.total && (
      <WrapperStyled {...props}>
        {!props.noHeader && (
          <ContentStyled>
            <LeftTitleStyled>Description</LeftTitleStyled>
            <RightTitleStyled>Value ({`${props.currency} ${props.currencySymbol}`})</RightTitleStyled>
          </ContentStyled>
        )}
        <ContentStyled>
          <LeftStyled>{`x ${props.days} ${props.periodLabel}`}</LeftStyled>
          <RightStyled>{`${props.currency} ${props.currencySymbol}${props.valuePerQuantity
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</RightStyled>
        </ContentStyled>

        {props.valueDiscount > 0 && (
          <ContentStyled>
            <LeftStyled>
              Promo code
              {props.valueVoucher > 0 && (
                <span>
                  <br /> {props.valueVoucher}% discount
                </span>
              )}
            </LeftStyled>
            <RightStyled>(${props.valueDiscount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')})</RightStyled>
          </ContentStyled>
        )}
        <ContentStyled>
          <LeftStyled>Service fee</LeftStyled>
          <RightStyled>
            {`${props.currency} ${props.currencySymbol}${props.valueFee
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
          </RightStyled>
        </ContentStyled>

        {props.dividerTotal && <Box width="100%" borderBottom="1px solid #c4c4c4" mt="40px" mb="15px" />}
        <ContentStyled>
          <LeftStyled>
            <Text fontFamily="Montserrat-Medium" fontSize={props.totalSize}>
              Total
            </Text>
          </LeftStyled>
          <RightStyled>
            <Text fontFamily="Montserrat-Medium" fontSize={props.totalSize}>{`${props.currency} ${
              props.currencySymbol
            } ${props.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Text>
          </RightStyled>
        </ContentStyled>
      </WrapperStyled>
    )}
  </>
)

BookingPriceDetail.defaultProps = {
  currency: 'AUD',
  currencySymbol: '$',
  valuePerQuantity: 0,
  valueFee: 0,
  valueVoucher: 0,
  valueDiscount: 0,
  total: 0,
  days: 1,
  periodLabel: 'Day',
  dividerTotal: false,
  totalSize: '16px',
  fontSize: '14px'
}

BookingPriceDetail.propTypes = {
  currency: PropTypes.string,
  currencySymbol: PropTypes.string,
  valuePerQuantity: PropTypes.number,
  valueFee: PropTypes.number,
  valueVoucher: PropTypes.number,
  valueDiscount: PropTypes.number,
  total: PropTypes.number,
  days: PropTypes.number,
  periodLabel: PropTypes.string,
  dividerTotal: PropTypes.bool,
  noHeader: PropTypes.bool,
  totalSize: PropTypes.string,
  fontSize: PropTypes.string
}

export default BookingPriceDetail
