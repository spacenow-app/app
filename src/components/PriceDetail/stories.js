import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PriceDetail from './PriceDetail'

storiesOf('PriceDetail', module).add('Default', () => (
  <PriceDetail onClick={action('clicked')}>Hello PriceDetail</PriceDetail>
))
