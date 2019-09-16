import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const WrapperTextArea = styled.div`
  position: relative;
`

const TextAreaStyled = styled.textarea`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  color: #646464;
  padding: 20px;
  width: 100%;
  min-height: 150px;
  border-radius: 15px;
  border: 1px solid #e2e2e2;

  :focus {
    outline: 0px;
    box-shadow: 0 0 0 0.2rem rgba(106, 220, 145, 0.5);
    border-color: #6adc91;
  }
`

const Label = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

const ErrorMessage = styled.small`
  color: #e05252;
  margin-left: 20px;
`

const TextArea = ({ size, label, error, loading, ...props }) => {
  return (
    <WrapperTextArea>
      {label && <Label>{label}</Label>}
      <TextAreaStyled {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </WrapperTextArea>
  )
}

TextArea.defaultProps = {
  label: null
}

TextArea.propTypes = {
  label: PropTypes.string
}

export default TextArea
