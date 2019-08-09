import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import dateFnsFormat from 'date-fns/format'

import { Caption } from 'components'
import CalendarIcon from 'components/Icon/svg/generic/calendar.svg'

const sizeStyle = {
  sm: css`
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 37px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 37px;
    height: 50px;
  `,
  lg: css`
    padding: 0.5rem 1rem;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 37px;
  `
}

const WrapperStyled = styled.div`
  &&& {
    .DayPickerInput {
      display: block;

      input {
        display: inline-block;
        width: 100%;
        color: rgb(33, 37, 41);
        background-color: ${props => (props.error ? 'rgba(224, 82, 82, 0.1);' : '#ffffff')};
        border-width: 1px;
        border-color: ${props => (props.error ? '#e05252' : '#ebebeb')};
        border-style: solid;
        transition: color 0.2s ease-in-out 0s, border-style 0.2s ease-in-out 0s, border-color 0.2s ease-in-out 0s,
          visibility 0.2s ease-in-out 0s, background 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s,
          text-decoration 0.2s ease-in-out 0s, box-shadow 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s,
          opacity 0.2s ease-in-out 0s;
        background: url(${CalendarIcon}) right no-repeat;
        padding-right: 17px;
        background-position: 95%;
        background-size: 18px;

        ${props => props.size && sizeStyle[props.size] && sizeStyle[props.size]};

        :focus {
          outline: 0px;
          box-shadow: 0 0 0 0.2rem ${props => (props.error ? 'rgba(224, 82, 82, 0.5)' : 'rgba(106, 220, 145, 0.5)')};
          border-color: ${props => (props.error ? '#e05252' : '#6adc91')};
        }
      }
    }
  }
`

const DatePicker = forwardRef(({ label, handleDateChange, dayPickerProps, format, placeholder, value,...props }, ref) => {
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale })
  }

  return (
    <WrapperStyled {...props}>
      {label && <Caption margin="10px 0">{label}</Caption>}
      <DayPickerInput
        ref={ref}
        value={value}
        placeholder={placeholder}
        format={format}
        formatDate={formatDate}
        // parseDate={parseDate}
        dayPickerProps={dayPickerProps}
        onDayChange={handleDateChange}
      />
    </WrapperStyled>
  )
})

DatePicker.defaultProps = {
  size: 'md',
  format: 'DD/MM/YYYY',
  placeholder: `${dateFnsFormat(new Date(), 'DD/MM/YYYY')}`
}

DatePicker.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default DatePicker
