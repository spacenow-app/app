import React from 'react'
import { NavBar, Wrapper, Box, Input, Button, Text, Title } from 'components'

const ResetPasswordPage = ({ location }) => {
  const params = new URLSearchParams(location.search)

  if (!params.has('verify_token')) {
    return <div>invalid token!</div>
  }

  return (
    <>
      <NavBar />
      <Wrapper>
        <Box margin="0 auto" width="500px" p="40px" textAlign="center">
          <Title center type="h3" title="Reset Password" />
          <Text display="block" fontSize="14px" fontFamily="medium" my="15px">
            The password should contain at least 8 characters, 1 uppercase letter, 1 number, 1 symbol like @, # or &
          </Text>
          <Box display="grid" gridRowGap="15px">
            <Input placeholder="New Password" type="password" />
            <Button fluid="true">Reset Password</Button>
          </Box>
        </Box>
      </Wrapper>
    </>
  )
}

export default ResetPasswordPage

// Your password has been reset.
