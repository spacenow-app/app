/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { Input, TextArea, Button, DatePicker, TimePicker, Grid, Cell } from 'components'

import { sendMail } from 'redux/ducks/mail'

import { cropPicture } from 'utils/images'

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

const _getCoverPhoto = object => {
  if (object.photos.length <= 0) {
    return ''
  }
  const photoCover = object.photos.find(e => e.isCover)
  if (photoCover) {
    return cropPicture(photoCover.name)
  }
  return cropPicture(object.photos[0].name)
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
  isAuthenticated,
  listing
}) => {
  const { isLoading: isSendingEmail } = useSelector(state => state.mail)
  const [date, setDate] = useState(new Date())
  const _handleSubmit = () => {
    Object.assign(
      values,
      { listingPhoto: JSON.stringify(_getCoverPhoto(listing)) },
      { listingTitle: listing.title },
      { listingCity: listing.location.city },
      { listingCountry: listing.location.country },
      { hostName: listing.user.profile.displayName },
      { listingCurrency: listing.listingData.currency },
      { listingPrice: listing.listingData.basePrice || 0 },
      { listingPeriod: listing.bookingPeriod },
      { currentDate: format(new Date(), 'EEEE d MMMM, yyyy') },
      { listingCategory: listing.settingsParent.category.itemName },
      { date: format(date, 'dd/MM/yyyy') }
    )
    const emailGuest = {
      template: 'contact-guest-hourly',
      data: JSON.stringify(Object.assign(values, { email: values.guestEmail }))
    }
    const emailHost = {
      template: 'contact-host-hourly',
      data: JSON.stringify(Object.assign(values, { email: listing.user.email }))
    }
    dispatch(sendMail(emailGuest))
    dispatch(sendMail(emailHost, 'Your enquiry was sent succesfully'))
  }

  const _handleTimeChange = (name, value) => {
    setFieldValue(name, value)
  }

  const startTimeInitial = new Date('January 31 1980 08:00')
  const endTimeInitial = new Date('January 31 1980 18:00')

  return (
    <form>
      <WrapperStyled>
        <DatePicker
          label="Date"
          handleDateChange={date => setDate(date)}
          dayPickerProps={{
            disabledDays: [{ before: new Date() }]
          }}
          value={date}
        />

        {listing.listingData.bookingType !== 'poa' && (
          <>
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
          </>
        )}

        {!isAuthenticated && (
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
              name="guestEmail"
              error={errors.guestEmail}
              value={values.guestEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        )}

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

        <Button fluid mt="20px" onClick={() => _handleSubmit()} disabled={!isValid} isLoading={isSendingEmail}>
          Enquire
        </Button>
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapPropsToValues: props => {
    return {
      guestName: props.user && props.user.id ? `${props.user.profile.firstName} ${props.user.profile.lastName}` : '',
      guestEmail: props.user && props.user.id ? props.user.email : '',
      startTime: format(new Date('January 31 1980 08:00'), 'HH:mm'),
      endTime: format(new Date('January 31 1980 18:00'), 'HH:mm')
    }
  },
  validationSchema: Yup.object().shape({
    startTime: Yup.string(),
    endTime: Yup.string(),
    guestEmail: Yup.string().required('Email field is required'),
    guestName: Yup.string().required('Name field is required'),
    phone: Yup.number().typeError('Need to be number.'),
    message: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

ContactHost.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(ContactHost)
