import React from 'react'

import { NavBar, Wrapper, Box, Input, Button, Text, Title } from 'components'

const ForgotPasswordPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width="500px" p="40px" textAlign="center">
          <Title center type="h3" title="Forgot Password?" />
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            Enter your account email address and we will send you a link to reset your password.
          </Text>
          <Box display="grid" gridRowGap="15px">
            <Input placeholder="Email Address" type="email" />
            <Button fluid="true">Request Password Reset</Button>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default ForgotPasswordPage
