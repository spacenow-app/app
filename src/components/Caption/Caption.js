import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const large = css`
  font-size: 16px;
  font-weight: 500;
`

const medium = css`
  font-size: 14px;
`

const small = css`
  font-size: 12px;
`

const Container = styled.div`
  text-align: ${props => props.centered && 'center'};
  margin: ${props => props.margin && props.margin};
`

const CaptionStyled = styled.span`
  font-family: 'Montserrat-Medium';
  color: #1f252a;
  font-size: 14px;
  ${props => (props.small && small) || (props.medium && medium) || (props.large && large)}
`

const Caption = props => {
  return (
    <Container {...props}>
      <CaptionStyled {...props} />
    </Container>
  )
}

Caption.defaultProps = {
  small: false,
  medium: false,
  large: false
}

Caption.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['large', 'medium', 'small'])
}

export default Caption
