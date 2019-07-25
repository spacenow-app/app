import React from 'react'
import PropTypes from 'prop-types'
import TimeTableEditable from './TimeTableEditable'
import TimeTableView from './TimeTableView'

const TimeTable = ({ data, editable, ...props }) => {
  if (!data) {
    return 'No Data'
  }
  if (editable) {
    return <TimeTableEditable data={data} {...props} />
  }
  return <TimeTableView data={data} {...props} />
}

TimeTable.propTypes = {
  editable: PropTypes.bool,
  data: PropTypes.instanceOf(Array)
}

export default TimeTable
