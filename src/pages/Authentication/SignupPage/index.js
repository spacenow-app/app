import React from 'react'
import { withFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavBar, Wrapper, Box, Input, Button, Text, Title, Link, Line, ButtonSocial, Select, Phone } from 'components'
import { signup, googleSignin, facebookSignin } from 'redux/ducks/auth'
import { config } from 'variables'

const SignupPage = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  isValid,
  setFieldValue,
  validateForm,
  ...props
}) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)

  const responseFacebook = response => {
    const { state } = props.location
    dispatch(facebookSignin(response, (state && state.from) || false, values.userType))
  }

  const responseGoogle = response => {
    const { state } = props.location
    dispatch(googleSignin(response, (state && state.from) || false, values.userType))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { state } = props.location
    const name = values.fullName
    dispatch(
      signup(
        {
          first: name.split(' ')[0],
          last: name.substring(name.indexOf(' '), name.length).trim()
        },
        values.email,
        values.password,
        values.phoneNumber,
        (state && state.from) || false,
        values.userType
      )
    )
  }

  const _handlerGoToLegancy = page => {
    window.location.href = `${config.static}/${page || ''}`
  }

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }

  const _handlePhoneChange = (name, value) => {
    setFieldValue(name, value)
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="40px" textAlign="center">
          <Title center type="h3" title="Create your account" />
          <Box my="25px">
            <Select value={values.userType} name="userType" onChange={_handleSelectChange}>
              <option value="">I would like to...</option>
              <option value="host">List my space and take bookings (host)</option>
              <option value="guest">Find and book spaces</option>
            </Select>
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: 'none', medium: 'auto auto' }} gridGap="15px">
            <ButtonSocial facebook onResponse={responseFacebook} isDisabled={!values.userType} />
            <ButtonSocial google onResponse={responseGoogle} isDisabled={!values.userType} />
          </Box>
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            or sign up with
          </Text>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridRowGap="15px">
              <Input
                placeholder="Full Name"
                type="text"
                name="fullName"
                value={values.fullName}
                error={touched.fullName && errors.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                placeholder="Email Address"
                type="email"
                name="email"
                value={values.email}
                error={touched.email && errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Phone
                country="AU"
                label="Phone Number"
                placeholder="Phone Number"
                name="phoneNumber"
                error={touched.phoneNumber && errors.phoneNumber}
                value={values.phoneNumber}
                onChange={e => _handlePhoneChange('phoneNumber', e)}
              />
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button fluid disabled={!isValid} isLoading={isLoading} type="submit">
                Create Account
              </Button>

              <Text display="block" fontSize="12px">
                By signing up, you agree to the{' '}
                <Link to="" onClick={() => _handlerGoToLegancy('terms-conditions')}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="" onClick={() => _handlerGoToLegancy('privacy-policy')}>
                  {' '}
                  Privacy Policy
                </Link>
              </Text>
              <Line margin="0" />
              <Text display="block">
                Already have an account? <Link to="signin">Sign In</Link>
              </Text>
            </Box>
          </form>
        </Box>
      </Wrapper>
    </>
  )
}

const formik = {
  displayName: 'Authentication_SigupForm',
  mapPropsToValues: () => {
    return {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      userType: ''
    }
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    fullName: Yup.string()
      .matches(/^[a-zA-Zà-úÀ-Ú][0-9a-zA-Z .,'-]*$/, 'Invalid name')
      .test('has-lastName', 'You forgot to fill in your last name', val => {
        if (val) {
          const arrayName = val.split(' ')
          if (!arrayName[1]) {
            return false
          }
          return true
        }
        return false
      })
      .required(),
    email: Yup.string()
      .email('Invalid e-mail address.')
      .required(),
    password: Yup.string()
      .min(8, 'Minimum 8 characteres.')
      .matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
      .required(),
    phoneNumber: Yup.string().required('Phone number field is required'),
    userType: Yup.string().required()
  }),
  enableReinitialize: true,
  isInitialValid: false
}

export default withFormik(formik)(SignupPage)
