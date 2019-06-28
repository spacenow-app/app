import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageStyled = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  max-height: ${props => props.height}px;
  overflow: hidden;
  object-fit: cover;

  > img {
    object-fit: cover;
  }
`

const Image = props => (
  <ImageStyled {...props} onClick={e => props.handleClick(e)}>
    {props.src ? (
      <img src={props.src} alt={props.alt} width="100%" height="100%" />
    ) : (
      <svg
        width={props.width}
        height={props.height}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`A generic square placeholder image with a white border around it, making it resemble a photograph taken with an old instant camera: ${
          props.width
        }x${props.height}`}
      >
        <rect width="100%" height="100%" fill="#868e96" />
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
          {props.width}x{props.height}
        </text>
      </svg>
    )}
  </ImageStyled>
)

Image.defaultProps = {
  handleClick: null,
  src: '',
  alt: '...',
  width: 250,
  height: 200
}

Image.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  theme: PropTypes.instanceOf(Object).isRequired,
  handleClick: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image
