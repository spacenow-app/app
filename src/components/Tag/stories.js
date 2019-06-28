import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tag from './Tag'

storiesOf('Tag', module).add('Rounded', () => (
  <Fragment>
    <Tag rounded handleClick={action('clicked')}>
      1
    </Tag>
    <Tag rounded handleClick={action('clicked')}>
      30
    </Tag>
  </Fragment>
))
