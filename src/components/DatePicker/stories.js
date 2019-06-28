import React from 'react'
import { storiesOf } from '@storybook/react'
import DatePicker from './DatePicker'

const arrayOfDayHighlight = [
  'Mon May 15 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)',
  'Mon May 23 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)',
  'Mon May 31 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)',
  'Mon May 27 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)'
]

const arrayOfDayBlocked = [
  'Mon May 13 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)',
  'Mon May 14 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)',
  'Mon Jun 29 2019 14:31:42 GMT+1000 (Australian Eastern Standard Time)'
]

storiesOf('DatePicker', module)
  .add('Default', () => (
    <DatePicker
      arrayOfDayBlocked={arrayOfDayBlocked}
      arrayOfDayHighlight={arrayOfDayHighlight}
      onDateChange={() => {}}
      onFocusChange={() => {}}
    />
  ))
  .add('With blocked Dates', () => (
    <DatePicker arrayOfDayBlocked={arrayOfDayBlocked} onDateChange={() => {}} onFocusChange={() => {}} />
  ))
  .add('With highlight Dates', () => (
    <DatePicker
      focus={false}
      arrayOfDayHighlight={arrayOfDayHighlight}
      onDateChange={() => {}}
      onFocusChange={() => {}}
    />
  ))
