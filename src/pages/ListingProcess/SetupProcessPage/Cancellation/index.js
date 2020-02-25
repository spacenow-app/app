import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Radio, Loader } from 'components'

import { onGetCancellations } from 'redux/ducks/listing-process'

const CancellationPage = ({ listing, steps, values, setFieldValue, handleBlur, ...props }) => {
  const dispatch = useDispatch()
  const { object: cancellations, isLoading: loadingCancellations } = useSelector(
    state => state.listing_process.cancellations
  )

  useEffect(() => {
    dispatch(onGetCancellations())
  }, [dispatch])

  const _handleRadioChange = (e, { value, name }) => {
    setFieldValue(name, parseInt(value))
  }

  const _handleNext = () => {
    props.setStepCompleted("step8")
    props.history.push(`/listing-process/setup-process/${listing.id}/steps`)
  }

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props.setFatherValues, values])

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Cancellation" />
        <Box display="grid" gridGap="30px">
          {loadingCancellations && <Loader text="Loading cancellations" />}
          {!loadingCancellations && (
            <Box>
              <Title
                type="h3"
                title="Cancellation policies"
                subtitle="Select the best policy for your space."
                subTitleMargin={10}
              />
              <Box display="grid" gridTemplateColumns={{ _: '1fr' }} gridGap="30px">
                {[].concat(cancellations).map((item, index) => (
                  <Box key={index} display="grid" gridTemplateColumns={{ _: 'auto 1fr' }} gridGap="10px">
                    <Radio
                      name="listingData.cancellationPolicy"
                      value={item.id}
                      checked={Number(item.id) === values.listingData.cancellationPolicy}
                      handleChange={_handleRadioChange}
                      handleBlur={handleBlur}
                    />
                    <Title
                      type="h6"
                      title={item.policyName}
                      subtitle={item.policyContent}
                      subTitleMargin={12}
                      mediumBold
                      noMargin
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
        <StepButtons
          prev={{
            disabled: false,
            onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/opening-hours`)
          }}
          next={{
            disabled: false,
            onClick: _handleNext
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_CancellationForm',
  mapPropsToValues: ({ listing }) => {
    return {
      listingData: {
        ...listing.listingData,
        cancellationPolicy: listing.listingData.cancellationPolicy || 1
      }
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

CancellationPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(CancellationPage)
