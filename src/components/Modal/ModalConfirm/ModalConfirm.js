import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../redux/ducks/modal'

const ModalConfirm = ({ onConfirm, options }) => {
  const dispatch = useDispatch()

  const handleConfirm = isConfirmed => {
    dispatch(closeModal)
    onConfirm(isConfirmed)
  }

  return <div>Modal</div>
}

ModalConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
}

export default ModalConfirm
