/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { format, isAfter, isBefore, isSameDay } from 'date-fns'
import update from 'immutability-helper'

import { nanDate, weekTimeTable } from 'contants/dates'

import { onGetAvailabilitiesByListingId, onGetAllHolidays } from 'redux/ducks/listing'

import { Title, Grid, Cell, TimeTable, Calendar, Switch, StepButtons, ToolTip } from 'components'

const SwitchStyled = styled.div`
  justify-self: end;
`

const ItemSwitchStyled = styled.div`
  height: 65px;
  border-radius: 75px;
  border: 1px solid ${({ checked }) => (checked ? '#6adc91' : '#E2E2E2')};
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
`

const TIME_TABLE_INIT_STATE = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  sat: false,
  sun: false,
  all247: false,
  listingAccessHours: []
}

const AvailabilityTab = ({ listing, history, setFatherValues }) => {
  const dispatch = useDispatch()

  const [timetable, setTimeTable] = useState([])
  const [fullTime, setFullTime] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])
  const [holidays, setHolidays] = useState([])
  const [timeTableWeek, setTimeTableWeek] = useState([])

  const { array: availabilitiesArray } = useSelector(state => state.listing.availabilities)
  const { array: holidaysArray } = useSelector(state => state.listing.holidays)

  useEffect(() => {
    const valuesToUpdate = {
      ...listing,
      listingAccessDays: _mapToAccessHourType(timetable),
      listingExceptionDates: selectedDates,
      isValid: true
    }
    setFatherValues(valuesToUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFatherValues])

  useEffect(() => {
    const { accessDays } = listing
    const arrayOutput = []
    for (let i = 0, size = weekTimeTable.length; i < size; i += 1) {
      const o = weekTimeTable[i]
      let elem = {
        day: o.short,
        description: o.name,
        active: false,
        fulltime: false,
        open: new Date(`${format(new Date(), 'MM/DD/YYYY')} 08:00`),
        close: new Date(`${format(new Date(), 'MM/DD/YYYY')} 17:00`),
        error: {}
      }
      if (/true/i.test(accessDays[o.short])) {
        const hoursElem = accessDays.listingAccessHours.find(h => h.weekday === o.index)
        if (hoursElem) {
          const openHour = nanDate(hoursElem.openHour)
          const closeHour = nanDate(hoursElem.closeHour)
          elem = {
            day: o.short,
            description: o.name,
            active: true,
            fulltime: hoursElem.allday,
            open: _formatTime(hoursElem.allday ? new Date(`${format(new Date(), 'MM/DD/YYYY')} 08:00`) : openHour),
            close: _formatTime(hoursElem.allday ? new Date(`${format(new Date(), 'MM/DD/YYYY')} 17:00`) : closeHour),
            error: {}
          }
        }
      }
      arrayOutput.push(elem)
    }
    setTimeTable(arrayOutput)
  }, [listing])

  useEffect(() => {
    dispatch(onGetAvailabilitiesByListingId(listing))
    dispatch(onGetAllHolidays())
  }, [dispatch, listing])

  useEffect(() => {
    _checkFullTime(timetable)
  }, [timetable])

  useEffect(() => {
    setSelectedDates(availabilitiesArray.map(o => new Date(o)))
  }, [availabilitiesArray])

  useEffect(() => {
    const newTimeTableWeek = timetable.map(item => {
      if (!item.active) {
        return weekTimeTable.find(el => el.short === item.day).index
      }
      return undefined
    })
    setTimeTableWeek(newTimeTableWeek.filter(el => el !== undefined))
  }, [timetable])

  const _formatTime = date => {
    const time = format(date, 'HH:mm')
    return new Date(`${format(new Date(), 'MM/DD/YYYY')} ${time}`)
  }

  const _checkFullTime = array => {
    const isFullTime = array.every(el => el.active === true && el.fulltime === true)
    setFullTime(isFullTime)
  }

  const _handleChangeTime = options => {
    const newTime = new Date(`${format(new Date(), 'MM/DD/YYYY')} ${options.value}`)
    const error = {
      open: false,
      close: false
    }
    if (options.name === 'open') {
      error[options.name] = isAfter(newTime, options.item.close)
    }
    if (options.name === 'close') {
      error[options.name] = isBefore(newTime, options.item.open)
    }
    const newArray = update(timetable, {
      [options.index]: { [options.name]: { $set: newTime }, error: { $set: error } }
    })
    setTimeTable(newArray)
  }

  const _handleChangeDay = (_, options) => {
    const index = timetable.findIndex(el => el.day === options.name)
    const newArray = update(timetable, {
      [index]: { active: { $set: options.checked }, fulltime: { $set: false } }
    })
    setTimeTable(newArray)
  }

  const _handleClick24hours = (_, options) => {
    const index = timetable.findIndex(el => `${el.day}-24h` === options.name)
    const newArray = update(timetable, {
      [index]: { fulltime: { $set: options.checked } }
    })
    setTimeTable(newArray)
  }

  const _handleClickOpenFullTime = (_, options) => {
    const is = options.checked
    const newArray = timetable.map(el => ({
      ...el,
      active: is,
      fulltime: is
    }))
    setTimeTable(newArray)
  }

  const _zero = reference => {
    let i = reference
    if (i < 10) {
      i = `0${i}`
    }
    return i
  }

  const _timeToString = time => {
    const h = _zero(time.getHours())
    const m = _zero(time.getMinutes())
    const s = _zero(time.getSeconds())
    return `${h}:${m}:${s}`
  }

  const _getHours = (day, time) => {
    if (!day.fulltime) {
      const now = new Date()
      if (time) {
        const sTime = _timeToString(time).split(':')
        now.setHours(sTime[0], sTime[1], sTime[2])
        return now.getTime().toString()
      }
      now.setHours(0, 0, 0, 0)
      now.setSeconds(time)
      return now.getTime().toString()
    }
    return Date.now().toString()
  }

  const _mapToAccessHourType = payload => {
    const outputObj = JSON.parse(JSON.stringify(TIME_TABLE_INIT_STATE))
    for (let i = 0, size = payload.length; i < size; i += 1) {
      const elem = payload[i]
      outputObj[elem.day] = elem.active
      if (elem.active) {
        const weekDay = weekTimeTable.find(o => o.short === elem.day)
        outputObj.listingAccessHours.push({
          weekday: weekDay.index,
          allday: elem.fulltime,
          openHour: _getHours(elem, elem.open),
          closeHour: _getHours(elem, elem.close)
        })
      }
    }
    return outputObj
  }

  const _onClickSelectDay = (day, { selected }) => {
    const copySelectedDates = [...selectedDates]
    if (selected) {
      const selectedIndex = copySelectedDates.findIndex(selectedDay => isSameDay(selectedDay, day))
      copySelectedDates.splice(selectedIndex, 1)
    } else {
      copySelectedDates.push(day)
    }
    setSelectedDates(copySelectedDates)
  }

  const _onChangeHoliday = (_, { checked, name }) => {
    const newDate = new Date(name)
    const copyHolidays = [...holidays]
    const copySelectedDays = [...selectedDates]
    if (!checked) {
      const selectedIndex = copyHolidays.findIndex(selectedDay => isSameDay(selectedDay, newDate))
      copyHolidays.splice(selectedIndex, 1)
      const selectedIndexDisabledDays = copySelectedDays.findIndex(selectedDay => isSameDay(selectedDay, newDate))
      copySelectedDays.splice(selectedIndexDisabledDays, 1)
    } else {
      copyHolidays.push(newDate)
      copySelectedDays.push(newDate)
    }
    setHolidays(copyHolidays)
    setSelectedDates(copySelectedDays)
  }

  const _onChangeHolidayBlockAll = (_, { checked }) => {
    if (checked) {
      const newarray = holidaysArray.map(el => el.originalDate)
      setHolidays(newarray)
      setSelectedDates([...selectedDates, ...newarray])
      return
    }
    const newArraySelected = selectedDates.filter(el => !holidaysArray.some(hl => isSameDay(hl.originalDate, el)))
    setHolidays([])
    setSelectedDates(newArraySelected)
  }

  return (
    <Grid columns={1} rowGap="80px">
      <Cell>
        <Title type="h3" title="Timetable*" subtitle="Let guests know the times your space is open." />
        <TimeTable
          editable
          data={timetable}
          fullTime={fullTime}
          handleChangeTime={_handleChangeTime}
          handleClickDay={_handleChangeDay}
          handleClick24hours={_handleClick24hours}
          handleClickOpenFullTime={_handleClickOpenFullTime}
        />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Blocked dates"
          subtitle="Block out times when the space is not available within business opening hours."
        />
        <Calendar
          fromMonth={new Date()}
          handleDayClick={_onClickSelectDay}
          selectedDays={selectedDates}
          disabledDays={[]}
          daysOfWeek={timeTableWeek}
        />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Holidays"
          subtitle="Are you closed on all Australian holidays? Or Just a few of them?"
        />
        <Grid columns={12} gap="20px" columnGap="40px" style={{ margin: '30px 0' }}>
          <Cell width={3}>
            <ItemSwitchStyled>
              <span>Block all</span>
              <SwitchStyled>
                <Switch
                  id="blockall"
                  name="blockall"
                  checked={holidaysArray.length === holidays.length}
                  handleCheckboxChange={_onChangeHolidayBlockAll}
                />
              </SwitchStyled>
            </ItemSwitchStyled>
          </Cell>
          {holidaysArray
            .filter(el => {
              if (isAfter(new Date(), new Date(el.date))) {
                return false
              }
              return true
            })
            .map((o, index) => {
              return (
                <Cell key={o.date} width={3}>
                  <ToolTip placement="bottom" content={o.description}>
                    <ItemSwitchStyled>
                      <span>{o.dateFormatted}</span>
                      <SwitchStyled>
                        <Switch
                          id={index}
                          name={o.date}
                          value={o.date}
                          checked={selectedDates.some(selectedDay => isSameDay(selectedDay, o.originalDate))}
                          handleCheckboxChange={_onChangeHoliday}
                        />
                      </SwitchStyled>
                    </ItemSwitchStyled>
                  </ToolTip>
                </Cell>
              )
            })}
        </Grid>
      </Cell>
      <StepButtons
        prev={{ onClick: () => history.push('booking') }}
        next={{ onClick: () => history.push('cancellation') }}
      />
    </Grid>
  )
}

AvailabilityTab.propTypes = {
  listing: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  setFatherValues: PropTypes.instanceOf(Function).isRequired
}

export default AvailabilityTab
