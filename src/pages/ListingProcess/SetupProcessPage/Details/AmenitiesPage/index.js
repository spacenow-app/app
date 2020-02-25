import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Box, Wrapper, Title, StepButtons, Checkbox, Loader } from 'components'

import { onGetAmenities, onGetRules } from 'redux/ducks/listing-process'

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

const AmenitiesPage = ({ listing, values, setFieldValue, handleChange, handleBlur, ...props }) => {
  const dispatch = useDispatch()
  const { object: rules, isLoading: loadingRules } = useSelector(state => state.listing_process.rules)
  const { object: amenities, isLoading: loadingAmenities } = useSelector(state => state.listing_process.amenities)

  useEffect(() => {
    dispatch(onGetAmenities())
    dispatch(onGetRules())
  }, [dispatch])

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  const _handleNext = () => {
    props.setStepCompleted("step3")
    props.history.push(`/listing-process/setup-process/${listing.id}/scene`)
  }

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Details - Amenities" />
        <Box display="grid" gridGap="30px">
          {loadingAmenities && <Loader text="Loading listing process" />}
          {!loadingAmenities && (
            <Box>
              <Title
                type="h3"
                title="Amenities"
                subtitle="What amenities does your space offer guests?"
                subTitleMargin={10}
              />
              <Box
                display="grid"
                gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto auto' }}
                gridGap="30px"
              >
                {[]
                  .concat(amenities)
                  .map((item, index) => loadCheckboxs('amenities', item, index, values, setFieldValue))}
              </Box>
            </Box>
          )}
          {loadingRules && <Loader text="Loading listing process" />}
          {!loadingRules && (
            <Box>
              <Title
                type="h3"
                title="Rules"
                subtitle="Tick any rules you’d like to highlight for your guests."
                subTitleMargin={10}
              />
              <Box display="grid" gridTemplateColumns={{ _: 'auto auto ', medium: 'auto auto auto' }} gridGap="30px">
                {[].concat(rules).map((item, index) => loadCheckboxs('rules', item, index, values, setFieldValue))}
              </Box>
            </Box>
          )}
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.push('detail') }}
          next={{
            onClick: _handleNext
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_AmenityForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      amenities: listing.amenities || [],
      rules: listing.rules || []
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

AmenitiesPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(AmenitiesPage)
