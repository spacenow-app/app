import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Line from './Line'

storiesOf('Line', module).add('Default', () => (
  <Line onClick={action('clicked')}>Hello Line</Line>
))
