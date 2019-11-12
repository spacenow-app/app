import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { layout } from 'styled-system'
import { useDropzone } from 'react-dropzone'
import defaultPic from './defaultPic.png'

const AvatarStyled = styled.div`
  border-radius: 50%;
  background-image: url(${props => props.src || defaultPic});
  background-color: #ededed;
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-size: cover
  width: ${props => (props.small && '50px') || (props.large && '300px') || '150px'};
  height: ${props => (props.small && '50px') || (props.large && '300px') || '150px'};
  position: relative;
  ${props =>
    props.onDrop !== undefined
      ? `
  &:hover::after {
    content: 'Update';
    color: #fff;
    position: absolute;
    background: rgba(0, 0, 0, .3);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    align-content: center;
    justify-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;
  `
      : ``}
  > input:focus {outline:0;}

     @media (max-width: 680px) {
       margin: 0 auto;

      }

  ${layout}
`

const Avatar = ({ onDrop, image, small, large, ...props }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' })

  return onDrop === undefined ? (
    <AvatarStyled {...props} src={image} small={small} large={large} />
  ) : (
    <AvatarStyled {...props} src={image} small={small} large={large} {...getRootProps()}>
      <input {...getInputProps()} />
    </AvatarStyled>
  )
  // <AvatarStyled {...props} src={image} small={small} large={large} />
}

Avatar.defaultProps = {
  small: false,
  large: false,
  image: defaultPic
}

Avatar.propTypes = {
  onDrop: PropTypes.func,
  theme: PropTypes.instanceOf(Object),
  small: PropTypes.bool,
  large: PropTypes.bool,
  image: PropTypes.string
}

export default Avatar
