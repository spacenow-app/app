import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Heading from './Heading';

storiesOf('Heading', module).add('Default', () => (
  <Heading onClick={action('clicked')}>Hello Heading</Heading>
));
