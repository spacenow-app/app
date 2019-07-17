import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'

const WrapperStyled = styled.div`
  &&& {
    .DayPicker,
    .DayPicker-wrapper {
      :focus {
        outline: none;
      }
    }

    .DayPicker-Weekday {
      color: #6adc91;
      font-size: 18px;
      font-family: 'Montserrat-SemiBold';
    }

    .DayPicker-Month {
      border-spacing: 10px;
      border-collapse: separate;
    }

    .DayPicker-Day {
      width: 50px;
      height: 50px;
      max-height: 50px;
      max-width: 50px;
      font-family: 'Montserrat-Medium';
      font-size: 16px;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: #6adc91;
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
      position: relative;
      background-color: #6adc91;
      color: #fff;
    }

    .DayPicker-Day--today {
      color: #6adc91;
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
  }
`

const NavBarContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 1rem;
`

const NavBatItem = styled.div`
  background-color: #6adc91;
  height: 60px;
  border-radius: 30px;
  color: #fff;
  display: grid;
  align-content: center
    ${props =>
      props.left &&
      css`
        grid-template-columns: auto 1fr;
      `}
    ${props =>
      props.right &&
      css`
        grid-template-columns: 1fr auto;
      `};
`

const ButtonTemp = styled.button`
  width: 50px;
  height: 50px;

  background: transparent;
  border: none;
  font-size: 20px;
  color: #fff;
`

const TitleTemp = styled.span`
  justify-self: center;
  align-self: center;
  font-family: 'Montserrat-Bold';
`

const Navbar = ({ month, nextMonth, previousMonth, onPreviousClick, onNextClick, className, localeUtils }) => {
  const months = localeUtils.getMonths()
  return (
    <NavBarContainer>
      <NavBatItem left>
        <ButtonTemp onClick={() => onPreviousClick()}>←</ButtonTemp>
        <TitleTemp>{months[month.getMonth()]}</TitleTemp>
      </NavBatItem>
      <NavBatItem right>
        <TitleTemp>{months[month.getMonth() + 1]}</TitleTemp>
        <ButtonTemp onClick={() => onNextClick()}>→</ButtonTemp>
      </NavBatItem>
    </NavBarContainer>
  )
}

const Caption = ({ date }) => {
  return null
}

const Calendar = props => {
  const [selectedDates, setSelectedDates] = useState([])
  const modifiers = {
    disabled: { daysOfWeek: [1] },
    blockedDates: [new Date(2019, 7, 30), new Date(2019, 7, 28)]
  }

  const handleDayClick = day => {
    setSelectedDates([...selectedDates, day])
  }

  return (
    <WrapperStyled>
      <DayPicker
        selectedDays={selectedDates}
        numberOfMonths={2}
        modifiers={modifiers}
        navbarElement={<Navbar />}
        captionElement={<Caption />}
        onDayClick={handleDayClick}
      />
    </WrapperStyled>
  )
}

Calendar.defaultProps = {
  children: null
}

Calendar.propTypes = {
  children: PropTypes.element
}

export default Calendar
