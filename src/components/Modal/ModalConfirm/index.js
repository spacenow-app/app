import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import Button from 'components/Button'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalConfirm = ({ onConfirm, onCancel, options }) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm()
    }
    if (!isConfirmed) {
      onCancel && onCancel()
    }
  }

  return (
    <Modal show onHide={() => handleConfirm(false)}>
      {options.title && (
        <Modal.Header>
          <Modal.Title>{options.title}</Modal.Title>
        </Modal.Header>
      )}
      {options.text && <Modal.Body>{options.text}</Modal.Body>}
      <Modal.Footer>
        <Button sm outline="true" onClick={() => handleConfirm(false)}>
          {options.buttonCancelText || 'No'}
        </Button>
        <Button sm onClick={() => handleConfirm(true)}>
          {options.buttonConfirmText || 'Yes'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}


ModalConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  options: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    buttonConfirmText: PropTypes.string,
    buttonCancelText: PropTypes.string
  }).isRequired
}

export default ModalConfirm
