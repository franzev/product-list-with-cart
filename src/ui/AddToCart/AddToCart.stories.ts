import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { AddToCart } from './AddToCart';

const meta = {
  title: 'ui/AddToCart',
  component: AddToCart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { 
    onClick: fn(),
    count: 0,
    children: 'Add to Cart',
  },
} satisfies Meta<typeof AddToCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCount: Story = {
  args: {
    count: 2,
  },
};