import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import defaultPic from './defaultPic.png'

const AvatarStyled = styled.div`
  border-radius: 50%;
  background-image: url(${props => props.src || defaultPic});
  background-color: #f7f7f7;
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover
  width: ${props =>
    (props.small && props.theme.avatar.size.small.width) ||
    (props.large && props.theme.avatar.size.large.width) ||
    props.theme.avatar.size.medium.width};
  height: ${props =>
    (props.small && props.theme.avatar.size.small.height) ||
    (props.large && props.theme.avatar.size.large.height) ||
    props.theme.avatar.size.medium.height};

     @media (max-width: 680px) {
       margin: 0 auto;
   
  }
`

const Avatar = ({ theme, image, small, large }) => {
  return <AvatarStyled theme={theme} src={image} small={small} large={large} />
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
