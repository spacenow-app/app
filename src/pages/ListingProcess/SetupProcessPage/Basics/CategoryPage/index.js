import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox, Loader } from 'components'

import { onGetRootCategories, onGetCategoryTags } from 'redux/ducks/listing-process'

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

const CategoryPage = ({ listing, values, setFieldValue, handleChange, handleBlur, ...props }) => {
  const dispatch = useDispatch()
  const { object: categories, isLoading: loadingCategories } = useSelector(state => state.listing_process.categories)
  const { object: tags, isLoading: loadingCategoryTags } = useSelector(state => state.listing_process.tags)

  useEffect(() => {
    dispatch(onGetRootCategories())
  }, [dispatch])

  useEffect(() => {
    props.setFatherValues({ ...values })
  }, [props, values])

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
    dispatch(onGetCategoryTags(value))
  }

  const _handleNext = () => {
    props.setStepCompleted("step2")
    props.history.push(`/listing-process/setup-process/${listing.id}/details/specification`)
  }

  return (
    <form>
      <Wrapper>
        <Helmet title="Listing Intro - Spacenow - Steps - Basics - Category" />
        <Box display="grid" gridGap="30px">
          {loadingCategories && <Loader text="Loading root categories" />}
          {!loadingCategories && (
            <Box>
              <Title
                type="h3"
                title="Primary use for the space"
                subtitle="Select the primary use for your pace."
                subTitleMargin={10}
              />
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
                <Select value={values.listSettingsParentId || ""} onChange={_handleSelectChange} name="listSettingsParentId">
                  {[].concat(categories).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
          )}
          {loadingCategoryTags && <Loader text="Loading category" />}
          {!loadingCategoryTags && tags.length > 0 && (
            <Box>
              <Title
                type="h3"
                title="Activities"
                subtitle="What activities are welcome in your space"
                subTitleMargin={10}
              />
              <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
                {[].concat(tags).map((item, index) => loadCheckboxs('tags', item, index, values, setFieldValue))}
              </Box>
            </Box>
          )}
        </Box>
        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.push('space-type') }}
          next={{
            onClick: _handleNext
          }}
        />
      </Wrapper>
    </form>
  )
}

const formik = {
  displayName: 'SetupProcess_CategoryForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      listSettingsParentId: listing.listSettingsParentId,
      tags: listing.tags || []
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

CategoryPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(CategoryPage)
