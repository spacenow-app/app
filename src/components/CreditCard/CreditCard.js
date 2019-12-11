/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import { withFormik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import valid from 'card-validator'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'
// import Cards from 'react-credit-cards'
import { Box, Input, Button, Text } from 'components'
import 'react-credit-cards/es/styles-compiled.css'
import { createUserCard, pay } from 'redux/ducks/payment'

const LinkStyled = styled.a`
  color: #6adc91;
`

const ButtonStyled = styled(Button)`
  @media only screen and (max-width: 991px) {
    width: 100% !important;
  }
`

const CreditCard = ({
  onConfirm,
  options,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  listing,
  validateForm,
  setFatherValues,
  isValid,
  dispatch,
  match,
  history,
  setTouched,
  ...props
}) => {
  const { isLoading: isPaying } = useSelector(state => state.payment.pay)
  const { newCard } = useSelector(state => state.payment)
  const { isCreating } = useSelector(state => state.payment.cards)

  useEffect(() => {
    newCard && newCard.id && dispatch(pay(newCard.id, match.params.id, history))
  }, [newCard, match, dispatch, history])

  const _handleInputFocus = e => {
    setFieldValue('focused', e.target.name)
  }

  const _payNow = async () => {
    validateForm()
    setTouched({ name: true, expiry: true, number: true, cvc: true })
    isValid && (await dispatch(createUserCard(values)))
  }

  return (
    <>
      {/* <Cards
        number={values.number}
        name={values.name}
        expiry={values.expiry}
        cvc={values.cvc}
        focused={values.focused}
      /> */}
      <Box mt="25px" gridRowGap="10px" display="grid">
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
        <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="20px">
          <Input
            size="sm"
            label="Expiry"
            placeholder="**/**"
            name="expiry"
            pattern="^\d{2}\/\d{2}$"
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
        <Box mt="30px">
          <Text fontSize="16px">
            I agree to the house rules , cancellation policy and{' '}
            <LinkStyled href="https://spacenow.com/terms-conditions/" target="_blank">
              terms and conditions{' '}
            </LinkStyled>
            of spacenow.
          </Text>
        </Box>
      </Box>
      <Box mt="80px" mb="25px" display="flex">
        <ButtonStyled onClick={_payNow} isLoading={isPaying || isCreating}>
          Confirm and pay
        </ButtonStyled>
      </Box>
    </>
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
        'test-expiry', // this is used internally by yup
        'Expiry date is invalid', // validation message
        value => valid.expirationDate(value).isValid
      )
      .test('test-expiry-format', 'Expiry date is invalid, maybe / is missing', value => /^\d{2}\/\d{2}$/.test(value))
      .required(),
    cvc: Yup.string()
      .min(3)
      .max(4)
      .required(),
    name: Yup.string().required()
  }),
  enableReinitialize: true
}

CreditCard.propTypes = {
  dispatch: PropTypes.any.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  ...withFormik.propTypes
}

export default withFormik(formik)(CreditCard)
