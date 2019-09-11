import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table as TableImported } from 'react-bootstrap'

const TableStyled = styled(TableImported)`
  &&& {
    color: #172439;

    th {
      border-top: none;
    }
  }
`

const Table = ({ children, ...props }) => {
  return <TableStyled {...props}>{children}</TableStyled>
}

Table.defaultProps = {
  className: null
}

Table.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.instanceOf(Array)
  ]),
  className: PropTypes.string
}

export default Table
