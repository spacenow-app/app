import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Box from './Box'

storiesOf('Box', module).add('Default', () => (
  <Box onClick={action('clicked')}>Hello Box</Box>
))
