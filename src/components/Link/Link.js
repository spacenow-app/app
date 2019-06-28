import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LinkStyled = styled.div`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${props => props.theme.link.baseRadius};
  font-size: ${props => {
    const { baseFontSize } = props.theme.link
    const baseFontSizeParsed = parseInt(baseFontSize, 10)
    return (
      (props.small && `${baseFontSizeParsed * 0.875}px`) ||
      (props.large && `${baseFontSizeParsed * 1.375}px`) ||
      baseFontSize
    )
  }};
  font-weight: ${props => props.theme.link.fontSemibold};
  line-height: ${props => (props.small && '2.2') || (props.large && '1.25') || '2.5'};
  padding: ${props => (props.large ? '16px 25px 17px' : '0 12px')};
  display: grid;
  justify-content: ${props => props.align};
  aling-items: center;
  padding: 6px 12px;
  margin-bottom: 0;
  line-height: 1.42857143;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  user-select: none;
  outline-offset: -2px;
  > a {
    color: ${props =>
      props.disabled ? props.theme.link.default.inactive.textColor : props.theme.link.default.active.textColor};
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    text-decoration: none;
  }
  :hover {
    background-color: ${props => (props.disabled ? 'transparent' : props.theme.link.default.hover.backgroundColor)};
  }
`

const isLeftClickEvent = event => event.button === 0
const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const Link = props => {
  const handleClick = event => {
    if (props.disabled) {
      event.preventDefault()
      return
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    if (event.defaultPrevented === true) {
      return
    }
    if (props.onClick) {
      props.onClick(event)
    }
  }

  return (
    <LinkStyled
      small={props.small}
      large={props.large}
      className={props.className}
      disabled={props.disabled}
      align={props.align}
    >
      <a href={props.to} {...props} onClick={handleClick}>
        {props.children}
      </a>
    </LinkStyled>
  )
}

Link.defaultProps = {
  disabled: false,
  className: null,
  small: false,
  large: false,
  to: null,
  onClick: null,
  align: 'left'
}

Link.propTypes = {
  children: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  theme: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  to: PropTypes.string.isRequired,
  align: PropTypes.string
}

export default Link
