/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { format } from 'date-fns'
import { Input, Select, TextArea, Button, Box, Link, Text, DatePicker, Phone } from 'components'

import { onUpdateProfile, onResendLink } from 'redux/ducks/account'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;

  @media (max-width: 576px) {
    margin-top: 30px;
  }
`

const SectionStyled = styled.div``

const FormProfile = ({
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

  const { user } = props

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handlePhoneChange = (name, value) => {
    setFieldValue(name, value)
  }

  const _handleSubmit = () => {
    const profilePayload = { ...values }
    if (values.dateOfBirth) profilePayload.dateOfBirth = format(values.dateOfBirth, 'yyyy-MM-dd')
    dispatch(onUpdateProfile(user.id, profilePayload))
  }

  const _handleResendLink = () => {
    dispatch(onResendLink(user.email))
  }

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          {user.type === 'email' && user.emailConfirmed ? (
            <Input
              label="Email*"
              placeholder="Email"
              name="email"
              value={values.email}
              borderColor={!user.emailConfirmed ? 'warning.0' : 'primary'}
              backgroundColor={!user.emailConfirmed ? 'warning.1' : ''}
              error={!user.emailConfirmed}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ) : (
              <Input
                label="Email"
                placeholder="Email"
                name="email"
                disabled
                value={user.email}
                borderColor={!user.emailConfirmed ? 'warning.0' : 'primary'}
                backgroundColor={!user.emailConfirmed ? 'warning.1' : 'greyscale.4'}
                color={user.emailConfirmed ? 'greyscale.1' : ''}
                error={!user.emailConfirmed}
              />
            )}
          {!user.emailConfirmed && (
            <Text fontSize={12} marginLeft="18px">
              Email not verified{' '}
              <Link color="error" to="#" onClick={() => _handleResendLink()}>
                resend link
              </Link>
            </Text>
          )}
        </SectionStyled>
        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto' }} gridGap="30px">
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

        <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
          <SectionStyled>
            <Phone
              country="AU"
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              error={errors.phoneNumber}
              value={values.phoneNumber}
              onChange={(e) => _handlePhoneChange('phoneNumber', e)}
            // onBlur={handleBlur}
            />
            {/* <Input
              label="Phone Number"
              placeholder="Phone Number"
              name="phoneNumber"
              error={errors.phoneNumber}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
          </SectionStyled>

          <SectionStyled>
            <Select value={values.gender} name="gender" onChange={_handleSelectChange} label="Gender">
              <option value="">Select a gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </SectionStyled>

          <SectionStyled>
            <DatePicker
              label="Date of Birth"
              value={values.dateOfBirth || new Date()}
              handleDateChange={date => setFieldValue('dateOfBirth', date)}
              captionMargin="0 0 .5rem 25px"
            />
          </SectionStyled>
        </Box>

        <SectionStyled>
          <TextArea
            label="About you"
            name="info"
            error={errors.info}
            value={values.info}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </SectionStyled>

        <Button onClick={() => _handleSubmit()} disabled={!isValid}>
          Save
        </Button>
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'FormProfile',
  mapPropsToValues: props => {
    const { user } = props

    if (user.profile) {
      return {
        email: user.email,
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        dateOfBirth: user.profile.dateOfBirth ? new Date(user.profile.dateOfBirth) : new Date(),
        gender: user.profile.gender || '',
        phoneNumber: user.profile.phoneNumber || '',
        info: user.profile.info || ''
      }
    }
    return {}
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email field is required'),
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    dateOfBirth: Yup.date().notRequired(),
    gender: Yup.string().notRequired(),
    phoneNumber: Yup.string().notRequired(),
    info: Yup.string().notRequired()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

FormProfile.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormProfile)
