import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Price from './Price'

storiesOf('Price', module).add('Default', () => <Price onClick={action('clicked')}>Hello Price</Price>)
