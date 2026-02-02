import type { Meta, StoryObj } from "@storybook/react-vite";
import productsData from "../../../data.json";
import { OrderConfirmed } from "./OrderConfirmed";

const meta = {
  title: "ui/OrderConfirmed",
  component: OrderConfirmed,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    items: [
      { product: productsData[3], quantity: 1 },
      { product: productsData[1], quantity: 4 },
      { product: productsData[8], quantity: 2 },
    ],
  },
} satisfies Meta<typeof OrderConfirmed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
