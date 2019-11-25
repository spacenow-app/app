import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from './Checkbox'

storiesOf('Checkbox', module)
  .add('Default checked', () => (
    <label>
      <Checkbox checked handleCheckboxChange={(e, { checked }) => {}} />
      <span style={{ marginLeft: 8 }}>Label Text</span>
    </label>
  ))
  .add('Default unchecked', () => (
    <label>
      <Checkbox checked={false} handleCheckboxChange={(e, { checked }) => {}} />
      <span style={{ marginLeft: 8 }}>Label Text</span>
    </label>
  ))
