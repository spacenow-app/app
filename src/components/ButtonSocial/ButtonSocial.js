import React from 'react'
import PropTypes from 'prop-types'
import ButtonFacebook from './ButtonFacebook'
import ButtonGoogle from './ButtonGoogle'

const ButtonSocial = ({ google, facebook, ...props }) => {
  if (google) {
    return <ButtonGoogle {...props} />
  }

  if (facebook) {
    return <ButtonFacebook {...props} />
  }
  return null
}

ButtonSocial.defaultProps = {}

ButtonSocial.propTypes = {
  google: PropTypes.bool,
  facebook: PropTypes.bool
}

export default ButtonSocial
