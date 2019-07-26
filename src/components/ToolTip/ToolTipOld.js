import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SpanStyled = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
  background-color: #cbcbcb;
  color: white;
  align-self: center;
  justify-self: end;
  position: relative;
`

const Text = styled.span`
  width: 150px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 5px;
  border-radius: 4px;
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  ${SpanStyled}:hover & {
    display: grid;
  }
`

const Icon = styled.span`
  width: 18px;
  height: 18px;
  display: grid;
  font-weight: 700;
  justify-content: center;
  aling-items: content;
  margin-left: 1px;
`

const ToolTip = props => (
  <SpanStyled {...props}>
    <Icon>?</Icon>
    <Text>{props.children}</Text>
  </SpanStyled>
)

ToolTip.defaultProps = {
  rounded: false,
  children: '',
  align: 'right'
}

ToolTip.propTypes = {
  theme: PropTypes.instanceOf(Object).isRequired,
  rounded: PropTypes.bool,
  children: PropTypes.string,
  align: PropTypes.string
}

export default ToolTip
