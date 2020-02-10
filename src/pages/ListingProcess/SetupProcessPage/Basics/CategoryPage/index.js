import React, { useEffect } from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { withFormik } from 'formik'
import { Wrapper, Box, Title, StepButtons, Select, Checkbox, Loader } from 'components'

import { onGetRootCategories, onGetSubCategories } from 'redux/ducks/listing-process'

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
  const { object: subcategories, isLoading: loadingSubCategories } = useSelector(state => state.listing_process.subcategories)

  useEffect(() => {
    dispatch(onGetRootCategories())
  }, [dispatch])

  const _handleSelectChange = e => {
    const { name, value } = e.target
    setFieldValue(name, value)
    dispatch(onGetSubCategories(value))
  }

  return (
    <Wrapper>
      <form>
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
              <Select value={values.category} onChange={_handleSelectChange} name="category" >
                {[].concat(categories).map((item, index) => (<option key={index} value={item.id}>
                  {item.name}
                </option>))}
              </Select>
            </Box>
          </Box>
        )}
        {loadingSubCategories && <Loader text="Loading category" />}
        {!loadingSubCategories && (
          <Box>
            <Title
              type="h3"
              title="Activities"
              subtitle="What activities are welcome in your space"
              subTitleMargin={10}
            />
            <Box display="grid" gridTemplateColumns={{ _: '1fr', medium: 'auto auto auto' }} gridGap="30px">
            {[].concat(subcategories).map((item, index) => loadCheckboxs('subcategories', item, index, values, setFieldValue))}
            </Box>
          </Box>
        )}
      </Box>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.push('space-type') }}
        next={{
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/details`)
        }}
      />
      </form>
    </Wrapper>
  )
}

const formik = {
  displayName: 'SetupProcess_CategoryForm',
  mapPropsToValues: ({ listing }) => {
    return {
      ...listing,
      category: listing.category || '',
      subcategories: listing.subcategories || []
    }
  },
  enableReinitialize: true,
  isInitialValid: true
}

CategoryPage.propTypes = {
  ...withFormik.propTypes
}

export default withFormik(formik)(CategoryPage)