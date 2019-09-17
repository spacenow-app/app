import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

import { Title, Button } from 'components'

import { useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalWarn = ({ onConfirm, options }) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal())
    if (isConfirmed) {
      onConfirm && onConfirm()
    }
  }

  return (
    <Modal show onHide={() => handleConfirm(false)}>
      {options.title && (
        <Modal.Header closeButton>
          <Modal.Title>
            <Title noMargin type={'h5'} title={options.title} />
          </Modal.Title>
        </Modal.Header>
      )}
      {options.text && <Modal.Body>{options.text}</Modal.Body>}
      <Modal.Footer>
        <Button sm outline="true" onClick={() => handleConfirm(options.handlerCallback)}>
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
