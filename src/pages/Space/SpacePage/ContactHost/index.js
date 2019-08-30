/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'

import { Input, TextArea, Button, DatePicker, TimePicker, Grid, Cell } from 'components'

import  { sendEmailForm } from 'redux/ducks/mail'

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
  resetForm,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  validateForm,
  dispatch,
  isValid,
  user,
  ...props
}) => {

  const _handleSubmit = async () => {
    // await setFieldValue('startTime', format(values.startTime, 'HH:mm'))
    // await setFieldValue('endTime', format(values.endTime, 'HH:mm'))
    
    // const emailHost = {
    //   template: 'contact-host-hourly',
    //   data: JSON.stringify(values)
    // }
    const emailGuest = {
      template: 'welcome',
      data: JSON.stringify(values),
    }
    console.log(emailGuest)
    // props.dispatch(sendEmailForm(emailGuest))
  }

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
                  name="startTime"
                  value={format(values.startTime, 'HH:mm')}
                  onChange={handleChange}
                />
              </TimePickerStyled>
            </Cell>
            <Cell>
              <LabelStyled>End time</LabelStyled>
              <TimePickerStyled>
                <TimePicker
                  name="endTime"
                  value={format(values.endTime, 'HH:mm')}
                  onChange={handleChange}
                />
              </TimePickerStyled>
            </Cell>
          </Grid>

          {!user && 
            <>
              <Input
                label="Full Name*"
                placeholder="Your full name"
                name="name"
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

        <Button width="100%" onClick={() => _handleSubmit()} disabled={!isValid}>Enquire</Button>

      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapPropsToValues: props => { return ({ 
    name: props.user && props.user.id ?  props.user.profile.firstName + ' ' + props.user.profile.lastName : '',
    email: props.user && props.user.id ? props.user.email : '',
    startTime: new Date("January 31 1980 00:00"),
    endTime: new Date("January 31 1980 00:00"),
    date: new Date()
  })},
  validationSchema: Yup.object().shape({
    date: Yup.string(),
    startTime: Yup.string(),
    endTime: Yup.string(),
    email: Yup.string().required('Email field is required'),
    name: Yup.string().required('Name field is required'),
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
