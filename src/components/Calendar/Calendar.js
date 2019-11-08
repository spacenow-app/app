import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import DayPicker, { DateUtils } from 'react-day-picker'
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
      color: #172439;
      font-size: 16px;
      // font-family: 'Montserrat-Medium';
    }

    .DayPicker-Week {
      :nth-child(5n) {
        border-bottom: 1px solid #cbcbcb;
      }
    }

    .DayPicker-Months {
      flex-wrap: nowrap;
    }

    .DayPicker-Day {
      width: 50px;
      height: 50px;
      max-height: 50px;
      max-width: 50px;
      font-family: 'Montserrat-Medium';
      font-size: 16px;

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
  }

  @media (max-width: 680px) {
    &&& {
      .DayPicker-Month {
        border-spacing: 0px;
      }
    }
  }
`

const NavBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  width: auto;
  justify-content: space-between;
`

const NavBatItem = styled.div`
  background-color: transparent;
  height: 50px;
  border-radius: 8px;
  color: #172439;
  display: grid;
  align-content: center
    ${props =>
      props.left &&
      css`
        grid-template-columns: auto 1fr;
        > button {
          display: grid;
          grid-column-start: 1;
          grid-row-start: 1;
        }
        > span {
          display: grid;
          grid-column-start: 1;
          grid-column-end: 3;
          grid-row-start: 1;
        }
      `}
    ${props =>
      props.right &&
      css`
        grid-template-columns: 1fr auto;
        > button {
          display: grid;
          grid-column-start: 2;
          grid-column-end: 3;
          grid-row-start: 1;
        }
        > span {
          display: grid;
          grid-column-start: 1;
          grid-column-end: 3;
          grid-row-start: 1;
        }
      `};
`

const ButtonTemp = styled.button`
  width: 50px;
  height: 50px;

  background: transparent;
  border: none;
  font-size: 20px;
  color: #172439;
  border: 1px solid #cbcbcb;
  border-radius: 6px;
  // padding: 0 20px;
`

const TitleTemp = styled.span`
  justify-self: center;
  align-self: center;
  // font-family: 'Montserrat-Bold';
  font-size: 20px;
`

const Navbar = ({ month, onPreviousClick, onNextClick, localeUtils, showPreviousButton, showNextButton }) => {
  return (
    <NavBarContainer>
      <NavBatItem left>
        {showPreviousButton && <ButtonTemp onClick={() => onPreviousClick()}>⟵</ButtonTemp>}
        <TitleTemp>{localeUtils.formatMonthTitle(month)}</TitleTemp>
      </NavBatItem>
      <NavBatItem right>
        <TitleTemp>{localeUtils.formatMonthTitle(DateUtils.addMonths(month, 1))}</TitleTemp>
        {showNextButton && <ButtonTemp onClick={() => onNextClick()}>⟶</ButtonTemp>}
      </NavBatItem>
    </NavBarContainer>
  )
}

const Caption = ({ date }) => {
  return null
}

const Calendar = ({ selectedDays, disabledDays, daysOfWeek, handleDayClick, ...props }) => {
  return (
    <WrapperStyled {...props}>
      <DayPicker
        {...props}
        numberOfMonths={2}
        disabledDays={[
          ...disabledDays.map(el => new Date(el)),
          {
            before: new Date()
          },
          {
            daysOfWeek
          }
        ]}
        selectedDays={selectedDays}
        navbarElement={<Navbar />}
        captionElement={<Caption />}
        onDayClick={handleDayClick}
      />
    </WrapperStyled>
  )
}
Calendar.defaultProps = {
  colorSelected: '#6adc91'
}

Calendar.propTypes = {
  selectedDays: PropTypes.instanceOf(Array),
  disabledDays: PropTypes.instanceOf(Array),
  daysOfWeek: PropTypes.instanceOf(Array),
  handleDayClick: PropTypes.func,
  colorSelected: PropTypes.string
}

export default memo(Calendar, (prevProps, nextProps) => {
  if (
    prevProps.selectedDays.length === nextProps.selectedDays.length ||
    prevProps.disabledDays.length === nextProps.disabledDays.length
  ) {
    return false
  }

  return false
})
