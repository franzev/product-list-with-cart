import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartSection } from "./Cart";
import { emptyCart, multipleItemsCart } from "../../mocks/fixtures";
import { fn } from "storybook/test";

const meta = {
  title: "ui/Cart",
  component: CartSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "375px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    items: emptyCart,
    onRemoveItem: fn(),
  },
} satisfies Meta<typeof CartSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithItems: Story = {
  args: {
    items: multipleItemsCart,
  },
};
