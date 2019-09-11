/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'
import { isSameDay } from 'date-fns'
import _ from 'lodash'
import moment from 'moment'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const Wrapper = styled.div`
  .CalendarDay__highlighted_calendar {
    background: ${props => props.theme.datePicker.active.backgroundColor};
    color: ${props => props.theme.datePicker.active.textColor};
  }

  .CalendarDay__highlighted_calendar:active,
  .CalendarDay__highlighted_calendar:hover {
    background: ${props => props.theme.datePicker.hover.backgroundColor};
    color: ${props => props.theme.datePicker.hover.textColor};
  }

  .SingleDatePickerInput {
    display: inline-block;
    background-color: ${props => props.theme.datePicker.inputBackgroundColor};
    border-radius: 50px;
    border: none;
    padding: 15px;
  }

  .DateInput {
    width: 100%;
  }

  .DateInput_input {
    padding: 0;
    width: 100%;
    background-color: ${props => props.theme.datePicker.inputBackgroundColor};
    color: ${props => props.theme.datePicker.inputTextColor};
    font-size: 16px;
  }

  .DateInput_input__focused {
    border-bottom: none;
  }

  .CalendarDay__default:hover {
    background: ${props => props.theme.datePicker.hover.backgroundColor};
    color: ${props => props.theme.datePicker.hover.textColor};
    border-color: ${props => props.theme.datePicker.hover.backgroundColor};
  }

  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${props => props.theme.datePicker.selected.backgroundColor};
    border: 1px double ${props => props.theme.datePicker.selected.borderColor};
    color: ${props => props.theme.datePicker.selected.textColor};
  }
`

const DatePicker = props => {
  // eslint-disable-next-line no-underscore-dangle
  const _onDatesChange = date => {
    props.onDateChange(date)
  }

  // eslint-disable-next-line no-underscore-dangle
  const _onFocusChange = focus => {
    props.onFocusChange(focus)
  }

  // eslint-disable-next-line no-underscore-dangle
  const _dayBlock = date => {
    const dateFromCalendar = new Date(date)
    return _.chain(props.arrayOfDayBlocked)
      .map(d => d.weekDay || new Date(d))
      .find(
        dateFromArray =>
          moment.weekdays(moment(date).weekday()) === dateFromArray || isSameDay(dateFromArray, dateFromCalendar)
      )
      .value()
  }

  // eslint-disable-next-line no-underscore-dangle
  const _dayHighLight = date => {
    const dateFromCalendar = new Date(date)
    return _.chain(props.arrayOfDayHighlight)
      .map(d => new Date(d))
      .find(dateFromArray => isSameDay(dateFromArray, dateFromCalendar))
      .value()
  }

  return (
    <Wrapper theme={props.theme}>
      <SingleDatePicker
        {...props}
        required
        hideKeyboardShortcutsPanel
        date={props.date}
        disabled={false}
        readOnly={false}
        focused={props.focus}
        id="date_picker"
        numberOfMonths={1}
        displayFormat="dd/MM/yyyy"
        onDateChange={_onDatesChange}
        onFocusChange={_onFocusChange}
        placeholder={props.placeholder}
        isDayBlocked={_dayBlock}
        isDayHighlighted={_dayHighLight}
      />
    </Wrapper>
  )
}

DatePicker.defaultProps = {
  placeholder: 'Choose date',
  arrayOfDayBlocked: [],
  arrayOfDayHighlight: [],
  date: moment(),
  focus: false
}

DatePicker.propTypes = {
  // eslint-disable-next-line react/require-default-props
  theme: PropTypes.instanceOf(Object),
  arrayOfDayBlocked: PropTypes.instanceOf(Array),
  arrayOfDayHighlight: PropTypes.instanceOf(Array),
  placeholder: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Object),
  focus: PropTypes.bool
}

export default DatePicker
