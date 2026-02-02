import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import productsData from "../../../data.json";
import { Button } from "../Button";
import { OrderConfirmed } from "../OrderConfirmed";
import { Modal } from "./Modal";

const meta = {
  title: "ui/Modal",
  component: Modal,
  tags: ["autodocs"],

  args: {
    isOpen: false,
    onClose: fn(),
    children: null,
    titleId: "modal-title",
    descriptionId: "modal-description",
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState(false);
      const { args } = context;

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Story
            args={
              {
                ...args,
                isOpen,
                onClose: () => setIsOpen(false),
              } as typeof args
            }
          />
        </>
      );
    },
  ],
  args: {
    children: (
      <div
        style={{
          padding: "var(--spacing-400)",
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--spacing-150)",
        }}
      >
        <h2 id="modal-title">Modal Title</h2>
        <p id="modal-description">This is a modal dialog example.</p>
        <p>Click outside or press ESC to close.</p>
      </div>
    ),
  },
};

export const WithOrderConfirmed: Story = {
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState(false);
      const { args } = context;

      const orderItems = [
        { product: productsData[3], quantity: 1 },
        { product: productsData[1], quantity: 4 },
        { product: productsData[8], quantity: 2 },
      ];

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Confirm Order</Button>
          <Story
            args={
              {
                ...args,
                isOpen,
                onClose: () => setIsOpen(false),
                titleId: "order-confirmed-title",
                descriptionId: "order-confirmed-description",
                children: (
                  <OrderConfirmed
                    items={orderItems}
                    onStartNewOrder={() => setIsOpen(false)}
                  />
                ),
              } as typeof args
            }
          />
        </>
      );
    },
  ],
};
