import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import Icon from 'components/Icon'

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

const Document = ({ onDrop, ...props }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <DocumentStyled {...getRootProps()}>
      <input {...getInputProps()} />
      <Icon width="40px" fill="#CBCBCB" name="camera" />
    </DocumentStyled>
  )
}

Document.propTypes = {
  onDrop: PropTypes.func.isRequired
}

export default Document
