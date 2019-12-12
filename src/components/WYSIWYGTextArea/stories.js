import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TextArea from './TextArea'

storiesOf('TextArea', module).add('Default', () => (
  <TextArea onClick={action('clicked')}>Hello TextArea</TextArea>
))
