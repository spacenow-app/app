import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const WrapperTextArea = styled.div`
  position: relative;
  .editor-content {
    border-radius: 2px;
    border: 1px solid #f1f1f1;
    padding: 20px;
  }
`

const Label = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 2px;
`

const ErrorMessage = styled.small`
  color: #e05252;
  margin-left: 20px;
`

const toolbar = {
  options: ['inline', 'blockType', 'list', 'textAlign', 'history']
}

const WYSIWYGTextArea = ({ size, label, error, loading, ...props }) => {
  return (
    <WrapperTextArea>
      {label && <Label>{label}</Label>}
      {/* <TextAreaStyled {...props} /> */}
      <Editor toolbar={toolbar} {...props} editorClassName="editor-content" />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </WrapperTextArea>
  )
}

WYSIWYGTextArea.defaultProps = {
  label: null
}

WYSIWYGTextArea.propTypes = {
  label: PropTypes.string
}

export default React.memo(WYSIWYGTextArea)
