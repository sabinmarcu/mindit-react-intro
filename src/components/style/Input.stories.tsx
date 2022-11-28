import React from 'react';

import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';

import {
  Input,
} from './Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Input {...args} />
);
export const Primary = Template.bind({});
