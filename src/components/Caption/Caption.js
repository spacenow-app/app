import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const baseStyle = css`
  font-family: 'Montserrat-Regular';
  color: #1f252a;
`

const Large = styled.div`
  font-family: 'Montserrat-Medium' !important;
  font-size: 14px;
  font-weight: 500;
  ${baseStyle};
`

const Medium = styled.div`
  font-size: 14px;
  ${baseStyle};
`

const Small = styled.div`
  font-size: 12px;
  ${baseStyle};
`

const Caption = props => {
  switch (props.type) {
    case 'large':
      return <Large {...props}>{props.children}</Large>
    case 'medium':
      return <Medium {...props}>{props.children}</Medium>
    case 'small':
      return <Small {...props}>{props.children}</Small>
    default:
      return <Medium {...props}>{props.children}</Medium>
  }
}

Caption.defaultProps = {
  type: 'medium'
}

Caption.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['large', 'medium', 'small'])
}

export default Caption
