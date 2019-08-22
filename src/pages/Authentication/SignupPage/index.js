import React from 'react'

import { NavBar, Wrapper, Box, Input, Button, Text, Title, Link, Line, ButtonSocial } from 'components'

const SigninPage = () => {
  const responseFacebook = response => {
    console.log('facebook res -> ', response)
  }

  const responseGoogle = response => {
    console.log('google res -> ', response)
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
          <Box display="grid" gridRowGap="15px">
            <Input placeholder="Full Name" type="text" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Password" type="password" />
            <Button fluid="true">Create Account</Button>

            <Text display="block" fontSize="12px">
              By signing up, you agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/policy"> Privacy Policy</Link>
            </Text>
            <Line margin="0" />
            <Text display="block">
              Already have an account? <Link to="signin">Sign In</Link>
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default SigninPage
