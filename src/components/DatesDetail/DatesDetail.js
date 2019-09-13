import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Box } from 'components'
import { format } from 'date-fns'
import { convertedDate } from 'utils/date'

const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`

const LeftTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  justify-self: start;
  font-size: 14px;
`

const RightTitleStyled = styled.span`
  font-family: 'Montserrat-Bold';
  font-size: 14px;
  justify-self: ${props => (props.alignLeft ? 'end' : 'start')};
`

const LeftStyled = styled.span`
  justify-self: start;
`

const RightStyled = styled.span`
  justify-self: ${props => (props.alignLeft ? 'end' : 'start')};
`

function spelling(periodType, reference) {
  let label = 'Day'
  switch (periodType) {
    case 'weekly':
      label = 'Week'
      break
    case 'monthly':
      label = 'Month'
      break
    default:
      label = 'Day'
  }
  if (reference > 1) label = `${label}s`
  return label
}

const DatesDetail = ({ startDate, endDate, period, priceType, ...props }) => {
  return (
    <Grid columns={1} rows={2} rowGap="20px">
      <Box>
        <LeftTitleStyled>Period</LeftTitleStyled>
        <br />
        <LeftStyled>{`${period} ${spelling(priceType, period)}`}</LeftStyled>
      </Box>
      <Box>
        <ContentStyled>
          <LeftTitleStyled>Start date</LeftTitleStyled>
          <RightTitleStyled {...props}>End date</RightTitleStyled>
        </ContentStyled>
        <ContentStyled>
          <LeftStyled>{format(convertedDate(startDate), 'dd/MM/yyyy')}</LeftStyled>
          <RightStyled {...props}>{format(convertedDate(endDate), 'dd/MM/yyyy')}</RightStyled>
        </ContentStyled>
      </Box>
    </Grid>
  )
}

DatesDetail.defaultProps = {
  alignLeft: false
}

DatesDetail.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  period: PropTypes.number.isRequired,
  priceType: PropTypes.string.isRequired,
  alignLeft: PropTypes.bool
}

export default DatesDetail
