/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
// import React, { useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
// import { DateUtils } from 'react-day-picker'

// import { Input, TextArea, Button, DatePicker } from 'components'

import { Input, TextArea, Button } from 'components'

import { onSendHubSpotForm } from 'redux/ducks/integration'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
`

const SectionStyled = styled.div``

const GenericForm = ({
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
  const _handleSubmit = () => {
    dispatch(onSendHubSpotForm(values))
  }

  // const [from, setFrom] = useState(undefined)
  // const [to, setTo] = useState(undefined)
  // const [range, setRange] = useState(undefined)
  // const modifiers = { start: from, end: to }

  // const _handleDayClick = day => {
  //   const rangeInput = DateUtils.addDayToRange(day, range)
  //   let fullDate = format(rangeInput.from, 'dd-MM-yyyy')
  //   if (rangeInput.from && rangeInput.to)
  //     fullDate = `${format(rangeInput.from, 'dd-MM-yyyy')} to ${format(rangeInput.to, 'dd-MM-yyyy')}`

  //   setFieldValue('requested_move_in_date', fullDate)
  //   setRange(rangeInput)
  //   setFrom(rangeInput.from)
  //   setTo(rangeInput.to)
  // }

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          <Input
            // label="Full Name*"
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
            // label="Email*"
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
            // label="Phone"
            placeholder="Phone"
            name="phone"
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        {/* <SectionStyled>
          <DatePicker
            label="Dates"
            handleDateChange={date => _handleDayClick(date)}
            hideOnDayClick={false}
            placeholder="Choose Dates"
            inputProps={{ readOnly: true }}
            dayPickerProps={{
              disabledDays: [{ before: new Date() }],
              numberOfMonths: 1,
              selectedDays: [from, { from, to }],
              modifiers: { modifiers }
            }}
          />
        </SectionStyled> */}

        <SectionStyled>
          <TextArea
            // label="Notes"
            placeholder="Message"
            name="notes"
            error={errors.notes}
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <Button width="100%" onClick={() => _handleSubmit()} disabled={!isValid}>
          ENQUIRE
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
        requested_move_in_date: format(new Date(), 'dd-MM-yyyy'),
        notes: ''
      }
    }
    return {}
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email field is required'),
    name: Yup.string().required('Name field is required'),
    phone: Yup.number().required('Phone field is required'),
    requested_move_in_date: Yup.string(),
    notes: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

GenericForm.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(GenericForm)
