import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  justify-items: center;
  height: calc(100vh - 78px);
  grid-row-gap: 15px;
`

const LoaderIcon = styled.i`
  position: relative;
  height: 50px;
  width: 50px;
  display: inline-block;
  animation: around 5.4s infinite;

  ::after,
  ::before {
    content: '';
    background: white;
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-width: 3px;
    border-color: #6adc91 #6adc91 transparent transparent;
    border-style: solid;
    border-radius: 100%;
    box-sizing: border-box;
    top: 0;
    left: 0;
    animation: around 0.7s ease-in-out infinite;
  }

  @keyframes around {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const TextStyled = styled.span`
  color: #172439;
  font-family: 'Montserrat-Medium';
  font-size: 16px;
`

const Loader = ({ text }) => {
  return (
    <WrapperStyled>
      <LoaderIcon />
      {text && <TextStyled>{text}</TextStyled>}
    </WrapperStyled>
  )
}

Loader.defaultProps = {
  text: null
}

Loader.propTypes = {
  text: PropTypes.string
}

export default Loader
