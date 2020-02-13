import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import { setMinutes, setHours } from 'date-fns'

import { DatePicker, Grid, Cell, PriceDetail, TextArea, Select, Box, Text } from 'components'

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
  setFocusInput,
  hidePrice,
  handleMessageChange,
  message,
  hourlySuggestion
}) => {
  const [dayPicker, setDayPicker] = useState('')

  useEffect(() => {
    if (dayPicker.input && inputFocus) dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  useEffect(() => {
    onCalcHourlyPeriod()
  }, [date, startTime, endTime]) // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (hourlySuggestion) {
  //     // console.log(startTime, endTime)
  //     _hanldeRoundTime()
  //   }
  // }, [endTime, startTime])

  const _getOptions = range => {
    if (!range) return []
    const options = []
    for (let i = 0; i < range.length; i += 1) {
      options.push({ key: i, value: range[i], name: range[i] })
    }
    return options
  }

  const _hanldeTimeClick = () => {
    if (!hourlySuggestion) {
      setFocusInput(true)
    }
  }

  // Force endTime to the next full hour
  let sm
  let em
  let sh
  let eh
  let sum

  // const _hanldeRoundTime = () => {
  //   setTimeout(() => {
  //     if (startTime && endTime) {
  //       ;[sh, sm] = startTime.split(':')
  //       ;[eh, em] = endTime.split(':')
  //       console.log(sh, sm)
  //       console.log(eh, em)
  //       if (sh === eh) {
  //         eh = parseInt(eh, 10) + 1
  //         em = sm
  //       } else {
  //         sum = parseInt(sm, 10) + parseInt(em, 10)
  //         if (sum < 60) {
  //           eh = parseInt(eh, 10) + 1
  //           em = parseInt(sm, 10) + 60 - sum
  //         }
  //         if (sum > 60) {
  //           em = parseInt(sm, 10) + 60 - sum
  //           em = sm
  //         }
  //       }
  //       onEndTimeChange(`${eh}:${em}`)
  //     }
  //   }, 1000)
  // }
  let start
  let end
  // const _hanldeRoundTime = () => {
  //   ;[sh, sm] = startTime.split(':')
  //   ;[eh, em] = endTime.split(':')
  //   start = setHours(start, parseInt(sh, 10))
  //   start = setMinutes(new Date(2014, 8, 1, 0, 0, 0), parseInt(sm, 10))
  //   end = setHours(end, parseInt(eh, 10))
  //   end = setMinutes(new Date(2014, 8, 1, 0, 0, 0), parseInt(em, 10))

  //   console.log(start)
  //   console.log(end)
  // }

  return (
    <>
      <WrapperStyled>
        <DatePicker
          label={hidePrice ? '' : 'Date'}
          ref={el => setDayPicker(el)}
          value={date}
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
            <Select
              label={hidePrice ? '' : 'Start time'}
              options={_getOptions(hourlySuggestion && hourlySuggestion.openRange)}
              handleChange={e => {
                onStartTimeChange(String(e.target.value))
                // _hanldeRoundTime()
              }}
              value={startTime}
              // disabled={!hourlySuggestion}
              bgPosition="87% 50%"
              onClick={() => _hanldeTimeClick()}
            />
          </Cell>
          <Cell>
            <Select
              label={hidePrice ? '' : 'End time'}
              options={_getOptions(hourlySuggestion && hourlySuggestion.closeRange)}
              handleChange={e => {
                onEndTimeChange(String(e.target.value))
                // _hanldeRoundTime()
              }}
              value={endTime}
              // disabled={!hourlySuggestion}
              bgPosition="87% 50%"
              onClick={() => _hanldeTimeClick()}
            />
            {date && (
              <Box display="grid" justifyItems="end">
                <Text fontFamily="regular" fontSize="12px" color="greyscale.1">
                  {`${hoursQuantity} ${spelling(hoursQuantity)}`}
                </Text>
              </Box>
            )}
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
