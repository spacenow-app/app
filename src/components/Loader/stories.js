import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Loader from './Loader'

storiesOf('Loader', module).add('Default', () => (
  <Loader onClick={action('clicked')}>Hello Loader</Loader>
))
