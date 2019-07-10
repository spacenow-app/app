import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Grid from './Grid'

storiesOf('Grid', module).add('Default', () => (
  <Grid onClick={action('clicked')}>Hello Grid</Grid>
))
