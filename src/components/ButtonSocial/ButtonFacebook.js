import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import styled from 'styled-components'
import { config } from 'variables'
import { ReactComponent as FacebookLogo } from './images/svg_logo_facebook.svg'

const ButtonStyled = styled.button`
  height: 54px;
  border-radius: 37px;
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  font-weight: 600;

  background-color: #4267b2;
  border-color: #4267b2;
  color: #fff;

  :hover {
    background-color: #34528e;
    border-color: #34528e;
    color: #fff;
  }
`

const ButtonSocial = ({ onResponse }) => (
  <FacebookLogin
    appId={config.facebook_app_id}
    fields="name,email,picture"
    callback={onResponse}
    render={renderProps => (
      <ButtonStyled onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <FacebookLogo width="25px" style={{ marginRight: '20px' }} />
        <span>Facebook</span>
      </ButtonStyled>
    )}
  />
)

export default ButtonSocial
