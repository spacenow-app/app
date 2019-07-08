import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tab from './Tab'

storiesOf('Tab', module).add('Default', () => <Tab onClick={action('clicked')}>Hello Tabs</Tab>)
