import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { AddToCart } from "./AddToCart";
import { waffleProduct } from "../../mocks/fixtures";

const meta = {
  title: "ui/AddToCart",
  component: AddToCart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    product: waffleProduct,
    quantity: 0,
    onDecrement: fn(),
    onIncrement: fn(),
  },
} satisfies Meta<typeof AddToCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCount: Story = {
  args: {
    quantity: 2,
  },
};
