import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Content from './Content';

storiesOf('Content', module).add('Default', () => (
  <Content onClick={action('clicked')}>Hello Content</Content>
));
