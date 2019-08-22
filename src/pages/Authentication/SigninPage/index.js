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
          <Title center type="h3" title="Sign In" />
          <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="15px">
            <ButtonSocial facebook onResponse={responseFacebook} />
            <ButtonSocial google onResponse={responseGoogle} />
          </Box>
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            or sign in with
          </Text>
          <Box display="grid" gridRowGap="15px">
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Password" type="password" />
            <Button fluid="true">Sign In</Button>
            <Link to="forgot_password">Forgot password?</Link>
            <Line margin="0" />
            <Text display="block">
              Don't have an account? <Link to="signup">Create one now</Link>
            </Text>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default SigninPage
