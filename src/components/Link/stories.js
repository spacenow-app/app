import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Link from './Link'

storiesOf('Link', module).add('Default', () => (
  <Link onClick={action('clicked')}>Hello Link</Link>
))
