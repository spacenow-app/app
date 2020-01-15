import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'

import { DatePicker, Grid, Cell, PriceDetail, TextArea, Select } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

function spelling(reference) {
  let label = 'Hour'
  if (reference > 1) label = 'Hours'
  return label
}

const HourlyBooking = ({
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onDayPickerHide,
  date,
  startTime,
  endTime,
  listingExceptionDates,
  closingDays,
  listingData,
  hoursQuantity,
  onCalcHourlyPeriod,
  inputFocus,
  hidePrice,
  handleMessageChange,
  message,
  hourlySuggestion
}) => {

  const [dayPicker, setDayPicker] = useState('')

  useEffect(() => {
    if (dayPicker.input && inputFocus)
      dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  useEffect(() => {
    onCalcHourlyPeriod()
  }, [date, startTime, endTime]) // eslint-disable-line react-hooks/exhaustive-deps

  const _getOptions = (range) => {
    if (!range) return []
    const options = []
    for (let i = 0; i < range.length; i += 1) {
      options.push({ key: i, value: range[i], name: range[i] })
    }
    return options
  }

  return (
    <>
      <WrapperStyled>
        <DatePicker
          label={hidePrice ? '' : 'Date'}
          ref={el => setDayPicker(el)}
          date={date}
          handleDateChange={o => onDateChange(o)}
          handleDayPickerHide={onDayPickerHide}
          placeholder="Choose a date"
          dayPickerProps={{
            selectedDays: [date],
            modifiers: {
              disabled: [
                ...listingExceptionDates.map(o => new Date(o)),
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

        <Grid columns={2} style={{ marginBottom: '10px' }}>
          <Cell>
            <Select label={hidePrice ? '' : 'Start time'}
              options={_getOptions(hourlySuggestion && hourlySuggestion.openRange)}
              handleChange={e => onStartTimeChange(String(e.target.value))}
              value={startTime}
              disabled={!hourlySuggestion}
            />
          </Cell>
          <Cell>
            <Select label={hidePrice ? '' : 'End time'}
              options={_getOptions(hourlySuggestion && hourlySuggestion.closeRange)}
              handleChange={e => onEndTimeChange(String(e.target.value))}
              value={endTime}
              disabled={!hourlySuggestion}
            />
          </Cell>
        </Grid>

        {listingData.bookingType === 'request' && !hidePrice && (
          <TextArea label="Additional notes" name="message" value={message} onChange={handleMessageChange} />
        )}

        {date && hoursQuantity > 0 && !hidePrice && (
          <PriceDetail
            periodLabel={spelling(hoursQuantity)}
            price={listingData.basePrice}
            isAbsorvedFee={listingData.isAbsorvedFee}
            days={hoursQuantity}
            quantity={1}
          />
        )}
      </WrapperStyled>
    </>
  )
}

const formik = {
  displayName: 'HourlyBooking_Form',
  enableReinitialize: true,
  isInitialValid: false
}

HourlyBooking.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(HourlyBooking)
