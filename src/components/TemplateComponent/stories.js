import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TemplateComponent from './TemplateComponent'

storiesOf('TemplateComponent', module).add('Default', () => (
  <TemplateComponent onClick={action('clicked')}>Hello TemplateComponent</TemplateComponent>
))
