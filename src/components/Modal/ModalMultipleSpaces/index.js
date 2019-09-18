import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { withFormik } from 'formik'
import { Button, Title, TextArea, Text, Grid } from 'components'

import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;

  @media(max-width: 576px) {
    margin-top: 30px;
  }
`

const ModalMultipleSpaces = ({
  onConfirm,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  resetForm
}) => {
  const dispatch = useDispatch()

  const _handleSubmit = () => {
    onConfirm(values)
  }

  return (
    <Modal show centered size="lg" onHide={() => { }}>
      <Modal.Header>
        <Modal.Title>
          <Title noMargin type={"h5"} title={"Contact Us to list multiple space"} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WrapperStyled>
          <Box display="grid" gridTemplateColumns={{ _: "1fr", medium: 'auto auto' }} gridGap="30px">
            <SectionStyled>
              <Input
                label="First Name*"
                placeholder="First name"
                name="firstName"
                error={errors.firstName}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SectionStyled>

            <SectionStyled>
              <Input
                label="Last Name*"
                placeholder="Last Name"
                name="lastName"
                error={errors.lastName}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SectionStyled>
          </Box>

          <SectionStyled>
            <Input
              label="Email*"
              placeholder="Email"
              name="email"
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </SectionStyled>

          <Box display="grid" gridTemplateColumns={{ _: "1fr", medium: 'auto auto auto' }} gridGap="30px">
            <SectionStyled>
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                name="phoneNumber"
                error={errors.phoneNumber}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </SectionStyled>
          </Box>
        </WrapperStyled>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => _handleSubmit()} disabled={!isValid}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const formik = {
  displayName: 'FormContactUs',
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    email: Yup.string().required('Email field is required'),
    phoneNumber: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

ModalMultipleSpaces.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  ...withFormik.propTypes
}

export default withFormik(formik)(ModalMultipleSpaces)
