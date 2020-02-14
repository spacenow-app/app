import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'

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

  useEffect(() => {
    if (hourlySuggestion && endTime && startTime) {
      _hanldeRoundTime()
    }
  }, [endTime, startTime]) // eslint-disable-line react-hooks/exhaustive-deps

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
  let om
  let oh

  const _hanldeRoundTime = () => {
    ;[sh, sm] = startTime.split(':')
    ;[eh, em] = endTime.split(':')
    sh = parseInt(sh, 10)
    sm = parseInt(sm, 10)
    eh = parseInt(eh, 10)
    em = parseInt(em, 10)
    if (eh < sh) {
      eh = sh + 1
      em = sm
    } else if (sh === eh) {
      eh += 1
      em = sm
    } else if (sm !== em) {
      if (sm > em) {
        em = sm
      } else {
        eh += 1
        em = sm
      }
    }
    ;[oh, om] = hourlySuggestion.closeRange[hourlySuggestion.closeRange.length - 1].split(':')
    oh = parseInt(oh, 10)
    om = parseInt(om, 10)
    if (oh === eh && em > om) {
      eh -= 1
    }
    if (em < 10) em = `0${em}`
    if (eh < 10) eh = `0${eh}`
    onEndTimeChange(String(`${eh}:${em}`))
  }

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
