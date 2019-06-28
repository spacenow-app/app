import React from 'react'
import { storiesOf } from '@storybook/react'
import PriceDetail from './PriceDetail'

const arrayMock = [
  {
    name: 'AUD $182.84 x 9 days',
    value: 'Quantity x10'
  },
  {
    name: 'Quantity x10',
    value: 'AUD $112.80'
  },
  {
    name: 'Service fee',
    value: 'AUD $478.49'
  },
  {
    name: 'Total',
    value: 'AUD $478.49'
  }
]

storiesOf('PriceDetail', module).add('Default', () => <PriceDetail list={arrayMock} />)
