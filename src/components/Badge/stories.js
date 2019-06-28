import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Badge from './Badge'

storiesOf('Badge', module).add('Rounded', () => (
  <Fragment>
    <Badge rounded handleClick={action('clicked')}>
      1
    </Badge>
    <Badge rounded handleClick={action('clicked')}>
      30
    </Badge>
  </Fragment>
))
