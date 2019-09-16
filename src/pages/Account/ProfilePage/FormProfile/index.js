/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react'
import styled from 'styled-components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { convertedDate } from 'utils/date'
import { format } from 'date-fns'
import { Input, Select, TextArea, Button, DatePicker, Box, Link, Text } from 'components'
import { onUpdateProfile, onResendLink } from 'redux/ducks/account'

const WrapperStyled = styled.div`
  display: grid;
  grid-row-gap: 40px;

  @media(max-width: 576px) {
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
  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handleSubmit = () => {
    dispatch(onUpdateProfile(props.user.id, values))
  }

  const _handleResendLink = () => {
    dispatch(onResendLink(props.user.email))
  }

  return (
    <form>
      <WrapperStyled>
        <SectionStyled>
          <Input
            label="Email*"
            placeholder="Email"
            name="email"
            disabled
            value={props.user.email}
            borderColor={!props.user.emailConfirmed ? 'warning.0' : 'primary'}
            backgroundColor={!props.user.emailConfirmed ? 'warning.1' : 'greyscale.4'}
            color={props.user.emailConfirmed ? 'greyscale.1' : ''}
            error={!props.user.emailConfirmed}
          />
          {!props.user.emailConfirmed && <Text fontSize={12} marginLeft={'18px'}>Email not verified <Link color={'error'} to={'#'} onClick={() => _handleResendLink()}>resend link</Link></Text>}
        </SectionStyled>
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
              value={values.dateOfBirth}
              handleDateChange={date => setFieldValue('dateOfBirth', format(date, 'dd/MM/yyyy'))}
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
          SUBMIT
        </Button>
      </WrapperStyled>
    </form>
  )
}

const formik = {
  displayName: 'FormProfile',
  mapPropsToValues: props => {
    const { profile } = props.user

    if (profile) {
      return {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        dateOfBirth: convertedDate(new Date(profile.dateOfBirth)) || '',
        gender: profile.gender || '',
        phoneNumber: profile.phoneNumber || '',
        info: profile.info || ''
      }
    }
    return {}
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name field is required'),
    lastName: Yup.string().required('Last name field is required'),
    dateOfBirth: Yup.date(),
    gender: Yup.string(),
    phoneNumber: Yup.string(),
    info: Yup.string()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

FormProfile.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FormProfile)
