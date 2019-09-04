import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import MapSearch from './MapSearch'

storiesOf('MapSearch', module).add('Default', () => (
  <MapSearch onClick={action('clicked')}>Hello MapSearch</MapSearch>
))
