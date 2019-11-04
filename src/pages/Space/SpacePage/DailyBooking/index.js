import React, { useEffect, useState } from 'react'

import { DatePicker, ListDates, PriceDetail } from 'components'

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
  inputFocus
}) => {

  const [dayPicker, setDayPicker] = useState('')

  useEffect(() => {
    if (dayPicker.input && inputFocus) dayPicker.input.focus()
  }, [dayPicker.input, inputFocus])

  return (
  <>
    <DatePicker
      label="Start Date"
      ref={el => setDayPicker(el)}
      date={null}
      handleDateChange={onDateChange}
      hideOnDayClick={focus}
      placeholder="Choose Dates"
      dayPickerProps={{
        selectedDays: [...datesSelected.map(el => new Date(el))],
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
    <ListDates dates={datesSelected} onClickDate={(e, date) => removeDate(date)} />
    {datesSelected.length > 0 && (
      <PriceDetail
        periodLabel={spelling(datesSelected.length)}
        price={listingData.basePrice}
        isAbsorvedFee={listingData.isAbsorvedFee}
        days={datesSelected.length}
        quantity={1}
      />
    )}
  </>
  )
}
export default DailyBooking
