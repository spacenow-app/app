/* eslint-disable  */
import React, { useState, useEffect } from 'react'

import { DatePicker, ListDates, PriceDetail } from 'components'
import { DateUtils } from 'react-day-picker'
import { eachDayOfInterval, isSameDay } from 'date-fns'

function spelling(reference) {
  let label = 'Day'
  if (reference > 1) label = 'Days'
  return label
}

const DailyBooking = ({
  focus,
  onDateChange,
  datesSelected,
  listingExceptionDates,
  closingDays,
  listingData,
  removeDate,
  setDatesSelected,
  inputFocus
}) => {
  const [from, setFrom] = useState(undefined)
  const [to, setTo] = useState(undefined)
  const [range, setRange] = useState(undefined)
  const [listDates, setListDates] = useState(datesSelected)
  const modifiers = { start: from, end: to }
  const [dayPicker, setDayPicker] = useState('')

  useEffect(() => {
    if (dayPicker.input && inputFocus) dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  const _handleDayClick = day => {
    const rangeInput = DateUtils.addDayToRange(day, range)
    rangeInput.from ? setDatesSelected([rangeInput.from]) : setDatesSelected([])
    if (rangeInput.from && rangeInput.to) {
      const h = rangeInput.from.getHours()
      const m = rangeInput.from.getMinutes()
      const s = rangeInput.from.getSeconds()
      const ms = rangeInput.from.getMilliseconds()
      setDatesSelected(
        eachDayOfInterval({ start: rangeInput.from, end: rangeInput.to }).map(date => {
          date.setHours(h)
          date.setMinutes(m)
          date.setSeconds(s)
          date.setMilliseconds(ms)
          return date
        })
      )
    }
    setRange(rangeInput)
    setFrom(rangeInput.from)
    setTo(rangeInput.to)
  }

  useEffect(() => {
    setRange({ from: datesSelected[0], to: datesSelected[datesSelected.length - 1] })
    setFrom(datesSelected[0])
    setTo(datesSelected[datesSelected.length - 1])

    // Remove Exception days from dates selected
    let filteredDates = datesSelected
    listingExceptionDates.map(date => {
      return (filteredDates = filteredDates.filter(exeption => {
        return !isSameDay(new Date(date), new Date(exeption))
      }))
    })

    // Remove closing days from dates selected
    let isClose = []
    filteredDates = filteredDates.filter(element => {
      const dt = new Date(element)
      isClose = closingDays.filter(res => res === dt.getDay())
      return isClose.length === 0
    })

    setListDates(filteredDates)
  }, [datesSelected, closingDays, listingExceptionDates])

  useEffect(() => {
    if (listDates.length > 0 && JSON.stringify(listDates) !== JSON.stringify(datesSelected)) {
      setDatesSelected(listDates)
    }
  }, [listDates])

  return (
    <>
      <DatePicker
        label="Dates"
        date={null}
        handleDateChange={date => _handleDayClick(date)}
        hideOnDayClick={false}
        placeholder="Choose Dates"
        inputProps={{ readOnly: true }}
        dayPickerProps={{
          disabledDays: [
            ...listingExceptionDates.map(el => new Date(el)),
            {
              daysOfWeek: closingDays
            },
            {
              before: new Date()
            }
          ],
          numberOfMonths: 1,
          selectedDays: [from, { from, to }],
          modifiers: { modifiers }
        }}
      />
      <ListDates dates={listDates} /> {/* onClickDate={(e, date) => removeDate(date)} */}
      {dates && listDates.length > 0 && (
        <PriceDetail
          periodLabel={spelling(listDates.length)}
          price={listingData.basePrice}
          isAbsorvedFee={listingData.isAbsorvedFee}
          days={listDates.length}
          quantity={1}
        />
      )}
    </>
  )
}

export default DailyBooking
