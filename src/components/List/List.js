import React from 'react'
import ListCategory from './ListCategory'

const List = props => {
  if (props.vertical) {
    return <ListCategory {...props} />
  }
}

export default List
