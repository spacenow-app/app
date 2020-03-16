import React from 'react'
import { withFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavBar, Wrapper, Box, Input, Button, Text, Title, Link, Line, ButtonSocial } from 'components'
import { signin, googleSignin, facebookSignin } from 'redux/ducks/auth'

const SigninPage = ({ values, touched, errors, handleChange, handleBlur, isValid, history, ...props }) => {
  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.auth)

  const responseFacebook = response => {
    const { state, from } = props.location
    dispatch(facebookSignin(response, from || (state && state.from)))
  }

  const responseGoogle = response => {
    const { state, from } = props.location
    dispatch(googleSignin(response, from || (state && state.from)))
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { state, from } = props.location
    dispatch(signin(values.email, values.password, from || (state && state.from)))
  }

  const handleSignup = e => {
    e.preventDefault()
    const { state } = props.location
    history.push(`/auth/signup`, { from: state && state.from })
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="40px" textAlign="center">
          <Title center type="h3" title="Sign In" />
          <Box display="grid" gridTemplateColumns={{ _: 'none', medium: 'auto auto' }} gridGap="15px">
            <ButtonSocial facebook onResponse={responseFacebook} />
            <ButtonSocial google onResponse={responseGoogle} />
          </Box>
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            or sign in with
          </Text>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridRowGap="15px">
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
              <Button fluid disabled={!isValid} isLoading={isLoading} type="submit">
                Sign In
              </Button>
              <Link to="forgot_password">Forgot password?</Link>
              <Line margin="0" />
              <Text display="block">
                Don't have an account?{' '}
                <Link to="signup" onClick={handleSignup}>
                  Create one now
                </Link>
              </Text>
            </Box>
          </form>
        </Box>
      </Wrapper>
    </>
  )
}

const formik = {
  displayName: 'Authentication_SiginForm',
  mapPropsToValues: () => {
    return {
      email: '',
      password: ''
    }
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
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

export default withFormik(formik)(SigninPage)
