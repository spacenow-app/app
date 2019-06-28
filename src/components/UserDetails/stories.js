import React from 'react'
import { storiesOf } from '@storybook/react'
import UserDetails from './UserDetails'

storiesOf('UserDetails', module).add('Default', () => (
  <UserDetails hostname="Bruno" address="Delmar Parade, 2099" joined="2019" />
))
