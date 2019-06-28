import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Input from './Input'

storiesOf('Input', module).add('Rounded', () => (
  <Fragment>
    <Input size="sm" placeholder="Small" handleChange={(e, { value }) => console.log(value)} />
    <Input size="md" placeholder="Medium" handleChange={(e, { value }) => console.log(value)} />
    <Input size="lg" placeholder="Large" handleChange={(e, { value }) => console.log(value)} />
  </Fragment>
))
