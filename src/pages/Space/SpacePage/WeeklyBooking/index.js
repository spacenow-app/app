import React from 'react'
import PropTypes from 'prop-types'

import { DatePicker, Select, PriceDetail, Grid } from 'components'

function spelling(reference) {
  let label = 'Week'
  if (reference > 1) label = 'Weeks'
  return label
}

const WeeklyBooking = props => {
  const { date, onDateChange, listingExceptionDates, closingDays, handleChangePeriod, period, listingData } = props

  const dates = [{ key: 0, value: 0, name: 'Choose a Period' }]

  for (let i = props.listingData.minTerm; i < 13; i++) {
    dates.push({ key: i, value: i, name: `${i} ${spelling(i)}` })
  }
  return (
    <Grid columns={1} rowGap="40px">
      <Grid columns={1} rowGap="10px">
        <DatePicker
          label="Start Day"
          value={date}
          handleDateChange={onDateChange}
          dayPickerProps={{
            modifiers: {
              disabled: [
                ...listingExceptionDates.map(el => new Date(el)),
                {
                  daysOfWeek: closingDays
                },
                {
                  before: new Date()
                }
              ]
            }
          }}
        />
        <Select label="Period" options={dates} handleChange={handleChangePeriod} value={period} />
      </Grid>
      <PriceDetail
        periodLabel={spelling(period)}
        price={listingData.basePrice}
        isAbsorvedFee={listingData.isAbsorvedFee}
        days={period}
        quantity={1}
      />
    </Grid>
  )
}

WeeklyBooking.defaultProps = {
  date: '',
  period: 1
}

WeeklyBooking.propTypes = {
  date: PropTypes.any,
  period: PropTypes.number,
  listingData: PropTypes.instanceOf(Object).isRequired
}

export default WeeklyBooking
