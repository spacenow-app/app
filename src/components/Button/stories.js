import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

storiesOf('Button', module)
  .add('Default', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('Disabled', () => (
    <Button disabled onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('Outline', () => (
    <Button outline onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('Text', () => (
    <Button text onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('Small', () => (
    <Button small onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('Large', () => (
    <Button large onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
