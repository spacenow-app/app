import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Switch from './Switch'

storiesOf('Switch', module).add('Default', () => (
  <Switch onClick={action('clicked')}>Hello Switch</Switch>
))
