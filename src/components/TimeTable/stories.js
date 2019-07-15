import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TimeTable from './TimeTable'

storiesOf('TimeTable', module).add('Default', () => (
  <TimeTable onClick={action('clicked')}>Hello TimeTable</TimeTable>
))
