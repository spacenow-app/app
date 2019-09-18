import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Title, StepButtons, List, Caption, Loader } from 'components'

import { onGetAllCategories } from 'redux/ducks/category'
import { onCreate } from 'redux/ducks/listing'

const CategoryPage = props => {
  const dispatch = useDispatch()

  const {
    get: { location }
  } = useSelector(state => state.location)

  const {
    isLoading: isLoadingCategories,
    get: { categories }
  } = useSelector(state => state.category)

  const {
    create: { isLoading: isLoadingCreating }
  } = useSelector(state => state.listing)

  useEffect(() => {
    if (!categories || categories.length <= 0) dispatch(onGetAllCategories())
  }, [categories, dispatch])

  const [categorySelected, setCategorySelected] = useState(null)

  const [subCategorySelected, setSubCategorySelected] = useState(null)

  const _handleCategoryClick = (_, value) => {
    if (value.itemName === 'Office') {
      setCategorySelected(value)
      setSubCategorySelected(value.subCategories[1])
      return
    }
    setCategorySelected(value)
    setSubCategorySelected(null)
  }

  const _handleSubCategoryClick = (_, value) => {
    setSubCategorySelected(value)
  }

  const _handlerCreateDraft = () =>
    dispatch(onCreate(location.id, subCategorySelected.bookingPeriod.listSettingsParentId, props.history))

  if (!location) {
    props.history.replace('/listing/location')
    return false
  }

  return (
    <Wrapper>
      <Title
        type="h3"
        title="Choose one category"
        subtitle="To list a space you’ll need to put it in the right category. The icons below all have categories drop down once selected. You can click on several to find the right category for your space."
      />
      {isLoadingCategories ? (
        <Loader text="Loading Categories..." />
      ) : (
        <>
          <List
            data={categories.filter(res => res.otherItemName !== 'desk')}
            handleItemClick={_handleCategoryClick}
            itemSelected={categorySelected}
          />
          {categorySelected && categorySelected.subCategories && categorySelected.itemName !== 'Office' && (
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
        </>
      )}
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing/location') }}
        next={{
          disabled: !location || !categorySelected || !subCategorySelected,
          onClick: _handlerCreateDraft,
          isLoading: isLoadingCreating
        }}
      />
    </Wrapper>
  )
}

export default CategoryPage
