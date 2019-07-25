import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { format, isAfter, isBefore, isSameDay } from 'date-fns'
import update from 'immutability-helper'

import { nanDate } from 'contants/dates'

import { onUpdate, onGetAvailabilitiesByListingId, onGetAllHolidays } from 'redux/ducks/listing'

import { Title, Grid, Cell, TimeTable, Calendar, Switch, StepButtons } from 'components'

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

const timeTableInitialState = {
  mon: false,
  tue: false,
  wed: false,
  thu: false,
  fri: false,
  sat: false,
  sun: false,
  all247: false,
  listingAccessHours: []
}

const AvailabilityTab = props => {
  const dispatch = useDispatch()

  const [timetable, setTimeTable] = useState([])
  const [fullTime, setFullTime] = useState(false)
  const [selectedDates, setSelectedDates] = useState([])
  const [disabledDays, setDisabledDays] = useState([])
  const [holidays, setHolidays] = useState([])
  const { array: availabilitiesArray } = useSelector(state => state.listing.availabilities)
  const { array: holidaysArray } = useSelector(state => state.listing.holidays)

  useEffect(() => {
    setTimeTable(convertedDataToArrayTimetable(props.listing.accessDays))
    dispatch(onGetAvailabilitiesByListingId(props.listing.id))
    dispatch(onGetAllHolidays())
  }, [dispatch, props])

  useEffect(() => {
    checkFullTime(timetable)
  }, [timetable])

  useEffect(() => {
    setDisabledDays(availabilitiesArray)
  }, [availabilitiesArray]) // eslint-disable-line no-console

  const convertedDataToArrayTimetable = array => {
    const TIME_TABLE_SHORT_NAME = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const TIME_TABLE_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const accessHours = array.listingAccessHours

    const arrayOutput = []

    const formatTime = date => {
      const time = format(date, 'HH:mm')
      return new Date(`${format(new Date(), 'MM/DD/YYYY')} ${time}`)
    }

    for (let i = 0; i <= 6; i += 1) {
      let elem = {}
      const access = accessHours.find(l => l.weekday === i)
      if (access) {
        const openHour = nanDate(access.openHour)
        const closeHour = nanDate(access.closeHour)
        elem = {
          day: TIME_TABLE_SHORT_NAME[i],
          description: TIME_TABLE_WEEK_DAYS[i],
          active: true,
          fulltime: access.allday,
          open: formatTime(access.allday ? new Date(`${format(new Date(), 'MM/DD/YYYY')} 08:00`) : openHour),
          close: formatTime(access.allday ? new Date(`${format(new Date(), 'MM/DD/YYYY')} 17:00`) : closeHour),
          error: {}
        }
      } else {
        elem = {
          day: TIME_TABLE_SHORT_NAME[i],
          description: TIME_TABLE_WEEK_DAYS[i],
          active: false,
          fulltime: false,
          open: new Date(`${format(new Date(), 'MM/DD/YYYY')} 08:00`),
          close: new Date(`${format(new Date(), 'MM/DD/YYYY')} 17:00`),
          error: {}
        }
      }
      arrayOutput.push(elem)
    }
    return arrayOutput
  }

  const checkFullTime = array => {
    const isFullTime = array.every(el => el.active === true)
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

  const _handleChangeDay = (e, options) => {
    const index = timetable.findIndex(el => el.day === options.name)
    const newArray = update(timetable, {
      [index]: { active: { $set: options.checked }, fulltime: { $set: false } }
    })
    setTimeTable(newArray)
  }

  const _handleClick24hours = (e, options) => {
    const index = timetable.findIndex(el => `${el.day}-24h` === options.name)
    const newArray = update(timetable, {
      [index]: { fulltime: { $set: options.checked } }
    })
    setTimeTable(newArray)
  }

  const _handleClickOpenFullTime = (e, options) => {
    const newArray = timetable.map(el => ({
      ...el,
      active: options.checked,
      fulltime: false
    }))
    setTimeTable(newArray)
  }

  const _isOldHoliday = originalDate => Date.now() > originalDate.getTime()

  const zero = reference => {
    let i = reference
    if (i < 10) {
      i = `0${i}`
    }
    return i
  }

  const formatTime = time => {
    const h = zero(time.getHours())
    const m = zero(time.getMinutes())
    const s = zero(time.getSeconds())
    return `${h}:${m}:${s}`
  }

  const _getHours = (day, time) => {
    if (!day.fulltime) {
      const now = new Date()
      if (time) {
        const sTime = formatTime(time).split(':')
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
    const outputObj = JSON.parse(JSON.stringify(timeTableInitialState))
    for (let i = 0, size = payload.length; i < size; i += 1) {
      const elem = payload[i]
      outputObj[elem.day] = elem.active
      if (elem.active) {
        outputObj.listingAccessHours.push({
          weekday: i,
          allday: elem.fulltime,
          openHour: _getHours(elem, elem.open),
          closeHour: _getHours(elem, elem.close)
        })
      }
    }
    return outputObj
  }

  const _handleSave = async () => {
    const valuesToUpdate = {
      ...props.listing,
      listingAccessDays: _mapToAccessHourType(timetable)
    }
    await dispatch(onUpdate(props.listing, valuesToUpdate))
    // props.history.push('cancellation')
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

  const _onChangeHoliday = (e, { checked, name }) => {
    const newDate = new Date(name)
    const copyHolidays = [...holidays]
    const copyDisabledDays = [...disabledDays]
    if (!checked) {
      const selectedIndex = copyHolidays.findIndex(selectedDay => isSameDay(selectedDay, newDate))
      copyHolidays.splice(selectedIndex, 1)
      const selectedIndexDisabledDays = copyDisabledDays.findIndex(selectedDay => isSameDay(selectedDay, newDate))
      copyDisabledDays.splice(selectedIndexDisabledDays, 1)
    } else {
      copyHolidays.push(newDate)
      copyDisabledDays.push(newDate)
    }
    setHolidays(copyHolidays)
    setDisabledDays(copyDisabledDays)
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
        <Calendar handleDayClick={_onClickSelectDay} selectedDays={selectedDates} disabledDays={disabledDays} />
      </Cell>
      <Cell>
        <Title
          type="h3"
          title="Holidays"
          subtitle="Are you closed on all Australian holidays? Or Just a few of them?"
        />
        <Grid columns={12} gap="20px" columnGap="40px" style={{ margin: '30px 0' }}>
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
                  <ItemSwitchStyled>
                    <span>{o.dateFormatted}</span>
                    <SwitchStyled>
                      <Switch
                        id={index}
                        name={o.date}
                        value={o.date}
                        // checked={availabilitiesArray.includes(o.date)}
                        disabled={_isOldHoliday(o.originalDate)}
                        handleCheckboxChange={_onChangeHoliday}
                      />
                    </SwitchStyled>
                  </ItemSwitchStyled>
                </Cell>
              )
            })}
        </Grid>
      </Cell>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.push('booking') }}
        next={{ onClick: _handleSave }}
      />
    </Grid>
  )
}

AvailabilityTab.propTypes = {
  listing: PropTypes.instanceOf(Object).isRequired
}

export default AvailabilityTab
