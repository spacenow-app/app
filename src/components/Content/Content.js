import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const baseStyle = css`
  font-family: 'Montserrat-Regular';
  color: #172439;
`

const Large = styled.div`
  font-size: 18px;
  font-weight: 600;
  ${baseStyle};
`

const Medium = styled.div`
  font-size: 18px;
  ${baseStyle};
`

const MediumItalic = styled.div`
  font-size: 18px;
  font-style: italic;
  ${baseStyle};
`

const Small = styled.h4`
  font-size: 16px;
  ${baseStyle};
`

const Content = props => {
  switch (props.type) {
    case 'large':
      return <Large>{props.children}</Large>
    case 'medium':
      return <Medium>{props.children}</Medium>
    case 'italic':
      return <MediumItalic>{props.children}</MediumItalic>
    case 'small':
      return <Small>{props.children}</Small>
    default:
      return <Medium>{props.children}</Medium>
  }
}

Content.defaultProps = {
  type: 'medium'
}

Content.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.oneOf(['large', 'medium', 'italic', 'small'])
}

export default Content
