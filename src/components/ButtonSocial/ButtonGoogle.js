import React from 'react'
import GoogleLogin from 'react-google-login'
import styled from 'styled-components'
import { ReactComponent as GoogleLogo } from './images/svg_logo_google.svg'

const ButtonStyled = styled.button`
  height: 54px;
  border-radius: 37px;
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  font-weight: 600;

  background-color: #fff;
  border-color: #4285f4;
  color: #4285f4;

  :hover {
    background-color: #4285f4;
    border-color: #4285f4;
    color: #fff;
  }
`

const ButtonSocial = ({ onResponse, onFailure }) => (
  <GoogleLogin
    clientId="152762597368-njh605ktr9eljaloen7nj6pq0lt6mlil.apps.googleusercontent.com" //
    onSuccess={onResponse}
    onFailure={onFailure}
    render={renderProps => (
      <ButtonStyled onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <GoogleLogo width="25px" style={{ background: '#fff', marginRight: '20px' }} />
        Google
      </ButtonStyled>
    )}
  />
)

export default ButtonSocial
