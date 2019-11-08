import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { DateUtils } from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns'

import CalendarIcon from 'components/Icon/svg/generic/calendar.svg'

const sizeStyle = {
  sm: css`
    padding: 10px 20px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 8px;
    height: 42px;
  `,
  md: css`
    padding: 10px 20px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 8px;
    height: 54px;
  `,
  lg: css`
    padding: 0.5rem 1rem;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 8px;
  `
}

const WrapperStyled = styled.div`
  &&& {
    .DayPickerInput-Overlay {
      // left: 3px;
      // right: 2px;
      top: 0px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border-radius: 6px;
    }

    .DayPicker,
    .DayPicker-wrapper {
      :focus {
        outline: none;
      }
    }

    .DayPicker-WeekdaysRow {
      display: grid;
      grid-auto-flow: column;
      // grid-gap: 5px;
    }

    .DayPicker-Week {
      display: grid;
      grid-auto-flow: column;
      // grid-gap: 0px;

      :nth-child(5n) {
        border-bottom: 1px solid #cbcbcb;
      }
    }

    .DayPicker-Weekday {
      color: #6adc91;
      font-size: 16px;
      font-family: 'Montserrat-SemiBold';
    }

    .DayPicker-Day {
      width: 40px;
      height: 40px;
      max-height: 40px;
      max-width: 40px;
      font-family: 'Montserrat-Medium';
      font-size: 14px;
      display: grid;
      justify-content: center;
      align-items: center;
      border-radius: 0;
      border: 1px solid #cbcbcb;
      border-bottom: 0;
      :nth-child(n + 2) {
        border-left: 0;
      }
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: ${props => (props.colorSelected ? props.colorSelected : '#6adc91')};
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      position: relative;
      background-color: ${props => (props.colorSelected ? props.colorSelected : '#6adc91')};
      color: #fff;
    }

    .DayPicker-Day--today {
      color: #6adc91;
      :hover {
        color: #fff;
      }
    }

    .DayPicker-Day--blockedDates {
      color: #fff;
      background-color: #e05252;
    }

    .DayPicker-Day--disabled {
      color: #1c3942;
      background-color: #ebebeb;
    }

    .DayPicker-Day--outside {
      color: #1c3942;
      background-color: #fff;
    }

    .DayPickerInput {
      display: block;

      input {
        display: inline-block;
        width: 100%;
        color: rgb(33, 37, 41);
        background-color: ${props => (props.error ? 'rgba(224, 82, 82, 0.1);' : '#ffffff !important')};
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

const Label = styled.label`
  font-size: 12px;
  font-family: 'Montserrat-Medium';
  margin-left: 20px;
`

const DatePicker = forwardRef(
  ({ label, handleDateChange, handleDayPickerHide, dayPickerProps, format, placeholder, value, ...props }, ref) => {
    const formatDate = (date, formatFunc, locale) => {
      return dateFnsFormat(date, formatFunc, { locale })
    }

    const parseDate = (str, formatFunc, locale) => {
      const date = str.split('/')
      if (str.length >= 10) {
        const parsed = dateFnsParse(`${date[2]}-${date[1]}-${date[0]}`, formatFunc, { locale })
        if (DateUtils.isDate(parsed)) {
          return parsed
        }
        return undefined
      }
      return undefined
    }
    const hola = true
    return (
      <WrapperStyled {...props}>
        {label && <Label>{label}</Label>}
        <DayPickerInput
          {...props}
          ref={ref}
          value={value}
          placeholder={placeholder}
          format={format}
          parseDate={parseDate}
          formatDate={formatDate}
          onDayChange={handleDateChange}
          onDayPickerHide={handleDayPickerHide}
          dayPickerProps={{
            ...dayPickerProps
          }}
        />
      </WrapperStyled>
    )
  }
)

DatePicker.defaultProps = {
  size: 'md',
  format: 'dd/MM/yyyy',
  placeholder: 'Choose Date',
  colorSelected: '#6adc91'
}

DatePicker.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  colorSelected: PropTypes.string
}

export default DatePicker
