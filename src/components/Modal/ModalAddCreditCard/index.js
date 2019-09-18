import React from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Cards from 'react-credit-cards'
import valid from 'card-validator'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'
import { Box, Input, Button, Title } from 'components'
import 'react-credit-cards/es/styles-compiled.css'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalStyled = styled(Modal)`
  &&& {
    @media (max-width: 576px) {
      .modal-dialog {
        min-width: 100%;
        margin: 0;
      }
      .modal-content {
        border: none !important;
        border-radius: 0 !important;
        min-height: 100vh;
        max-height: 100vh;
        overflow: hidden;
      }
    }
  }
`

const ModalAddBankDetails = ({
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
  ...props
}) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm(values)
    }
  }

  const _handleInputFocus = e => {
    setFieldValue('focused', e.target.name)
  }

  return (
    <ModalStyled show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title><Title noMargin type={"h5"} title={"Add New Credit Card"} /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Cards
          number={values.number}
          name={values.name}
          expiry={values.expiry}
          cvc={values.cvc}
          focused={values.focused}
        />
        <Box mt="25px">
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
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" outline="true" onClick={() => handleConfirm(false)}>
          Cancel
        </Button>
        <Button size="sm" disabled={!isValid} onClick={() => handleConfirm(true)}>
          Add Card
        </Button>
      </Modal.Footer>
    </ModalStyled>
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

export default withFormik(formik)(ModalAddBankDetails)
