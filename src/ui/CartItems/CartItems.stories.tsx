import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartItems } from "./CartItems";
import { multipleItemsCart } from "../../mocks/fixtures";

const meta = {
  title: "ui/CartItems",
  component: CartItems,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: multipleItemsCart,
    onRemoveItem: () => {},
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
