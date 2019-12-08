import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import styled from 'styled-components'
import { Grid, Cell } from 'components'

const CheckInOutWraper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
`

const DateContainer = styled.div`
  padding: 10px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  font-size: 14px;
  font-family: Montserrat-Bold;
`

const TimeContainer = styled.div`
  padding: 10px;
  font-size: 14px;
  // text-align: center;
`

const CheckInOut = ({ checkIn, checkOut, checkInTime, checkOutTime, ...props }) => {
  const checkInMonth = format(new Date(checkIn), 'LLL')
    .toString()
    .toUpperCase()
  const checkInDay = format(new Date(checkIn), 'd')
  const checkInWeekday = format(new Date(checkIn), 'EEEE')

  const checkOutMonth = format(new Date(checkOut), 'LLL')
    .toString()
    .toUpperCase()
  const checkOutDay = format(new Date(checkOut), 'd')
  const checkOutWeekday = format(new Date(checkOut), 'EEEE')

  return (
    <CheckInOutWraper>
      <Grid columns={4}>
        <Cell width={1}>
          <DateContainer {...props}>
            {checkInMonth}
            <br />
            {checkInDay}
          </DateContainer>
        </Cell>
        <Cell width={3}>
          <TimeContainer>
            {`${checkInWeekday} check-in `}
            <br />
            {checkInTime}
          </TimeContainer>
        </Cell>
      </Grid>
      <Grid columns={4}>
        <Cell width={1}>
          <DateContainer {...props}>
            {checkOutMonth}
            <br />
            {checkOutDay}
          </DateContainer>
        </Cell>
        <Cell width={3}>
          <TimeContainer>
            {`${checkOutWeekday} check-out `}
            <br />
            {checkOutTime}
          </TimeContainer>
        </Cell>
      </Grid>
    </CheckInOutWraper>
  )
}

CheckInOut.defaultProps = {}

CheckInOut.propTypes = {
  checkIn: PropTypes.string.isRequired,
  checkOut: PropTypes.string.isRequired,
  checkInTime: PropTypes.string.isRequired,
  checkOutTime: PropTypes.string.isRequired
}

export default CheckInOut
