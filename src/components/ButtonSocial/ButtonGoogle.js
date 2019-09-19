import React from 'react'
import GoogleLogin from 'react-google-login'
import styled from 'styled-components'
import { config } from 'variables'
import { ReactComponent as GoogleLogo } from './images/svg_logo_google.svg'

const ButtonStyled = styled.button`
  height: 54px;
  border-radius: 8px;
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  font-weight: 600;

  background-color: #fff;
  border-color: #4285f4;
  color: #4285f4;

  :hover {
    border-color: #4285f4;
    background-color: #4285f4;
    color: #ffffff;
  }

  && > svg {
    border-radius: 20px;
    background-color: #ffffff;
  }
`

const ButtonSocial = ({ onResponse, onFailure }) => (
  <GoogleLogin
    clientId={config.google_app_id}
    onSuccess={onResponse}
    onFailure={onFailure}
    render={renderProps => (
      <ButtonStyled onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <GoogleLogo width="25px" style={{ marginRight: '20px' }} />
        Google
      </ButtonStyled>
    )}
  />
)

export default ButtonSocial
