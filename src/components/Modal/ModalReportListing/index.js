import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import { withFormik } from 'formik'
import { Button, Radio, TextArea, Text, Grid, Title } from 'components'

import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from 'redux/ducks/modal'

const ModalReportListing = ({
  onConfirm,
  values,
  setFieldValue,
  handleChange,
  handleBlur,
  resetForm
}) => {
  const dispatch = useDispatch()

  const { isLoading: isSendingEmail } = useSelector(state => state.mail)

  const [stepOne, setStepOne] = useState(true)
  const [stepTwo, setStepTwo] = useState(false)

  const _handleNextButton = () => {
    setStepOne(false)
    setStepTwo(true)
  }

  const _handleBackButton = () => {
    setStepOne(true)
    setStepTwo(false)
  }

  const _handleCancelButton = () => {
    resetForm()
    dispatch(closeModal())
  }

  const _handleRadioChange = (value) => {
    setFieldValue('reportDetails', value)
  }

  const _handleSubmit = () => {
    onConfirm(values)
  }

  return (
    <Modal show centered size="lg" onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Title noMargin type={"h5"} title={"Why are you reporting this space?"} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Grid columns={1} rowGap={'20px'}>
          <Text>Don’t worry, this won’t be shared the host.</Text>
          {stepOne &&
            <>
              <Radio
                name="reportDetails"
                value={values.reportDetails}
                label='It is inaccurate or incorrect.'
                checked={values.reportDetails === 'It is inaccurate or incorrect.'}
                handleChange={() => _handleRadioChange('It is inaccurate or incorrect.')}
              />
              <Radio
                name="reportDetails"
                value={values.reportDetails}
                label='It is not a real place.'
                checked={values.reportDetails === 'It is not a real place.'}
                handleChange={() => _handleRadioChange('It is not a real place.')}
              />
              <Radio
                name="reportDetails"
                value={values.reportDetails}
                label='It is a scam.'
                checked={values.reportDetails === 'It is a scam.'}
                handleChange={() => _handleRadioChange('It is a scam.')}
              />
              <Radio
                name="reportDetails"
                value={values.reportDetails}
                label='It is offensive.'
                checked={values.reportDetails === 'It is offensive.'}
                handleChange={() => _handleRadioChange('It is offensive.')}
              />
              <Radio
                name="reportDetails"
                value={values.reportDetails}
                label='It is something else.'
                checked={values.reportDetails === 'It is something else.'}
                handleChange={() => _handleRadioChange('It is something else.')}
              />
            </>
          }
          {stepTwo &&
            <>
              <Text fontFamily="Montserrat-Bold" marginTop="10px" fontSize="14px">Describe how {values.reportDetails}</Text>
              <TextArea
                name="reportMessage"
                placeholder="Ex: The images do not match the real space."
                value={values.reportMessage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </>
          }
        </Grid>
      </Modal.Body>
      <Modal.Footer>
        <Button
          outline
          onClick={stepOne ? _handleCancelButton : _handleBackButton}
        >
          {stepOne ? 'Cancel' : 'Back'}
        </Button>
        <Button
          disabled={stepOne ? !values.reportDetails : !values.reportMessage}
          onClick={stepOne ? _handleNextButton : _handleSubmit}
          isLoading={stepOne ? false : isSendingEmail}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const formik = {
  displayName: 'Modal_report_listing',
  mapValuesToPayload: x => x,
  enableReinitialize: true
}

ModalReportListing.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  ...withFormik.propTypes
}

export default withFormik(formik)(ModalReportListing)
