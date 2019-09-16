/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { convertedDate } from 'utils/date'
import { format } from 'date-fns'
import { Input, Select, TextArea, Button, DatePicker, Box, Link, Text } from 'components'
import { onUpdateProfile } from 'redux/ducks/account'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;

  @media(max-width: 576px) {
    margin-top: 30px;
  }

`

const SectionStyled = styled.div``

const FormContactUs = ({
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
    dispatch(onUpdateProfile(props.user.id, values))
  }

  return (
    <form>
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

        <Button onClick={() => _handleSubmit()} disabled={!isValid}>
          SUBMIT
        </Button>
      </WrapperStyled>
    </form>
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

FormContactUs.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormContactUs)
