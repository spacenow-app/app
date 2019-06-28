import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Caption from './Caption';

storiesOf('Caption', module).add('Default', () => (
  <Caption onClick={action('clicked')}>Hello Caption</Caption>
));
