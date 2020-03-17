/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import { useDispatch } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'

import { Title, Input, Select, TextArea, Button, DatePicker, Box } from 'components'

import { onCreateHoytsReferral } from 'redux/ducks/integration'

const FormPartner = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  validateForm,
  isValid,
  ...props
}) => {
  const { listing } = props
  const dispatch = useDispatch()

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleSubmit = () => {
    validateForm().then(() => {
      if (isValid) dispatch(onCreateHoytsReferral(values, listing.id))
    })
  }

  const arrayDesks = ['1-10', '10-20', '20-50', '50-100', '100-1000']
  const arrayHours = ['2', '3', '4', '5', '6']

  return (
    <form>
      <Box display="grid" gridGap="10px">
        <Box>
          <Input
            label="Full Name*"
            placeholder="Your full name"
            name="name"
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Box>
          <Input
            label="Email*"
            placeholder="Email Address"
            name="email"
            error={errors.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Box>
          <Input
            label="Phone"
            placeholder="Phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Box>
          <Title title="Tell us more about your introduction" type="h6" subTitleMargin={0} />
        </Box>

        <Box>
          <Select value={values.pax} name="pax" onChange={_handleSelectChange} label="Number of Desks needed">
            <option>Select a range</option>
            {arrayDesks.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <DatePicker
            label="Requested Move In Date"
            handleDateChange={date => setFieldValue('date', format(date, 'yyyy-MM-dd'))}
            dayPickerProps={{
              disabledDays: [{ before: new Date() }]
            }}
          />
        </Box>

        <Box>
          <Select value={values.time} name="time" onChange={_handleSelectChange} label="Hours">
            <option>Select the hour</option>
            {arrayHours.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <TextArea
            label="Additional notes"
            name="notes"
            error={errors.notes}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>

        <Button width="100%" onClick={() => _handleSubmit()}>
          SUBMIT INTRODUCTION
        </Button>
      </Box>
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
        pax: '',
        date: '',
        time: '',
        notes: ''
      }
    }
    return {}
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email field is required'),
    name: Yup.string().required('Name field is required'),
    phone: Yup.number().typeError('Need to be number.'),
    pax: Yup.string(),
    date: Yup.string(),
    time: Yup.string(),
    notes: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

FormPartner.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormPartner)
