import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { Button, Title, TextArea } from 'components'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalSendMessage = ({ onConfirm }) => {
  const dispatch = useDispatch()

  const [content, setContent] = useState('')

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm && onConfirm(content)
    }
  }

  const _onchange = e => {
    setContent(e.target.value)
  }

  return (
    <Modal show centered size="lg" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Title noMargin type="h5" title="What would you like to ask the host?" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextArea onChange={_onchange} value={content} name="content" />
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={content === ''} onClick={handleConfirm}>
          Send message
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalSendMessage.propTypes = {
  onConfirm: PropTypes.func.isRequired
}

export default ModalSendMessage
