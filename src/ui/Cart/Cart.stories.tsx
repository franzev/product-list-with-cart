import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartSection } from "./Cart";
import productsData from "../../../data.json";

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
    items: [],
  },
} satisfies Meta<typeof CartSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithItems: Story = {
  args: {
    items: [
      { product: productsData[3], quantity: 1 },
      { product: productsData[1], quantity: 4 },
      { product: productsData[8], quantity: 2 },
    ],
  },
};
