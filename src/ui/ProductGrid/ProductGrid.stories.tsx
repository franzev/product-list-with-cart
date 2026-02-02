import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductGrid } from "./ProductGrid";
import productsData from "../../../data.json";
import { fn } from "storybook/test";

const quantities = [0, 3, 0, 5, 0, 2, 1, 4, 7];

const items = productsData.map((product, index) => ({
  product,
  quantity: quantities[index] ?? 0,
}));

const meta = {
  title: "ui/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items,
    onDecrement: fn(),
    onIncrement: fn(),
  },
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllEmpty: Story = {
  args: {
    items: productsData.map((product) => ({
      product,
      quantity: 0,
    })),
  },
};
