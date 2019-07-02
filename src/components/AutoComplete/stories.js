import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete from './AutoComplete'

storiesOf('AutoComplete', module).add('Default', () => (
  <AutoComplete onClick={action('clicked')}>Hello AutoComplete</AutoComplete>
))
