import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Dropdown from './Dropdown'

storiesOf('Dropdown', module)
  .add('Default', () => <Dropdown onClick={action('clicked')}>Hello Dropdown</Dropdown>)
  .add('Disabled', () => (
    <Dropdown disabled onClick={action('clicked')}>
      Hello Dropdown
    </Dropdown>
  ))
  .add('Outline', () => (
    <Dropdown outline onClick={action('clicked')}>
      Hello Dropdown
    </Dropdown>
  ))
  .add('Text', () => (
    <Dropdown text onClick={action('clicked')}>
      Hello Dropdown
    </Dropdown>
  ))
  .add('Small', () => (
    <Dropdown small onClick={action('clicked')}>
      Hello Dropdown
    </Dropdown>
  ))
  .add('Large', () => (
    <Dropdown large onClick={action('clicked')}>
      Hello Dropdown
    </Dropdown>
  ))
