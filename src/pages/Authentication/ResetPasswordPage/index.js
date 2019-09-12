import React from 'react'
import { Redirect } from 'react-router-dom'
import { withFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavBar, Wrapper, Box, Input, Button, Text, Title } from 'components'
import { resetPassword } from 'redux/ducks/auth'

const ResetPasswordPage = ({ location, history, values, touched, errors, handleChange, handleBlur, isValid }) => {
  const dispatch = useDispatch()
  const { isLoadingResetPassword } = useSelector(state => state.auth)
  const params = new URLSearchParams(location.search)

  if (!params.has('verify_token')) {
    return <Redirect to="/404" />
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(resetPassword(params.get('verify_token'), values.password, history))
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width={{ _: '100%', medium: '500px' }} p="40px" textAlign="center">
          <Title center type="h3" title="Reset Password" />
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            The password should contain at least 8 characters, 1 uppercase letter, 1 number, 1 symbol like @, # or &
          </Text>
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridRowGap="15px">
              <Input
                placeholder="New Password"
                type="password"
                name="password"
                value={values.password}
                error={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button fluid disabled={!isValid} isLoading={isLoadingResetPassword} type="submit">
                Reset Password
              </Button>
            </Box>
          </form>
        </Box>
      </Wrapper>
    </>
  )
}

const formik = {
  displayName: 'Authentication_ResetPassword',
  mapPropsToValues: () => {
    return {
      password: ''
    }
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(8, 'Minimum 8 characteres.')
      .matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
      .required()
  }),
  enableReinitialize: true
}

export default withFormik(formik)(ResetPasswordPage)
