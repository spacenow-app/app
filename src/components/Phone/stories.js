import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import Phone from './Phone'

storiesOf('Phone', module).add('Rounded', () => (
  <Fragment>
    <Phone size="sm" placeholder="Small" handleChange={(e, { value }) => console.debug(value)} />
    <Phone size="md" placeholder="Medium" handleChange={(e, { value }) => console.debug(value)} />
    <Phone size="lg" placeholder="Large" handleChange={(e, { value }) => console.debug(value)} />
  </Fragment>
))
