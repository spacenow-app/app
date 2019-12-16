import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { Button, Title, TextArea } from 'components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalSyled = styled(Modal)`
  &&& {
    .modal-body {
      padding: 0 50px !important;
    }

    .modal-header {
      padding: 50px;
      padding-bottom: 60px;
    }

    .modal-footer {
      padding: 50px;
      padding-top: 25px;
    }

    // @media (max-width: 768px) {
    //   .modal-dialog {
    //     min-width: 100%;
    //     margin: 0;
    //   }
    //   .modal-content {
    //     border: none !important;
    //     border-radius: 0 !important;
    //     overflow: hidden;
    //   }
    // }
  }
`

const ModalSendMessage = ({
  onConfirm,
  touched,
  errors,
  values,
  handleChange,
  handleBlur,
  resetForm,
  isValid,
  validateForm,
  hostName
}) => {
  const dispatch = useDispatch()

  const { isLoading: isLoadingCreate } = useSelector(state => state.message)

  const handleConfirm = isConfirmed => {
    validateForm()
    isValid && isConfirmed && onConfirm(values.message) && dispatch(closeModal())
    isValid && isConfirmed && resetForm()
  }

  return (
    <ModalSyled show centered size="md" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Title
            noMargin
            type="h7"
            title="Contact your host"
            subtitle={`Tell ${hostName} a little bit about your space requirements.`}
            marginSubTitle={21}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TextArea
          name="message"
          placeholder={`Hi ${hostName}, `}
          error={errors.message}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleConfirm} isLoading={isLoadingCreate} size="sm">
          Send message
        </Button>
      </Modal.Footer>
    </ModalSyled>
  )
}

ModalSendMessage.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  hostName: PropTypes.string.isRequired,
  ...withFormik.propTypes
}

const formik = {
  displayName: 'MessageModal_form',
  mapPropsToValues: props => {
    return {
      message: ''
    }
  },
  validationSchema: Yup.object().shape({
    message: Yup.string().required('Message is required.')
  }),
  enableReinitialize: true,
  isInitialValid: false
}

export default withFormik(formik)(ModalSendMessage)
