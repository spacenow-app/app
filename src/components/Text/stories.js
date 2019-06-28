import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Text from './Text'

storiesOf('Text', module).add('Default', () => (
  <Text onClick={action('clicked')}>Hello Text</Text>
))
