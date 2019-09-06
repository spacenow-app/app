import React from 'react'
import CardIcon from './CardIcon'
import CardHorizontal from './CardHorizontal'

const Card = ({ type, ...props }) => {
  switch (type) {
    case 'icon':
      return <CardIcon {...props} />
    case 'horizontal':
      return (
        <CardHorizontal {...props}>{props.children}</CardHorizontal>
      )
    default:
      return null
  }
}

Card.Horizontal = CardHorizontal

export default Card