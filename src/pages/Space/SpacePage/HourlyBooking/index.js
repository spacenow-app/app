/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { Input, TextArea, Button, DatePicker, TimePicker, Grid, Cell, PriceDetail } from 'components'

import { sendMail } from 'redux/ducks/mail'

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

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return photoCover.name
  }
  return object.photos[0].name
}

const ContactHost = ({
  values,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  isValid,
  dispatch,
  user,
  listing,
  listingData,
  hoursQuantity,
  calcHourlyPeriod
}) => {
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('18:00')

  return (
    <form>
      <WrapperStyled>
        <DatePicker
          label="Date"
          name="date"
          handleDateChange={date => setFieldValue('date', format(date, 'dd/MM/yyyy'))}
          dayPickerProps={{
            disabledDays: [{ before: new Date() }]
          }}
          value={values.date}
          error={errors.startTime}
          onChange={handleChange}
        />

        <Grid columns={2}>
          <Cell>
            <LabelStyled>Start time</LabelStyled>
            <TimePickerStyled>
              <TimePicker
                value={startTime}
                onChange={time => setStartTime(time)}
                onBlur={() => calcHourlyPeriod(startTime, endTime)}
              />
            </TimePickerStyled>
          </Cell>
          <Cell>
            <LabelStyled>End time</LabelStyled>
            <TimePickerStyled>
              <TimePicker
                value={endTime}
                onChange={time => setEndTime(time)}
                onBlur={() => calcHourlyPeriod(startTime, endTime)}
              />
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
    </form>
  )
}

const formik = {
  displayName: 'HourlyBooking_Form',
  // mapPropsToValues: props => {
  //   return {
  //     date: new Date(),
  //     startTime: format(new Date('January 31 1980 08:00'), 'HH:mm'),
  //     endTime: format(new Date('January 31 1980 18:00'), 'HH:mm')
  //   }
  // },
  // validationSchema: Yup.object().shape({
  //   date: Yup.string(),
  //   startTime: Yup.string(),
  //   endTime: Yup.string()
  // }),
  enableReinitialize: true,
  isInitialValid: false
}

ContactHost.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(ContactHost)
