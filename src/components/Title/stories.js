import React from 'react'
import { storiesOf } from '@storybook/react'
import Title from './Title'

storiesOf('Title', module)
  .add('Default', () => <Title title="Test h1" subtitle="Subtitle 1" />)
  .add('H2', () => <Title type="h2" title="Test h2" subtitle="Test h2" />)
  .add('H3', () => <Title type="h3" title="Test h3" />)
  .add('H4', () => <Title type="h4" title="Test h4" />)
