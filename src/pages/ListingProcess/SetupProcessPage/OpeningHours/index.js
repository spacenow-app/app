/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { isAfter, isBefore, isSameDay } from 'date-fns'
import update from 'immutability-helper'

import { nanDate, weekTimeTable } from 'variables'

import { onGetAllHolidays } from 'redux/ducks/listing'

import { Wrapper, Title, Box, TimeTable, StepButtons } from 'components'

const TIME_TABLE_INIT_STATE = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  sat: false,
  sun: false,
  all247: false,
  accessHours: []
}

const OpeningHoursPage = ({ listing, ...props }) => {
  const dispatch = useDispatch()

  const [timetable, setTimeTable] = useState([])
  const [fullTime, setFullTime] = useState(false)
  const [, setHolidays] = useState([])
  const [, setTimeTableWeek] = useState([])

  const { array: availabilitiesArray } = useSelector(state => state.listing.availabilities)
  const { array: holidaysArray } = useSelector(state => state.listing.holidays)

  useEffect(() => {
    const valuesToUpdate = {
      accessDays: _mapToAccessHourType(timetable),
    }
    props.setFatherValues(valuesToUpdate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.setFatherValues])

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
        open: `${_newDateTime('08', '00')}`,
        close: `${_newDateTime('17', '00')}`,
        error: {}
      }
      if (/true/i.test(accessDays[o.short])) {
        const hoursElem = accessDays.accessHours.find(h => h.weekday === o.index)
        if (hoursElem) {
          const openHour = nanDate(hoursElem.openHour)
          const closeHour = nanDate(hoursElem.closeHour)
          elem = {
            day: o.short,
            description: o.name,
            active: true,
            fulltime: hoursElem.allday,
            open: hoursElem.allday ? `${_newDateTime('08', '00')}` : openHour,
            close: hoursElem.allday ? `${_newDateTime('17', '00')}` : closeHour,
            error: {}
          }
        }
      }
      arrayOutput.push(elem)
    }
    setTimeTable(arrayOutput)
  }, [listing])

  useEffect(() => {
    _checkFullTime(timetable)
  }, [timetable])

  useEffect(() => {
    const newTimeTableWeek = timetable.map(item => {
      if (!item.active) {
        return weekTimeTable.find(el => el.short === item.day).index
      }
      return undefined
    })
    setTimeTableWeek(newTimeTableWeek.filter(el => el !== undefined))
  }, [timetable])

  const _newDateTime = (hour, min) => {
    const h = new Date()
    const u = new Date(h.getFullYear(), h.getMonth(), h.getDate(), hour, min, h.getSeconds())
    return u
  }

  const _checkFullTime = array => {
    const isFullTime = array.every(el => el.active === true && el.fulltime === true)
    setFullTime(isFullTime)
  }

  const _handleChangeTime = options => {
    const newTime = _newDateTime(options.value.split(':')[0], options.value.split(':')[1])
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
    const h = _zero(new Date(time).getHours())
    const m = _zero(new Date(time).getMinutes())
    const s = _zero(new Date(time).getSeconds())
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
        outputObj.accessHours.push({
          weekday: weekDay.index,
          allday: elem.fulltime,
          openHour: _getHours(elem, elem.open),
          closeHour: _getHours(elem, elem.close)
        })
      }
    }
    return outputObj
  }

  return (
    <Wrapper>
      <Helmet title="Listing Space Availability - Spacenow" />
      <Box>
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
      </Box>
      <StepButtons
        prev={{
          disabled: false,
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/access`)
        }}
        next={{
          onClick: () => props.history.push(`/listing-process/setup-process/${listing.id}/cancellation`)
        }}
      />
    </Wrapper>
  )
}

export default OpeningHoursPage
