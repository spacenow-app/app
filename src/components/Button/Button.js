import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button as ButtonExternal, Spinner } from 'react-bootstrap'

const ButtonStyled = styled(ButtonExternal)`
  &&& {
    height: 54px;
    border-radius: 37px;
    font-family: 'Montserrat-Medium';
    font-size: 14px;
    width: 180px;
    font-weight: 600;
    background-color: ${props => (props.outline && '#fff') || (props.disabled && '#fff') || '#6adc91'};
    color: ${props => (props.outline && '#172439') || '#fff'};
    border: ${props => (props.outline ? `1px solid #172439` : 'none')};

    :hover {
      &&& {
        background-color: ${props => (props.outline && '#fff') || '#51c482'};
        border: ${props => (props.outline ? `1px solid #6adc91` : 'none')};
        color: ${props => (props.outline && '#6adc91') || '#fff'};
      }
    }
    :focus {
      &&& {
        box-shadow: 0 0 0 0.2rem rgba(106, 220, 145, 0.5);
        background-color: ${props => (props.outline && '#6adc91') || '#2DA577'};
        border: ${props => (props.outline ? `1px solid #6adc91` : 'none')};
        color: #fff;
      }
    }
    :active {
      &&& {
        background-color: #51c482;
        border: #51c482;
      }
    }
    :disabled {
      &&& {
        background-color: ${props => (props.outline ? `#fff` : '#E2E2E2')};
        border: ${props => (props.outline ? `1px solid #CBCBCB` : 'none')};
        color: ${props => (props.outline ? `#E2E2E2` : '#fff')};
        cursor: not-allowed;
      }
    }
  }
`

const Button = ({ children, isLoading, disabled, ...props }) => {
  return (
    <ButtonStyled {...props} disabled={disabled || isLoading}>
      {isLoading && (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      )}
      {!isLoading && children}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  isLoading: false,
  disabled: false
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.string
}

export default Button
