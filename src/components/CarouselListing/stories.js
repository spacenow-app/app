import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CarouselListing from './CarouselListing'

storiesOf('Carousel', module).add('Default', () => (
  <CarouselListing onClick={action('clicked')}>Hello Carousel Listing</CarouselListing>
))
