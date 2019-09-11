import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Photo from './Photo'

storiesOf('Photo', module).add('Default', () => (
  <Photo onClick={action('clicked')}>Hello Photo</Photo>
))
