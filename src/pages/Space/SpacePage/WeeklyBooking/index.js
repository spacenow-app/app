import React, { useEffect, useState } from 'react'
import { withFormik } from 'formik'
// import PropTypes from 'prop-types'

import { DatePicker, Select, PriceDetail, Grid } from 'components'

function spelling(reference) {
  let label = 'Week'
  if (reference > 1) label = 'Weeks'
  return label
}

const WeeklyBooking = ({
  date,
  onDateChange,
  onDayPickerHide,
  listingExceptionDates,
  closingDays,
  handleChangePeriod,
  period,
  listingData,
  inputFocus
}) => {
  const dates = [{ key: 0, value: 0, name: 'Choose a Period' }]

  for (let i = listingData.minTerm; i < 13; i++) {
    dates.push({ key: i, value: i, name: `${i} ${spelling(i)}` })
  }

  const [dayPicker, setDayPicker] = useState('')
  useEffect(() => {
    if (dayPicker.input && inputFocus) dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  return (
    <>
      <Grid columns={1} rowGap="40px" style={{ marginBottom: '20px' }}>
        <Grid columns={1} rowGap="10px">
          <DatePicker
            ref={el => setDayPicker(el)}
            label="Start Day"
            value={date}
            handleDateChange={onDateChange}
            handleDayPickerHide={onDayPickerHide}
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

        {date && (
          <PriceDetail
            periodLabel={spelling(period)}
            price={listingData.basePrice}
            isAbsorvedFee={listingData.isAbsorvedFee}
            days={period}
            quantity={1}
          />
        )}
      </Grid>
    </>
  )
}

const formik = {
  displayName: 'WeeklyBooking_Form',
  enableReinitialize: true,
  isInitialValid: false
}

WeeklyBooking.propTypes = {
  ...withFormik.propTypes
}

// WeeklyBooking.defaultProps = {
//   date: '',
//   period: 0
// }

// WeeklyBooking.propTypes = {
//   date: PropTypes.any,
//   period: PropTypes.number,
//   listingData: PropTypes.instanceOf(Object).isRequired
// }

export default withFormik(formik)(WeeklyBooking)
