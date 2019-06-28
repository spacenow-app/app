import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { TypesModal } from '../../redux/ducks/modal'
import ModalConfirm from './ModalConfirm'

const MODAL_COMPONENTS = {
  [TypesModal.MODAL_TYPE_CONFIRM]: ModalConfirm
}

const Modal = () => {
  const { type, props } = useSelector(state => state.modal)

  if (!type) {
    return null
  }

  const ModalComponent = MODAL_COMPONENTS[type]
  return <ModalComponent {...props} />
}

Modal.propTypes = {
  type: PropTypes.string,
  props: PropTypes.object
}

export default Modal
