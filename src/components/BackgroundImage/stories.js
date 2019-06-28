import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BackgroundImage from './BackgroundImage';

storiesOf('BackgroundImage', module).add('Default', () => (
  <BackgroundImage onClick={action('clicked')}>Hello BackgroundImage</BackgroundImage>
));
