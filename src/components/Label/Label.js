import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LabelStyled = styled.span`
  min-width: ${props => props.theme.label.minWidth};
  align-self: ${props => props.align};
  justify-self: ${props => props.justify};
  height: min-content;
  width: max-content;
  padding: ${props => props.theme.label.padding};
  background-color: ${props => props.theme.label.pending.backgroundColor};
  color: ${props => props.theme.label.pending.textColor};
  border-radius: ${props => props.theme.label.borderRadius};
  text-align: center;
  font-weight: 700;
  &.active {
    background-color: ${props => props.theme.label.active.backgroundColor};
    color: ${props => props.theme.label.active.textColor};
  }
  &.expired {
    background-color: ${props => props.theme.label.expired.backgroundColor};
    color: ${props => props.theme.label.expired.textColor};
  }
  &.approved {
    background-color: ${props => props.theme.label.completed.backgroundColor};
    color: ${props => props.theme.label.completed.textColor};
  }
  &.requested {
    background-color: ${props => props.theme.label.completed.backgroundColor};
    color: ${props => props.theme.label.completed.textColor};
  }
  &.completed {
    background-color: ${props => props.theme.label.completed.backgroundColor};
    color: ${props => props.theme.label.completed.textColor};
  }
  &.cancelled {
    background-color: ${props => props.theme.label.cancelled.backgroundColor};
    color: ${props => props.theme.label.cancelled.textColor};
  }
`

const Label = props => (
  <LabelStyled
    rounded={props.rounded}
    className={props.className}
    backgroundColor={props.backgroundColor}
    align={props.align}
    justify={props.justify}
  >
    {props.children}
  </LabelStyled>
)

Label.defaultProps = {
  rounded: false,
  children: null,
  className: null,
  backgroundColor: null,
  align: 'center',
  justify: 'center'
}

Label.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  theme: PropTypes.instanceOf(Object).isRequired,
  rounded: PropTypes.bool,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string
}

export default Label
