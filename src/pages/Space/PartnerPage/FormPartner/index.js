/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'

import { Title, Input, Select, TextArea, Button, DatePicker } from 'components'

import {
  onSendHubSpotForm
  // onCreateWeWorkReferral
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
    // TODO: Uncoment when WEWORK API ready
    // dispatch(onCreateWeWorkReferral(values))
    validateForm().then(() => {
      if(isValid)
        dispatch(onSendHubSpotForm(values))
    })
    
  }

  const arrayDesks = ['1-10', '10-20', '20-50', '50-100', '100-1000']

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
          <Title title="Tell us more about your introduction" type="h6" subTitleMargin={0} />
        </SectionStyled>

        <SectionStyled>
          <Input
            label="Company"
            placeholder="Company Name"
            name="company_name"
            error={errors.company}
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <SectionStyled>
          <Select
            value={values.desks_estimated}
            name="desks_estimated"
            onChange={_handleSelectChange}
            label="Number of Desks needed"
          >
            <option>Select a range</option>
            {arrayDesks.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </SectionStyled>

        <SectionStyled>
          <DatePicker
            label="Requested Move In Date"
            handleDateChange={date => setFieldValue('requested_move_in_date', format(date, 'yyyy-MM-dd'))}
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
          SUBMIT INTRODUCTION
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
        requested_move_in_date: '',
        desks_estimated: '',
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
    company_name: Yup.string(),
    requested_move_in_date: Yup.string(),
    desks_estimated: Yup.string(),
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
