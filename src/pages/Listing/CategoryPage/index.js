import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Wrapper, Title, StepButtons, List, Caption, Loader, Footer } from 'components'

import { onGetRootCategories, onGetCategory } from 'redux/ducks/category'
import { onCreate } from 'redux/ducks/listing'

const CategoryPage = props => {
  const dispatch = useDispatch()

  const {
    get: { location }
  } = useSelector(state => state.location)

  const {
    rootCategories: {
      isLoading: isLoadingCategories,
      object: rootCategories
    },
    category: {
      isLoading: isLoadingCategory,
      object: category
    }
  } = useSelector(state => state.category)

  const {
    create: { isLoading: isLoadingCreating }
  } = useSelector(state => state.listing)

  useEffect(() => {
    if (!rootCategories || rootCategories.length <= 0) dispatch(onGetRootCategories())
  }, [rootCategories, dispatch])

  const [categorySelected, setCategorySelected] = useState(null)

  // const [subCategorySelected, setSubCategorySelected] = useState(null)

  const _handleCategoryClick = (_, value) => {
    setCategorySelected(value)
    dispatch(onGetCategory(value))
    // setSubCategorySelected(null)
  }

  const _handleSubCategoryClick = (_, value) => {
    setCategorySelected(value)
    // setSubCategorySelected(value)
  }

  const _handlerCreateDraft = () =>
    dispatch(onCreate(location.id, categorySelected.id, props.history))

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
              data={rootCategories}
              handleItemClick={_handleCategoryClick}
              itemSelected={categorySelected}
            />
            {categorySelected && isLoadingCategory ? (
              <Loader text="Loading Categories..." />
            ) : (
                <>
                  {category && category.children.length > 0 && (
                    <>
                      <Caption large centered margin="50px 0">
                        Select a sub-category
                    </Caption>
                      <List
                        circular
                        data={category.children}
                        handleItemClick={_handleSubCategoryClick}
                        itemSelected={categorySelected}
                      />
                    </>
                  )}
                </>
              )}
          </>
        )}
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.replace('/listing/location') }}
        next={{
          disabled: !location || !categorySelected,
          onClick: _handlerCreateDraft,
          isLoading: isLoadingCreating
        }}
      />
      <Footer />
    </Wrapper>
  )
}

export default CategoryPage
