import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Checkbox, Radio, Loader } from 'components'

import { onGetFeatures } from 'redux/ducks/listing-process'

const loadCheckboxs = (name, item, index, values, setFieldValue) => (
  <Checkbox
    key={index}
    label={item.name}
    name={name}
    value={item.id}
    mediumLabel
    checked={values[name].some(i => i.id === item.id)}
    handleCheckboxChange={e => _handleCheckboxChange(e, values, setFieldValue)}
  />
)

const _handleCheckboxChange = (e, values, setFieldValue) => {
  const { value, name } = e.target
  const find = _.find(values[name], item => item.id === value)
  if (find) {
    const newArray = _.filter(values[name], item => item.id !== value)
    setFieldValue(name, newArray)
    return
  }
  setFieldValue(name, [...values[name], { id: value }])
}

const FeaturePage = ({ listing, values, setFieldValue, handleChange, handleBlur, ...props }) => {
  const dispatch = useDispatch()
  const { object: features, isLoading: loadingFeatures } = useSelector(state => state.listing_process.features)

  useEffect(() => {
    dispatch(onGetFeatures())
  }, [dispatch])

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, listing, values])

  return (
    <Wrapper>
      <form>
        <Box>
          <Title type="h3" title="Style of space" subtitle="What style best describes the space?" subTitleMargin={10} />
          <Box display="grid" gridTemplateColumns={{ _: 'auto', medium: 'auto auto auto' }} gridGap="30px">
            <Radio
              value=""
              name="style"
              checked
              // handleChange={_handleRadioChange}
              label="Luxurious"
              mediumLabel
            />
            <Radio
              value=""
              name="style"
              checked
              // handleChange={_handleRadioChange}
              label="Luxurious"
              mediumLabel
            />
            <Radio
              value=""
              name="style"
              checked
              // handleChange={_handleRadioChange}
              label="Luxurious"
              mediumLabel
            />
          </Box>
        </Box>
        <Box>
          {loadingFeatures && <Loader text="Loading listing process" />}
          {!loadingFeatures && (
            <Box>
              <Title
                type="h3"
                title="Features of the space"
                subtitle="What style best describes the space?"
                subTitleMargin={10}
              />
              <Box
                display="grid"
                gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }}
                gridGap="30px"
              >
                {[]
                  .concat(features)
                  .map((item, index) => loadCheckboxs('features', item, index, values, setFieldValue))}
              </Box>
            </Box>
          )}
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.push('specification') }}
          next={{
            onClick: () => props.history.push('detail')
          }}
        />
      </form>
    </Wrapper>
  )
}

const formik = {
  displayName: 'SetupProcess_FeatureForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      features: listing.features || []
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

FeaturePage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(FeaturePage)
