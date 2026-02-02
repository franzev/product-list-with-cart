import type { Meta, StoryObj } from "@storybook/react-vite";
import { multipleItemsCart } from "../../mocks/fixtures";
import { OrderConfirmed } from "./OrderConfirmed";

const meta = {
  title: "ui/OrderConfirmed",
  component: OrderConfirmed,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    items: multipleItemsCart,
  },
} satisfies Meta<typeof OrderConfirmed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
