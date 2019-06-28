import React from 'react'
import { storiesOf } from '@storybook/react'
import Avatar from './Avatar'
import defaultPic from './defaultPic.png';

storiesOf('Avatar', module)
  .add('Small', () => <Avatar small image="https://png.pngtree.com/element_our/png/20181124/businessman-vector-icon-png_246587.jpg" />)
  .add('Medium', () => <Avatar />)
  .add('Large', () => <Avatar large image="https://png.pngtree.com/element_our/png/20181124/businessman-vector-icon-png_246587.jpg" />)
  .add('With Image', () => <Avatar image={defaultPic} />)  
 
