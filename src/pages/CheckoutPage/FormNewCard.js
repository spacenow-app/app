import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Cards from 'react-credit-cards'
import valid from 'card-validator'
import { Box, Input } from 'components'
import 'react-credit-cards/es/styles-compiled.css'

const FormNewCard = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
  const _handleInputFocus = e => {
    console.log(e.target)
    setFieldValue('focused', e.target.name)
  }

  return (
    <div>
      <Cards
        number={values.number}
        name={values.name}
        expiry={values.expiry}
        cvc={values.cvc}
        focused={values.focused}
      />
      <Input
        size="sm"
        label="Card Number"
        placeholder="0000 0000 0000 0000"
        name="number"
        error={touched.number && errors.number}
        value={values.number}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={_handleInputFocus}
      />
      <Input
        size="sm"
        label="Name"
        placeholder="Your Name Here"
        name="name"
        error={touched.name && errors.name}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={_handleInputFocus}
      />
      <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="20px">
        <Input
          size="sm"
          label="Expiry"
          placeholder="**/**"
          name="expiry"
          pattern="\d\d/\d\d"
          error={touched.expiry && errors.expiry}
          value={values.expiry}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={_handleInputFocus}
        />
        <Input
          size="sm"
          label="CVC"
          placeholder="****"
          name="cvc"
          pattern="\d{3,4}"
          error={touched.cvc && errors.cvc}
          value={values.cvc}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={_handleInputFocus}
        />
      </Box>
    </div>
  )
}

const formik = {
  displayName: 'Form_NewCreditCard',
  mapPropsToValues: props => ({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    number: Yup.string()
      .test(
        'test-number', // this is used internally by yup
        'Credit Card number is invalid', // validation message
        value => valid.number(value).isValid // return true false based on validation
      )
      .required(),
    expiry: Yup.string()
      .test(
        'test-number', // this is used internally by yup
        'Expiry date  invalid', // validation message
        value => valid.expirationDate(value).isValid
      )
      .required(),
    cvc: Yup.string()
      .test(
        'test-number', // this is used internally by yup
        'Expiry date  invalid', // validation message
        value => valid.cvv(value).isValid
      )
      .required(),
    name: Yup.string().required()
  }),
  enableReinitialize: true
}

export default withFormik(formik)(FormNewCard)
