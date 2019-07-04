import React, { Component } from 'react'
import { Wrapper, Title, StepButtons, List, Caption } from 'components'

class CategoryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: [
        {
          id: 1,
          title: 'Business',
          icon: 'category-office',
          subCategories: [
            {
              id: 1,
              title: 'Private Room',
              icon: 'business'
            },
            {
              id: 2,
              title: 'Entire Office',
              icon: 'business'
            },
            {
              id: 3,
              title: 'Coworking',
              icon: 'business'
            }
          ]
        },
        {
          id: 2,
          title: 'Coworking',
          icon: 'category-coworking',
          subCategories: []
        },
        {
          id: 3,
          title: 'Meeting',
          icon: 'category-meeting-room'
        },
        {
          id: 4,
          title: 'Venue',
          icon: 'category-events'
        },
        {
          id: 5,
          title: 'Parking',
          icon: 'category-parking'
        },
        {
          id: 6,
          title: 'Storage',
          icon: 'category-storage'
        },
        {
          id: 7,
          title: 'Desk',
          icon: 'category-desk'
        },
        {
          id: 8,
          title: 'Hospitaly',
          icon: 'category-hospitality'
        }
      ],
      categorySelected: null,
      subCategorySelected: null
    }
  }

  _handleCategoryClick = (e, value) => {
    this.setState({ categorySelected: value, subCategorySelected: null })
  }

  _handleSubCategoryClick = (e, value) => {
    this.setState({ subCategorySelected: value })
  }

  render() {
    const { props } = this
    return (
      <Wrapper>
        <Title
          type="h3"
          title="Choose one category"
          subtitle="To list a space you’ll need to put it in the right category. The icons below all have categories drop down once selected. You can click on several to find the right category for your space."
        />

        <List
          vertical
          data={this.state.category}
          handleItemClick={this._handleCategoryClick}
          itemSelected={this.state.categorySelected}
        />

        {this.state.categorySelected && this.state.categorySelected.subCategories && (
          <>
            <Caption large centered margin="50px 0">
              Select a sub-category
            </Caption>
            <List
              vertical
              circular
              data={this.state.categorySelected.subCategories}
              handleItemClick={this._handleSubCategoryClick}
              itemSelected={this.state.subCategorySelected}
            />
          </>
        )}

        <StepButtons
          prev={{ disabled: false, onClick: () => props.history.goBack() }}
          next={{ disabled: false, onClick: () => props.history.push('/listing/category') }}
        />
      </Wrapper>
    )
  }
}

export default CategoryPage
