import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import VideoModal from './VideoModal'

storiesOf('VideoModal', module).add('Default', () => (
  <VideoModal onClick={action('clicked')}>Hello VideoModal</VideoModal>
))
