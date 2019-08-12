import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { layout } from 'styled-system'
import defaultPic from './defaultPic.png'

const AvatarStyled = styled.div`
  border-radius: 50%;
  background-image: url(${props => props.src || defaultPic});
  background-color: #f7f7f7;
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover
  width: ${props => (props.small && '50px') || (props.large && '300px') || '150px'};
  height: ${props => (props.small && '50px') || (props.large && '300px') || '150px'};

     @media (max-width: 680px) {
       margin: 0 auto;

  }

  ${layout}
`

const Avatar = ({ image, small, large, ...props }) => {
  return <AvatarStyled {...props} src={image} small={small} large={large} />
}

Avatar.defaultProps = {
  small: false,
  large: false,
  image: defaultPic
}

Avatar.propTypes = {
  theme: PropTypes.instanceOf(Object),
  small: PropTypes.bool,
  large: PropTypes.bool,
  image: PropTypes.string
}

export default Avatar
