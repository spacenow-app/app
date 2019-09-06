import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ButtonSocial from './ButtonSocial'

storiesOf('ButtonSocial', module).add('Default', () => (
  <ButtonSocial onClick={action('clicked')}>Hello ButtonSocial</ButtonSocial>
))
