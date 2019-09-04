import React from 'react'
import { withFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavBar, Wrapper, Box, Input, Button, Text, Title, Link, Line, ButtonSocial } from 'components'
import { signup, googleSignin, facebookSignin } from 'redux/ducks/auth'

const SignupPage = ({ values, touched, errors, handleChange, handleBlur, isValid }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)

  const responseFacebook = response => {
    dispatch(facebookSignin(response))
  }

  const responseGoogle = response => {
    dispatch(googleSignin(response))
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(
      signup(
        {
          first: values.fullName.split(' ')[0],
          last: values.fullName.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$2$3')
        },
        values.email,
        values.password
      )
    )
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width="500px" p="40px" textAlign="center">
          <Title center type="h3" title="Create your account" />
          <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="15px">
            <ButtonSocial facebook onResponse={responseFacebook} />
            <ButtonSocial google onResponse={responseGoogle} />
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
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button fluid="true" disabled={!isValid} isLoading={isLoading} type="submit">
                Create Account
              </Button>

              <Text display="block" fontSize="12px">
                By signing up, you agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                <Link to="/policy"> Privacy Policy</Link>
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
      password: ''
    }
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    fullName: Yup.string()
      .matches(/^[a-zA-Zà-úÀ-Ú][0-9a-zA-Z .,'-]*$/, 'Invalid name')
      .test('has-lastName', 'You forgot to fill in your last name', val => {
        const arrayName = val.split(' ')
        if (!arrayName[1]) {
          return false
        }
        return true
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
      .required()
  }),
  enableReinitialize: true,
  isInitialValid: true
}

export default withFormik(formik)(SignupPage)
