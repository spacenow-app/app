/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { Input, TextArea, Button, Collapse } from 'components'

import { sendMail } from 'redux/ducks/mail'

import { cropPicture } from 'utils/images'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
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

const EnquireForm = ({
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
  const [date] = useState(new Date())
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
      destination: values.guestEmail,
      data: JSON.stringify(Object.assign(values, { email: values.guestEmail }))
    }
    const emailHost = {
      template: 'contact-host-hourly',
      destination: listing.user.email,
      data: JSON.stringify(Object.assign(values, { email: listing.user.email }))
    }
    dispatch(sendMail({ ...emailGuest }))
    dispatch(sendMail({ ...emailHost }, 'Your enquiry was sent succesfully'))
  }

  const [question, setQuestion] = useState(false)
  const [inspection, setInspection] = useState(false)

  return (
    <form>
      <WrapperStyled>
        <Button onClick={() => setInspection(false) || setQuestion(!question)}>
          Ask a Question
        </Button>
        <Button onClick={() => setQuestion(false) || setInspection(!inspection)}>
          Organise and Inspection
        </Button>

        <Collapse in={question}>
          <div id="inquiry-question-form">
            <p>Hi,</p>
            <p>I'm interested in this property. Could you please provide me with more information.</p>
          </div>
        </Collapse>
        <Collapse in={inspection}>
          <div id="inquiry-inspection-form">
            <p>Hi,</p>
            <p>I would like to organise and inspection.</p>
          </div>
        </Collapse>

        {!isAuthenticated && (
          <>
            <Input
              // label="Full Name*"
              placeholder="Your full name"
              name="guestName"
              error={errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              // label="Email*"
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
          // label="Phone number"
          placeholder="Phone"
          name="phone"
          error={errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextArea
          // label="Write a message"
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
  displayName: 'RequireForm',
  mapPropsToValues: props => {
    return {
      guestName: props.user && props.user.id ? `${props.user.profile.firstName} ${props.user.profile.lastName}` : '',
      guestEmail: props.user && props.user.id ? props.user.email : '',
    }
  },
  validationSchema: Yup.object().shape({
    guestEmail: Yup.string().required('Email field is required'),
    guestName: Yup.string().required('Name field is required'),
    phone: Yup.number().required('Email field is required').typeError('Need to be number.'),
    message: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

EnquireForm.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(EnquireForm)
