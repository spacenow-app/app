/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'

import { Input, Select, TextArea, Button, DatePicker } from 'components'

import {
  onSendRequestForm
} from 'redux/ducks/integration'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const SectionStyled = styled.div``

const FormPartner = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  validateForm,
  dispatch,
  isValid,
  ...props
}) => {
  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleSubmit = () => {
    // dispatch(onCreateWeWorkReferral(values))
    validateForm().then(() => {
      if(isValid)
        dispatch(onSendRequestForm(values))
    })
    
  }

  const arrayAttendees = ['1-10', '10-20', '20-50', '50-100', '100-1000']

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          <Input
            label="Full Name*"
            placeholder="Your full name"
            name="name"
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Email*"
            placeholder="Email Address"
            name="email"
            error={errors.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Phone"
            placeholder="Phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Select
            value={values.attendees_estimated}
            name="attendees_estimated"
            onChange={_handleSelectChange}
            label="Number of Attendees"
          >
            <option>Select a range</option>
            {arrayAttendees.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </SectionStyled>

        <SectionStyled>
          <DatePicker
            label="Requested Event Date"
            handleDateChange={date => setFieldValue('requested_event_date', format(date, 'yyyy-MM-dd'))}
            dayPickerProps={{
              disabledDays: [{ before: new Date() }]
            }}
          />
        </SectionStyled>

        <SectionStyled>
          <TextArea
            label="Additional notes"
            name="notes"
            error={errors.notes}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <Button width="100%" onClick={() => _handleSubmit()}>
          Booking Request
        </Button>
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'Partner_WeWorkForm',
  mapPropsToValues: props => {
    const { listing } = props
    if (listing && listing.id) {
      return {
        email: '',
        name: '',
        phone: '',
        city: listing.location.city,
        requested_location: '',
        company_name: '',
        requested_event_date: '',
        attendees_estimated: '',
        contact_allowed: true,
        notes: ''
      }
    }
    return {}
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email field is required'),
    name: Yup.string().required('Name field is required'),
    phone: Yup.number().typeError('Need to be number.'),
    city: Yup.string(),
    requested_location: Yup.string(),
    requested_event_date: Yup.string(),
    attendees_estimated: Yup.string(),
    contact_allowed: Yup.string(),
    notes: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

FormPartner.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormPartner)
