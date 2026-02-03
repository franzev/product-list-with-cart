import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { products } from "../../mocks";
import type { CartItem } from "../../types";
import { CartSection, OrderTotal } from "./Cart";

describe("CartSection", () => {
  it("renders empty cart message when no items", async () => {
    const handleRemoveItem = vi.fn();
    const handleConfirmOrder = vi.fn();

    await render(
      <CartSection
        items={[]}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />,
    );

    await expect
      .element(page.getByText("Your added items will appear here"))
      .toBeInTheDocument();
  });

  it("renders cart heading with item count", async () => {
    const handleRemoveItem = vi.fn();
    const handleConfirmOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <CartSection
        items={[cartItem]}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />,
    );

    await expect.element(page.getByText("Your Cart (2)")).toBeInTheDocument();
  });

  it("renders cart items when items exist", async () => {
    const handleRemoveItem = vi.fn();
    const handleConfirmOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <CartSection
        items={[cartItem]}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />,
    );

    await expect
      .element(page.getByLabelText(`Cart item: ${products[0].name}`))
      .toBeInTheDocument();
  });

  it("renders confirm order button when items exist", async () => {
    const handleRemoveItem = vi.fn();
    const handleConfirmOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <CartSection
        items={[cartItem]}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Confirm Order" }))
      .toBeInTheDocument();
  });

  it("calls onConfirmOrder when confirm order button is clicked", async () => {
    const handleRemoveItem = vi.fn();
    const handleConfirmOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <CartSection
        items={[cartItem]}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
      />,
    );

    await page.getByRole("button", { name: "Confirm Order" }).click();

    expect(handleConfirmOrder).toHaveBeenCalledOnce();
  });
});

describe("OrderTotal", () => {
  it("renders order total with correct amount", async () => {
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };
    const expectedTotal = (products[0].price * 2).toFixed(2);

    await render(<OrderTotal items={[cartItem]} />);

    await expect
      .element(page.getByLabelText(`Order total: $${expectedTotal}`))
      .toBeInTheDocument();
  });

  it("calculates total correctly for multiple items", async () => {
    const items: CartItem[] = [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 3 },
    ];
    const expectedTotal = (
      products[0].price * 2 +
      products[1].price * 3
    ).toFixed(2);

    await render(<OrderTotal items={items} />);

    await expect
      .element(page.getByLabelText(`Order total: $${expectedTotal}`))
      .toBeInTheDocument();
  });
});
