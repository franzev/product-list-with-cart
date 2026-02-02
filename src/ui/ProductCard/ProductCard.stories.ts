import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "./ProductCard";
import productsData from "../../../data.json";
import { fn } from "storybook/test";

const meta = {
  title: "ui/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    product: productsData[0],
    quantity: 0,
    onDecrement: fn(),
    onIncrement: fn(),
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithQuantity: Story = {
  args: {
    product: productsData[2],
    quantity: 3,
  },
};
