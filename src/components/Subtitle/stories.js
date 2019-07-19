import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Subtitle from './Subtitle'

storiesOf('Subtitle', module).add('Default', () => <Subtitle onClick={action('clicked')}>Hello Subtitle</Subtitle>)
