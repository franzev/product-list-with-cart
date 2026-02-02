import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductGrid } from "./ProductGrid";
import {
  productGridWithQuantities,
  productGridEmpty,
} from "../../mocks/fixtures";
import { fn } from "storybook/test";

const meta = {
  title: "ui/ProductGrid",
  component: ProductGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: productGridWithQuantities,
    onDecrement: fn(),
    onIncrement: fn(),
  },
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllEmpty: Story = {
  args: {
    items: productGridEmpty,
  },
};
