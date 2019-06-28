import React from 'react'
import CardIcon from './CardIcon'

const Card = ({ type, ...props }) => {
  switch (type) {
    case 'icon':
      return <CardIcon {...props} />
    default:
      return null
  }
}

export default Card
