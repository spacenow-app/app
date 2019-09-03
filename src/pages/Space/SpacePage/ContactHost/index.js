/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { Input, TextArea, Button, DatePicker, TimePicker, Grid, Cell } from 'components'

import  { sendMail } from 'redux/ducks/mail'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;
`

const TimePickerStyled = styled.div`
  display: inline-block;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  padding-right: 17px;
  padding: 10px 20px;
  border-radius: 37px;
  height: 54px;
  text-align: center;
  font-size: 14px;
`

const LabelStyled = styled.label`
  font-size: 14px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

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
}) => {

  const { isLoading: isSendingEmail } = useSelector(state => state.mail)

  const _handleSubmit = () => {  
    let sendData = values;
    Object.assign(sendData,
      {listingPhoto: listing.photos.find(photo => photo.isCover).name },
      {listingTitle: listing.title},
      {listingCity: listing.location.city},
      {listingCountry: listing.location.country},
      {hostName: listing.user.profile.displayName}
    )
    console.log(sendData)
    const emailGuest = {
      template: 'contact-hourly-guest',
      data: JSON.stringify(sendData),
    }
    const emailHost = {
      template: 'contact-hourly-host',
      data: JSON.stringify(sendData),
    }
    dispatch(sendMail(emailGuest))
    dispatch(sendMail(emailHost, "Your enquiry was sent succesfully"))
  }

  const _handleTimeChange = (name, value) => {
    setFieldValue(name, value)
  }

  let startTimeInitial = new Date("January 31 1980 08:00")
  let endTimeInitial = new Date("January 31 1980 18:00")

  return (
    <form>
      <WrapperStyled>
        <DatePicker
          label="Date"
          name="date"
          handleDateChange={date => setFieldValue('date',  format(date, 'DD/MM/YYYY'))}
          dayPickerProps={{
            disabledDays: [{ before: new Date()}],
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
                value={format(startTimeInitial, 'HH:mm')}
                onChange={time => _handleTimeChange('startTime', time)}
              />
            </TimePickerStyled>
          </Cell>
          <Cell>
            <LabelStyled>End time</LabelStyled>
            <TimePickerStyled>
              <TimePicker
                value={format(endTimeInitial, 'HH:mm')}
                onChange={time => _handleTimeChange('endTime', time)}
              />
            </TimePickerStyled>
          </Cell>
        </Grid>

        {!user && 
          <>
            <Input
              label="Full Name*"
              placeholder="Your full name"
              name="guestName"
              error={errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              label="Email*"
              placeholder="Email Address"
              name="email"
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        }

        <Input
          label="Phone number"
          placeholder="0400 000 000"
          name="phone"
          error={errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextArea
          label="Write a message"
          name="message"
          placeholder="Start your message"
          error={errors.message}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button width="100%" onClick={() => _handleSubmit()} disabled={!isValid} isLoading={isSendingEmail}>Enquire</Button>

      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapPropsToValues: props => { return ({ 
    guestName: props.user && props.user.id ?  props.user.profile.firstName + ' ' + props.user.profile.lastName : '',
    email: props.user && props.user.id ? props.user.email : '',
    date: new Date(),
    startTime: format(new Date("January 31 1980 08:00"), 'HH:mm'),
    endTime: format(new Date("January 31 1980 18:00"), 'HH:mm')
  })},
  validationSchema: Yup.object().shape({
    date: Yup.string(),
    startTime: Yup.string(),
    endTime: Yup.string(),
    email: Yup.string().required('Email field is required'),
    guestName: Yup.string().required('Name field is required'),
    phone: Yup.number().typeError('Need to be number.'),
    message: Yup.string(),
  }),
  enableReinitialize: true,
  isInitialValid: false
}

ContactHost.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(ContactHost)
