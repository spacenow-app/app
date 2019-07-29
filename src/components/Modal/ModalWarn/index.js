import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import Button from 'components/Button'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalWarn = ({ onConfirm, options }) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm()
    }
  }

  return (
    <Modal show>
      {options.title && (
        <Modal.Header>
          <Modal.Title>{options.title}</Modal.Title>
        </Modal.Header>
      )}
      {options.text && <Modal.Body>{options.text}</Modal.Body>}
      <Modal.Footer>
        <Button outline="true" onClick={() => handleConfirm(options.handlerCallback)}>
          {options.handlerTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalWarn.propTypes = {
  onConfirm: PropTypes.func,
  options: PropTypes.shape({
    title: PropTypes.string,
    handlerTitle: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    handlerCallback: PropTypes.bool.isRequired
  }).isRequired
}

export default ModalWarn
