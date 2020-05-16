/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import { Box, Input, TextArea, Button, Text, Select, Collapse } from 'components'

import { sendMail } from 'redux/ducks/mail'
import { cropPicture } from 'utils/images'

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
  const [isOpenAskQuestion, setIsOpenAskQuestion] = useState(true)
  const [isOpenInspection, setIsOpenInspection] = useState(false)
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

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  return (
    <Box display="grid" gridGap={20}>
      <Button fluid onClick={() => setIsOpenAskQuestion(false)}>
        Ask a Question
      </Button>

      <Button
        fluid
        outline
        onClick={() => setIsOpenInspection(false)}
        style={{ background: 'transparent', borderColor: '#51c482' }}
      >
        Organise an Inspection
      </Button>

      <Text>Hi,</Text>
      <Text>I am interested in this property. Could you please provide me with more information.</Text>

      <form>
        <Collapse in={isOpenAskQuestion}>Ask Question</Collapse>
        <Collapse in={isOpenInspection}>Inspection</Collapse>
      </form>
      <Select error={errors.desiredInfo} value={values.desiredInfo} name="desiredInfo" onChange={_handleSelectChange}>
        <option value="">Select desired information</option>
        <option value="pricing">Pricing</option>
        <option value="leasing-terms">Leasing terms</option>
        <option value="property-inspection">Property inspection</option>
        <option value="outgoings">Outgoings</option>
      </Select>

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
        // label="Company"
        placeholder="Company"
        name="company"
        error={errors.company}
        value={values.company}
        onChange={handleChange}
        onBlur={handleBlur}
      />

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
    </Box>
  )
}

const formik = {
  displayName: 'RequireForm',
  mapPropsToValues: props => {
    return {
      guestName: props.user && props.user.id ? `${props.user.profile.firstName} ${props.user.profile.lastName}` : '',
      guestEmail: props.user && props.user.id ? props.user.email : ''
    }
  },
  validationSchema: Yup.object().shape({
    guestEmail: Yup.string().required('Email field is required'),
    guestName: Yup.string().required('Name field is required'),
    phone: Yup.number()
      .required('Email field is required')
      .typeError('Need to be number.'),
    message: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

EnquireForm.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(EnquireForm)
