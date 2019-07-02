import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Map from './Map'

storiesOf('Map', module).add('Default', () => (
  <Map onClick={action('clicked')}>Hello Map</Map>
))
