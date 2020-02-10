import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Radio, Loader } from 'components'

import { onGetCancellations } from 'redux/ducks/listing-process'

const CancellationPage = ({ listing, values, setFieldValue, handleChange, handleBlur, ...props }) => {

  const dispatch = useDispatch()
  const { object: cancellations, isLoading: loadingCancellations } = useSelector(state => state.listing_process.cancellations)

  useEffect(() => {
    dispatch(onGetCancellations())
  }, [dispatch])

  return (
    <form>
    <Wrapper>
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
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
              {[].concat(cancellations).map((item, index) => (
                <Box key={index} display="grid" gridTemplateColumns={{ _: 'auto 1fr'}} gridGap="10px">
                  <Radio
                    name="listingData.cancellationPolicy"
                    value={item.id}
                    checked={item.id === values.listingData.cancellationPolicy}
                    handleChange={handleChange}
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
          // disabled: !location,
          onClick: () => props.history.push('/listing-process/view/357')
          // isLoading: isLoadingCreating
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
        cancellationPolicy: listing.listingData.cancellationPolicy || 1,
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
