import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'

import { DatePicker, TimePicker, Grid, Cell, PriceDetail } from 'components'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const TimePickerStyled = styled.div`
  display: inline-block;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  padding-right: 17px;
  padding: 10px 20px;
  border-radius: 8px;
  height: 54px;
  text-align: center;
  font-size: 14px;
`

const LabelStyled = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

function spelling(reference) {
  let label = 'Hour'
  if (reference > 1) label = 'Hours'
  return label
}

const ContactHost = ({
  onDateChange,
  date,
  startTime,
  endTime,
  listingExceptionDates,
  closingDays,
  listingData,
  hoursQuantity,
  onSetStartTime,
  onSetEndTime,
  onCalcHourlyPeriod,
  inputFocus
}) => {

  const [dayPicker, setDayPicker] = useState('')
  useEffect(() => {
    if (dayPicker.input && inputFocus) dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  return (
    <>
      <WrapperStyled>
        <DatePicker
          label="Date"
          ref={el => setDayPicker(el)}
          date={date}
          handleDateChange={o => onDateChange(o)}
          onBlur={onCalcHourlyPeriod}
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
        <Grid columns={2}>
          <Cell>
            <LabelStyled>Start time</LabelStyled>
            <TimePickerStyled>
              <TimePicker value={startTime} onChange={time => onSetStartTime(time)} onBlur={onCalcHourlyPeriod} />
            </TimePickerStyled>
          </Cell>
          <Cell>
            <LabelStyled>End time</LabelStyled>
            <TimePickerStyled>
              <TimePicker value={endTime} onChange={time => onSetEndTime(time)} onBlur={onCalcHourlyPeriod} />
            </TimePickerStyled>
          </Cell>
        </Grid>
        {hoursQuantity > 0 && (
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

ContactHost.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(ContactHost)
