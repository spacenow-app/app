import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { TypesModal } from 'redux/ducks/modal'
import ModalConfirm from 'components/Modal/ModalConfirm'
import ModalWarn from 'components/Modal/ModalWarn'
import ModalAddBankDetails from 'components/Modal/ModalAddBankDetails'
import ModalBookingDetails from 'components/Modal/ModalBookingDetails'
import ModalReportListing from 'components/Modal/ModalReportListing'
import ModalAddCreditCard from 'components/Modal/ModalAddCreditCard'

const MODAL_COMPONENTS = {
  [TypesModal.MODAL_TYPE_CONFIRM]: ModalConfirm,
  [TypesModal.MODAL_TYPE_WARN]: ModalWarn,
  [TypesModal.MODAL_ADD_BANK_DETAILS]: ModalAddBankDetails,
  [TypesModal.MODAL_TYPE_REPORT_LISTING]: ModalReportListing,
  [TypesModal.MODAL_TYPE_BOOKING_DETAILS]: ModalBookingDetails,
  [TypesModal.MODAL_TYPE_ADD_CREDIT_CARD]: ModalAddCreditCard
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
  props: PropTypes.instanceOf(Object)
}

export default Modal
