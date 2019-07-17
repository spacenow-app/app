import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Calendar from './Calendar'

storiesOf('Calendar', module).add('Default', () => (
  <Calendar onClick={action('clicked')}>Hello Calendar</Calendar>
))
