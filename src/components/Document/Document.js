import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import Icon from 'components/Icon'
import Text from 'components/Text'

const DocumentStyled = styled.div`
  display: grid;
  height: auto;
  max-height: auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 10px;
  border: dashed 1px #cbcbcb;
  overflow: hidden;
`
const ButtonsStyled = styled.div`
  display: grid;
  height: 40px;
  min-width: 150px;
  font-size: 14px;
  border-radius: 30px;
  border: solid 1px #6adc91;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #6adc91;
`

const Document = ({ onDrop, ...props }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return !props.isButton ? (
    <DocumentStyled {...getRootProps()}>
      <input {...getInputProps()} />
      <Icon width="40px" fill="#CBCBCB" name="camera" />
    </DocumentStyled>
  ) : (
    <ButtonsStyled {...getRootProps()}>
      <input {...getInputProps()} />
      <Text color="white">Add Documents</Text>
    </ButtonsStyled>
  )
}

Document.propTypes = {
  onDrop: PropTypes.func.isRequired,
  isButton: PropTypes.bool
}

export default Document
