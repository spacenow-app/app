import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

const TableStyled = styled.table`
  width: 100%;
  background: #ffffff;
  border-spacing: 0;
  box-shadow: none;
  text-align: left;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
`

const TableHead = styled.thead``

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #f7f7f7;
  }
`

const HeaderCell = styled.th`
  padding: 5px 15px;
  font-size: 12px;
`

const TableBody = styled.tbody`
  color: #939393;
`

const TableCell = styled.td`
  padding: 15px 15px;

  :first-child {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }

  :last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
`

const Table = props => {
  const renderTableHeader = array => {
    const header = Object.keys(array[0])
    return header.map((key, index) => <HeaderCell key={index}>{key}</HeaderCell>)
  }

  const renderTableData = array =>
    array.map((item, index) => (
      <TableRow key={index}>
        {_.map(item, (value, key) => (
          <TableCell key={key}>{value}</TableCell>
        ))}
      </TableRow>
    ))

  if (!props.table.length) {
    return null
  }

  return (
    <TableStyled {...props} className={props.className}>
      <TableHead>
        <TableRow>{renderTableHeader(props.table)}</TableRow>
      </TableHead>
      <TableBody>{renderTableData(props.table)}</TableBody>
    </TableStyled>
  )
}

Table.defaultProps = {
  className: null,
  table: []
}

Table.propTypes = {
  className: PropTypes.string
}

export default Table
