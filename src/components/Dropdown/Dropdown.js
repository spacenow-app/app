import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Dropdown as DropdownExternal } from 'react-bootstrap'

const DropdownStyled = styled(DropdownExternal)`
  padding: 20px;

  > button {
    background: transparent;
    border: none;

    &:hover, &:active, &:focus {
      background: #6ADC91;
      > span {
        color: #ffffff;
      }
    }
  }

  > div {
    > a {
      font-size: 14px;
    }
  }

`

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownStyled {...props}>
      {children}
    </DropdownStyled>
  )
}

Dropdown.propTypes = {
  children: PropTypes.array
}

export default Dropdown