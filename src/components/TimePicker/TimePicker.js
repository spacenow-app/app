import React from 'react'
import PropTypes from 'prop-types'
import TimePickerImported from 'rc-time-picker'
import './rc-time-picker.css'

const TimePicker = props => {
  return (
    <TimePickerImported
      {...props}
      use12Hours
      hideDisabledOptions
      minuteStep={5}
      showSecond={false}
      placeholder="00:00 am"
      allowEmpty={false}
    />
  )
}

TimePicker.defaultProps = {
  children: null
}

TimePicker.propTypes = {
  children: PropTypes.element
}

export default TimePicker
