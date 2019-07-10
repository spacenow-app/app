import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Radio from './Radio'

storiesOf('Radio', module).add('Default', () => (
  <Radio onClick={action('clicked')}>Hello Radio</Radio>
))
