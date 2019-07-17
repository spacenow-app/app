import React from 'react'
import PropTypes from 'prop-types'
import TimeTableEditable from './TimeTableEditable'
import TimeTableView from './TimeTableView'

const TimeTable = ({ editable, ...props }) => {
  if (editable) {
    return <TimeTableEditable {...props} />
  }
  return <TimeTableView {...props} />
}

export default TimeTable
