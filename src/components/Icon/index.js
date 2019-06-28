import React from 'react'

import { ReactComponent as SingleSpace } from './svg/single-space.svg'
import { ReactComponent as MultipleSpace } from './svg/multiple-space.svg'

const Icon = props => {
  switch (props.name) {
    case 'single-space':
      return <SingleSpace {...props} />
    case 'multiple-space':
      return <MultipleSpace {...props} />
    default:
      return null
  }
}
export default Icon
