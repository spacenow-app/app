import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tooltip from './Tooltip'

storiesOf('Tooltip', module).add('Default', () => (
  <Tooltip onClick={action('clicked')}>Hello Tooltip</Tooltip>
))
