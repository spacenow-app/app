import React, { cloneElement } from 'react'
import { ReactComponent as SingleSpace } from './svg/single-space.svg'
import { ReactComponent as MultipleSpace } from './svg/multiple-space.svg'
import { ReactComponent as Business } from './svg/business.svg'

const Icons = {
  'single-space': <SingleSpace />,
  'multiple-space': <MultipleSpace />,
  business: <Business />
}

const Icon = props => {
  if (!props.name) {
    return null
  }
  return cloneElement(Icons[props.name], props)
}
export default Icon
