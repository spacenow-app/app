import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Carousel from './Carousel'

storiesOf('Carousel', module).add('Default', () => (
  <Carousel onClick={action('clicked')}>Hello Carousel</Carousel>
))
