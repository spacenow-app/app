import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SubTitle from './SubTitle'

storiesOf('SubTitle', module).add('Default', () => <SubTitle onClick={action('clicked')}>Hello Subtitle</SubTitle>)
