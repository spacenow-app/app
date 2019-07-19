import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Highlights from './Highlights'

storiesOf('Highlights', module).add('Default', () => (
  <Highlights onClick={action('clicked')}>Hello Highlights</Highlights>
))
