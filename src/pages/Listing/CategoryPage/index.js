import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Wrapper, Title, StepButtons, List, Caption } from 'components'

import { onGetAllCategories } from 'redux/ducks/category'
import { onCreate } from 'redux/ducks/listing'

const CategoryPage = props => {
  const dispatch = useDispatch()

  const {
    get: { location }
  } = useSelector(state => state.location)

  const {
    isLoading,
    get: { categories }
  } = useSelector(state => state.category)

  const {
    get: { listing }
  } = useSelector(state => state.listing)

  useEffect(() => {
    if (!categories || categories.length <= 0) dispatch(onGetAllCategories())
  }, [categories, dispatch])

  const [categorySelected, setCategorySelected] = useState(null)

  const [subCategorySelected, setSubCategorySelected] = useState(null)

  const _handleCategoryClick = (_, value) => {
    setCategorySelected(value)
    setSubCategorySelected(null)
  }

  const _handleSubCategoryClick = (_, value) => {
    setSubCategorySelected(value)
  }

  const _handlerCreateDraft = () => dispatch(onCreate(location.id, subCategorySelected.bookingPeriod.listSettingsParentId))

  // Previous location object from Location Step...
  if (!location) {
    props.history.replace('/listing/location')
    return <></>
  }

  if (listing) return <Redirect to={{ pathname: `/listing/space/${listing.id}/specification` }} />

  if (isLoading) return <>Loading...</>

  return (
    <Wrapper>
      <Title
        type="h3"
        title="Choose one category"
        subtitle="To list a space you’ll need to put it in the right category. The icons below all have categories drop down once selected. You can click on several to find the right category for your space."
      />
      <List data={categories} handleItemClick={_handleCategoryClick} itemSelected={categorySelected} />
      {categorySelected && categorySelected.subCategories && (
        <>
          <Caption large centered margin="50px 0">
            Select a sub-category
          </Caption>
          <List
            circular
            data={categorySelected.subCategories}
            handleItemClick={_handleSubCategoryClick}
            itemSelected={subCategorySelected}
          />
        </>
      )}
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.push('/listing/location') }}
        next={{ disabled: !location || !categorySelected || !subCategorySelected, onClick: _handlerCreateDraft }}
      />
    </Wrapper>
  )
}

export default CategoryPage
