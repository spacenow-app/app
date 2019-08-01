import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const baseStyle = css`
  font-family: 'Montserrat-Regular';
  color: ${({ color }) => color || '#707070'};
`

const Large = styled.div`
  font-weight: 600;
  font-size: 30px;
  ${baseStyle};
`

const Medium = styled.div`
  font-weight: 600;
  font-size: 24px;
  ${baseStyle};
`

const Small = styled.div`
  font-size: 22px;
  ${baseStyle};
`

const ExtraSmall = styled.div`
  font-size: 18px;
  ${baseStyle};
`

const ExtraSmallBold = styled.div`
  font-family: 'Montserrat-Bold' !important;
  font-size: 22px;
  color: #172439 !important;
  ${baseStyle};
`

const SubTitle = props => {
  switch (props.type) {
    case 'large':
      return <Large {...props}>{props.children}</Large>
    case 'medium':
      return <Medium {...props}>{props.children}</Medium>
    case 'small':
      return <Small {...props}>{props.children}</Small>
    case 'xSmall':
      return <ExtraSmall {...props}>{props.children}</ExtraSmall>
    case 'xSmallBold':
      return <ExtraSmallBold {...props}>{props.children}</ExtraSmallBold>
    default:
      return <Medium {...props}>{props.children}</Medium>
  }
}

SubTitle.defaultProps = {
  type: 'medium'
}

SubTitle.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['large', 'medium', 'small', 'xSmall', 'xSmallBold'])
}

export default SubTitle
