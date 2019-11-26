import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ProgressBar from './ProgressBar'

storiesOf('ProgressBar', module).add('Default', () => (
  <ProgressBar onClick={action('clicked')}>Hello ProgressBar</ProgressBar>
))
