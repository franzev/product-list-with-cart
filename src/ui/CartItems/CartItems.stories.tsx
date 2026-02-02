import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartItems } from "./CartItems";
import productsData from "../../../data.json";

const meta = {
  title: "ui/CartItems",
  component: CartItems,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      { product: productsData[3], quantity: 1 },
      { product: productsData[1], quantity: 4 },
      { product: productsData[8], quantity: 2 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "var(--color-white)", width: "375px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CartItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
