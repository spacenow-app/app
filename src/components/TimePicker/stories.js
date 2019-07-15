import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TimePicker from './TimePicker'

storiesOf('TimePicker', module).add('Default', () => (
  <TimePicker onClick={action('clicked')}>Hello TimePicker</TimePicker>
))
