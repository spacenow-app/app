import React from 'react'
import PropTypes from 'prop-types'
import ButtonFacebook from './ButtonFacebook'
import ButtonGoogle from './ButtonGoogle'

const ButtonSocial = props => {
  if (props.google) {
    return <ButtonGoogle {...props} />
  }

  if (props.facebook) {
    return <ButtonFacebook {...props} />
  }
  return null
}

ButtonSocial.defaultProps = {}

ButtonSocial.propTypes = {}

export default ButtonSocial
