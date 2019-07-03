import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import List from './List'

storiesOf('List', module).add('Default', () => (
  <List onClick={action('clicked')}>Hello List</List>
))
