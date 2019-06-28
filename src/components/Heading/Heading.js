import React from 'react'
import PropTypes from 'prop-types'
import Text from './../Text'

const Heading = props => {
  switch (props.type) {
    case 'large':
      return (
        <Text {...props} fontWeight="bold" fontSize="66px" textColor={props.textColor} padding="0px">
          {props.children}
        </Text>
      )
    case 'medium':
      return (
        <Text {...props} fontWeight="bold" fontSize="56px" textColor={props.textColor} padding="0px">
          {props.children}
        </Text>
      )
    case 'small':
      return (
        <Text {...props} fontWeight="bold" fontSize="46px" textColor={props.textColor} padding="0px">
          {props.children}
        </Text>
      )
    case 'xSmall':
      return (
        <Text {...props} fontWeight="bold" fontSize="36px" textColor={props.textColor} padding="0px">
          {props.children}
        </Text>
      )
    default:
      return (
        <Text {...props} fontWeight="bold" fontSize="56px" textColor={props.textColor} padding="0px">
          {props.children}
        </Text>
      )
  }
}

Heading.defaultProps = {
  type: 'medium',
  textColor: '#172439'
}

Heading.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.oneOf(['large', 'medium', 'small', 'xSmall']),
  textColor: PropTypes.string
}

export default Heading
