import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { format, isAfter, isBefore } from 'date-fns'
import { Title, Grid, Cell, TimeTable, Calendar, Switch } from 'components'
import update from 'immutability-helper'

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

const data = {
  accessDays: {
    id: 42,
    listingId: 1,
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false,
    all247: false,
    createdAt: '2019-04-24T01:39:36.000Z',
    updatedAt: '2019-07-09T05:23:43.000Z',
    listingAccessHours: [
      {
        id: 1054,
        listingAccessDaysId: 42,
        weekday: 1,
        openHour: '2019-07-08T22:00:00.000Z',
        closeHour: '2019-07-09T07:00:00.000Z',
        allday: false,
        createdAt: '2019-07-09T05:23:43.000Z',
        updatedAt: '2019-07-09T05:23:43.000Z'
      },
      {
        id: 1055,
        listingAccessDaysId: 42,
        weekday: 2,
        openHour: '2019-07-09T05:23:30.000Z',
        closeHour: '2019-07-09T05:23:30.000Z',
        allday: true,
        createdAt: '2019-07-09T05:23:43.000Z',
        updatedAt: '2019-07-09T05:23:43.000Z'
      },
      {
        id: 1056,
        listingAccessDaysId: 42,
        weekday: 3,
        openHour: '2019-07-09T05:23:30.000Z',
        closeHour: '2019-07-09T05:23:30.000Z',
        allday: true,
        createdAt: '2019-07-09T05:23:43.000Z',
        updatedAt: '2019-07-09T05:23:43.000Z'
      },
      {
        id: 1057,
        listingAccessDaysId: 42,
        weekday: 4,
        openHour: '2019-07-09T05:23:30.000Z',
        closeHour: '2019-07-09T05:23:30.000Z',
        allday: true,
        createdAt: '2019-07-09T05:23:43.000Z',
        updatedAt: '2019-07-09T05:23:43.000Z'
      },
      {
        id: 1058,
        listingAccessDaysId: 42,
        weekday: 5,
        openHour: '2019-07-08T22:00:00.000Z',
        closeHour: '2019-07-09T07:00:00.000Z',
        allday: false,
        createdAt: '2019-07-09T05:23:43.000Z',
        updatedAt: '2019-07-09T05:23:43.000Z'
      }
    ]
  }
}

const teste = () => {
  const TIME_TABLE_SHORT_NAME = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const TIME_TABLE_WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const accessHours = data.accessDays.listingAccessHours

  const input = []

  const formatTime = date => {
    const time = format(date, 'HH:mm')
    return new Date(`${format(new Date(), 'MM/DD/YYYY')} ${time}`)
  }

  const nanDate = date => {
    if (date && date !== 'Invalid Date') {
      return new Date(date)
    }
    return new Date()
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
        open: formatTime(access.allday ? new Date() : openHour),
        close: formatTime(access.allday ? new Date() : closeHour),
        error: {}
      }
    } else {
      elem = {
        day: TIME_TABLE_SHORT_NAME[i],
        description: TIME_TABLE_WEEK_DAYS[i],
        active: false,
        fulltime: false,
        open: new Date(),
        close: new Date(),
        error: {}
      }
    }
    input.push(elem)
  }
  return input
}

const AvailabilityTab = () => {
  const [timetable, setTimeTable] = useState(teste())
  const [fullTime, setFullTime] = useState(false)

  useEffect(() => {
    checkFullTime(timetable)
  }, [timetable])

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
        <Calendar />
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
                <Switch name="blockAll" disabled={false} handleCheckboxChange={() => {}} checked={false} />
              </SwitchStyled>
            </ItemSwitchStyled>
          </Cell>
        </Grid>
      </Cell>
    </Grid>
  )
}

export default AvailabilityTab
