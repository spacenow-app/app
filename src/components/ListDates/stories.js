import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ListDates from './ListDates'

storiesOf('ListDates', module).add('Default', () => (
  <ListDates onClick={action('clicked')}>Hello ListDates</ListDates>
))
