/* eslint-disable max-len */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DropdownBoxStyled = styled.div`
  background: white;
  display: ${props => (props.isOpen ? 'grid' : 'grid')};
  justify-content: ${props => (props.alignRight ? 'right' : 'left')};
  border-radius: ${props => props.theme.dropdown.borderRadius.medium};
  box-shadow: ${props =>
    props.isOpen ? `${props.theme.dropdown.boxShadow.blur} ${props.theme.dropdown.boxShadow.color}` : 'none'};
  padding: ${props => props.theme.dropdown.padding.default};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  min-width: ${props => props.theme.dropdown.minWidth.default};
  width: ${props => (props.isFullWidth ? '100%' : 'max-content')};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`
const DropdownHeaderStyled = styled.div`
  display: grid;
  justify-content: ${props => (props.alignRight ? 'right' : 'left')};
  color: ${props => props.theme.dropdown.color.primary};
`
const DropdownBodyStyled = styled.div`
  display: grid;
  padding-top: ${props => props.theme.dropdown.padding.default};
  justify-content: ${props => (props.alignRight ? 'right' : 'left')};
`

const Dropdown = props => (
  <DropdownBoxStyled
    isOpen={props.isOpen}
    disabled={props.disabled}
    alignRight={props.alignRight}
    isFullWidth={props.isFullWidth}
    className={props.className}
  >
    <DropdownHeaderStyled
      isOpen={props.isOpen}
      alignRight={props.alignRight}
      onClick={e => props.toggle(e, { isOpen: !e.target.isOpen })}
    >
      {props.label} &#9776;
    </DropdownHeaderStyled>
    {props.isOpen ? <DropdownBodyStyled alignRight={props.alignRight}>{props.children}</DropdownBodyStyled> : ''}
  </DropdownBoxStyled>
)

Dropdown.defaultProps = {
  isOpen: false,
  disabled: false,
  alignRight: false,
  isFullWidth: false,
  label: 'Options',
  className: null
}

Dropdown.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  theme: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  alignRight: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
}

export default Dropdown
