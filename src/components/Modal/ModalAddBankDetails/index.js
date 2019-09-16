import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Box, Grid, Cell, Select, Input, DatePicker, Title } from 'components'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

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

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  return (
    <Modal show centered size="lg" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title><Title noMargin type={"h5"} title={"Add Bank Details"} /></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box>
          <Grid columns="12">
            <Cell width={12}>
              <Select
                size="sm"
                label="Account type"
                value={values.accountType}
                name="accountType"
                onChange={_handleSelectChange}
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </Select>
            </Cell>
            <Cell width={6}>
              <Input
                size="sm"
                label="BSB"
                placeholder="BSB number (only numbers)"
                name="bsb"
                error={touched.bsb && errors.bsb}
                value={values.bsb}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={6}>
              <Input
                size="sm"
                label="Account"
                placeholder="Account number (only numbers)"
                name="account"
                error={touched.account && errors.account}
                value={values.account}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={12}>
              <span>Beneficiary details</span> {/* replace for Text components  */}
            </Cell>

            <Cell width={6}>
              <Input
                size="sm"
                label="First Name"
                placeholder="First name"
                name="firstName"
                error={touched.firstName && errors.firstName}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={6}>
              <Input
                size="sm"
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                error={touched.lastName && errors.lastName}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={12}>
              <DatePicker
                size="sm"
                label="Date of Birth"
                name="dateOfBirthday"
                error={touched.dateOfBirthday && errors.dateOfBirthday}
                value={values.dateOfBirthday}
                handleDateChange={date => setFieldValue('dateOfBirthday', date)}
              />
            </Cell>
            {values.accountType === 'company' && (
              <>
                <Cell width={6}>
                  <Input
                    size="sm"
                    label="Business name"
                    placeholder="Business name"
                    name="businessName"
                    error={touched.businessName && errors.businessName}
                    value={values.businessName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Cell>
                <Cell width={6}>
                  <Input
                    size="sm"
                    label="Business Tax ID"
                    placeholder="Business Tax ID"
                    name="businessTaxId"
                    error={touched.businessTaxId && errors.businessTaxId}
                    value={values.businessTaxId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Cell>
              </>
            )}
            <Cell width={12}>
              <Input
                size="sm"
                label="Address"
                placeholder="Address"
                name="address"
                error={touched.address && errors.address}
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={4}>
              <Input
                size="sm"
                label="City"
                placeholder="City"
                name="city"
                error={touched.city && errors.city}
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={4}>
              <Input
                size="sm"
                label="State"
                placeholder="State"
                name="state"
                error={touched.state && errors.state}
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
            <Cell width={4}>
              <Input
                size="sm"
                label="Zip"
                placeholder="Zip"
                name="zip"
                error={touched.zip && errors.zip}
                value={values.zip}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Cell>
          </Grid>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" outline="true" onClick={() => handleConfirm(false)}>
          No
        </Button>
        <Button size="sm" disabled={!isValid} onClick={() => handleConfirm(true)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const formik = {
  displayName: 'Modal_add_bank_details',
  mapPropsToValues: props => ({
    accountType: 'individual',
    bsb: '',
    account: '',
    firstName: '',
    lastName: '',
    dateOfBirthday: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    businessName: '',
    businessTaxId: ''
  }),
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    accountType: Yup.string().required(),
    bsb: Yup.number()
      .positive()
      .required()
      .typeError('BSB must be number'),
    account: Yup.number()
      .positive()
      .required()
      .typeError('Account must be number'),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    dateOfBirthday: Yup.string().required(),
    address: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required()
  }),
  enableReinitialize: true
}

ModalAddBankDetails.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired
  }).isRequired,
  ...withFormik.propTypes
}

export default withFormik(formik)(ModalAddBankDetails)
