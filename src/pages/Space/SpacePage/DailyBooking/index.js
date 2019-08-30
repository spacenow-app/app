import React from 'react';

import styled from 'styled-components';

import { DatePicker, ListDates, PriceDetail, Caption } from 'components';


function spelling(reference) {
  let label = 'Day';
  if (reference > 1) label = 'Days';
  return label;
}

const StartDateDiv = styled.div`
  margin-left: 21px;
  margin-bottom: 10px;
`;

const DailyBooking = ({
  focus,
  onDateChange,
  datesSelected,
  listingExceptionDates,
  closingDays,
  listingData,
  removeDate
}) => 
  <>
    <StartDateDiv>
      <Caption type="large">Start Date</Caption>
    </StartDateDiv>
    <DatePicker
      date={null}
      handleDateChange={onDateChange}
      hideOnDayClick={focus}
      placeholder={'Choose Dates'}
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
;

export default DailyBooking;