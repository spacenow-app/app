import React from 'react'
import { withFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { NavBar, Wrapper, Box, Input, Button, Text, Title } from 'components'
import { resetPassword } from 'redux/ducks/auth'

const ForgotPasswordPage = ({ history, values, touched, errors, handleChange, handleBlur, isValid }) => {
  const dispatch = useDispatch()
  const { isLoadingResetPassword } = useSelector(state => state.auth)

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(resetPassword(values.email, history))
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width="500px" p="40px" textAlign="center">
          <Title center type="h3" title="Forgot Password?" />
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            Enter your account email address and we will send you a link to reset your password.
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
              <Button fluid disabled={!isValid} isLoading={isLoadingResetPassword} type="submit">
                Request Password Reset
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
      email: ''
    }
  },
  mapValuesToPayload: x => x,
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid e-mail address.')
      .required()
  }),
  enableReinitialize: true
}

export default withFormik(formik)(ForgotPasswordPage)
