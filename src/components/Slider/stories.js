import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Slider from './Slider'

storiesOf('Slider', module).add('Default', () => (
  <Slider onClick={action('clicked')}>Hello Slider</Slider>
))
