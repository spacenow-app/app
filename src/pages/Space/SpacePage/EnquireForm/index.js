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
  listing,
  ...props
}) => {
  const { isLoading: isSendingEmail } = useSelector(state => state.mail)
  const [isOpenAskQuestion, setIsOpenAskQuestion] = useState(true)
  const [isOpenInspection, setIsOpenInspection] = useState(false)

  const _handleSubmit = () => {
    if (!isValid) return
    Object.assign(
      values,
      { l_id: listing.id },
      { l_image: JSON.stringify(listing.photos[0].name) },
      { l_title: listing.title },
      { l_address: listing.location.address1 },
      { l_city: listing.location.city },
      { l_country: listing.location.country },
      { h_name: listing.user.profile.displayName },
      { h_image: listing.user.profile.picture },
      { l_currency: listing.listingData.currency },
      { l_minimum_term: listing.listingData.minTerm },
      { l_term: _handleTerm(listing.bookingPeriod, listing.listingData.minTerm) || 'day' },
      { l_capacity: listing.listingData.capacity },
      { l_price: listing.listingData.basePrice === 1 ? "POA" : listing.listingData.basePrice },
      { l_period: listing.bookingPeriod },
      { g_current_date: format(new Date(), 'EEEE d MMMM, yyyy') },
      { l_category: listing.settingsParent.category.itemName },
      { g_app_link: window.location.origin },
      { g_mail: values.g_email },
      { g_message: values.g_message }
    )

    const emailGuest = {
      template: 'new-enquiry-guest',
      destination: values.g_email,
      data: JSON.stringify(values)
    }
    const emailHost = {
      template: 'new-enquiry-host',
      destination: listing.user.email,
      data: JSON.stringify(Object.assign(values, { h_email: listing.user.email }))
    }
    dispatch(sendMail({ ...emailGuest }))
    dispatch(sendMail({ ...emailHost }, 'Your enquiry was sent succesfully'))
  }

  const _handleTerm = (period) => {
    return (period !== 'daily') && period.replace('ly', '')
  }

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  return (
    <Box display="grid" gridGap={20}>
      <Button
        fluid
        outline
        onClick={() => {
          setIsOpenAskQuestion(true)
          setIsOpenInspection(false)
        }}
        style={{ background: 'transparent', borderColor: '#51c482' }}
        className={`${isOpenAskQuestion ? "active" : ""}`}
      >
        Ask a Question
      </Button>

      <Button
        fluid
        outline
        onClick={() => {
          setIsOpenAskQuestion(false)
          setIsOpenInspection(true)
        }}
        style={{ background: 'transparent', borderColor: '#51c482' }}
        className={`${isOpenInspection ? "active" : ""}`}
      >
        Organise an Inspection
      </Button>

      <Text>Hi,</Text>
      <Text>I am interested in this space. Could you please provide me with more information.</Text>
      <Collapse in={isOpenAskQuestion}>
        <form>
          <Box display="grid" gridGap="10px">
            <Select
              error={errors.desiredInfo}
              value={values.desiredInfo}
              name="g_desired_info"
              onChange={_handleSelectChange}
            >
              <option value="">Select desired information</option>
              <option value="Pricing">Pricing</option>
              <option value="Leasing terms">Leasing terms</option>
              <option value="Property Inspection">Property inspection</option>
              <option value="Outgoings">Outgoings</option>
            </Select>

            {!isAuthenticated && (
              <>
                <Input
                  placeholder="Full name"
                  name="g_name"
                  error={errors.name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Input
                  placeholder="Email"
                  name="g_email"
                  error={errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </>
            )}

            <Input
              placeholder="Company"
              name="g_company"
              error={errors.company}
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              placeholder="Contact Number"
              name="g_phone"
              error={errors.phone}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextArea
              name="g_message"
              placeholder="Start your message"
              error={errors.message}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button blue fluid onClick={() => _handleSubmit()} isLoading={isSendingEmail}>
              Enquire
          </Button>
          </Box>

        </form>
      </Collapse>

      <Collapse in={isOpenInspection}>
        <form>
          <Box display="grid" gridGap="10px">
            <Select
              error={errors.desiredInfo}
              value={values.desiredInfo}
              name="g_desired_info"
              onChange={_handleSelectChange}
            >
              <option value="">Select inspection type</option>
              <option value="In Person">In person</option>
              <option value="Virtual">Virtual</option>
            </Select>

            {!isAuthenticated && (
              <>
                <Input
                  placeholder="Full name"
                  name="g_name"
                  error={errors.name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <Input
                  placeholder="Email"
                  name="g_email"
                  error={errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </>
            )}

            <Input
              placeholder="Company"
              name="g_company"
              error={errors.company}
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              placeholder="Contact Number"
              name="g_phone"
              error={errors.phone}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button blue fluid onClick={() => _handleSubmit()} isLoading={isSendingEmail}>
              Enquire
          </Button>
          </Box>

        </form>
      </Collapse>
    </Box>
  )
}

const formik = {
  displayName: 'RequireForm',
  mapPropsToValues: props => {
    return {
      g_name: props.listing.user && props.listing.user.id ? `${props.listing.user.profile.firstName} ${props.listing.user.profile.lastName}` : '',
      g_email: props.listing.user && props.listing.user.id ? props.listing.user.email : ''
    }
  },
  validationSchema: Yup.object().shape({
    g_email: Yup.string().required('Email field is required'),
    g_name: Yup.string().required('Name field is required'),
    g_phone: Yup.number()
      .required('Email field is required')
      .typeError('Need to be number.'),
    g_message: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

EnquireForm.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(EnquireForm)
