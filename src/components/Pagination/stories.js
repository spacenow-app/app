import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Pagination from './Pagination'

storiesOf('Pagination', module).add('Default', () => (
  <Pagination onClick={action('clicked')}>Hello Pagination</Pagination>
))
