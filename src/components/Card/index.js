import React from 'react'
import CardIcon from './CardIcon'
import CardHorizontal from './CardHorizontal'
import CardIntro from './CardIntro'

const Card = ({ type, ...props }) => {
  switch (type) {
    case 'icon':
      return <CardIcon {...props} />
    case 'horizontal':
      return <CardHorizontal {...props}>{props.children}</CardHorizontal>
    case 'intro':
      return <CardIntro {...props}>{props.children}</CardIntro>
    default:
      return null
  }
}

Card.Horizontal = CardHorizontal

export default Card
