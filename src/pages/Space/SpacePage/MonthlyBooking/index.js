import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker, Select, PriceDetail, Grid } from 'components';


function spelling(reference) {
  let label = 'Month';
  if (reference > 1) label = 'Months';
  return label;
}


const MonthlyBooking = (props) => {

  const {
    date,
    onDateChange,
    listingExceptionDates,
    closingDays,
    handleChangePeriod,
    period,
    listingData
  } = props;

  let dates = [{ key: 0, value: 0, name: 'Choose a Period' }];

  for (let i = props.listingData.minTerm; i < 13; i++) {
    dates.push({ key: i, value: i, name: `${i} ${spelling(i)}` });
  }

  return (
    <Grid columns={1} rowGap={'30px'}>
      <DatePicker
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
      <Select options={dates} handleChange={handleChangePeriod} value={period} />
      <PriceDetail
        periodLabel={spelling(period)}
        price={listingData.basePrice}
        isAbsorvedFee={listingData.isAbsorvedFee}
        days={period}
        quantity={1}
      />
    </Grid>
  );
};

MonthlyBooking.defaultProps = {
  date: '',
  period: 0
};

MonthlyBooking.propTypes = {
  date: PropTypes.any,
  period: PropTypes.number,
  listingData: PropTypes.instanceOf(Object).isRequired,
};


export default MonthlyBooking;
