import { describe, it, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { OrderConfirmed } from "./OrderConfirmed";
import { products } from "../../mocks";
import type { CartItem } from "../../types";

describe("OrderConfirmed", () => {
  it("renders order confirmed title", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect.element(page.getByText("Order Confirmed")).toBeInTheDocument();
  });

  it("renders confirmation message", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect
      .element(page.getByText("We hope you enjoy your food!"))
      .toBeInTheDocument();
  });

  it("renders order items", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect.element(page.getByText(products[0].name)).toBeInTheDocument();
  });

  it("displays item quantity", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect
      .element(page.getByLabelText("Quantity: 2"))
      .toBeInTheDocument();
  });

  it("displays item price", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect
      .element(
        page.getByLabelText(`Price per item: $${products[0].price.toFixed(2)}`),
      )
      .toBeInTheDocument();
  });

  it("displays item total", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };
    const expectedTotal = (products[0].price * 2).toFixed(2);

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect
      .element(page.getByLabelText(`Item total: $${expectedTotal}`))
      .toBeInTheDocument();
  });

  it("renders start new order button", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Start New Order" }))
      .toBeInTheDocument();
  });

  it("calls onStartNewOrder when button is clicked", async () => {
    const handleStartNewOrder = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(
      <OrderConfirmed
        items={[cartItem]}
        onStartNewOrder={handleStartNewOrder}
      />,
    );

    await page.getByRole("button", { name: "Start New Order" }).click();

    expect(handleStartNewOrder).toHaveBeenCalledOnce();
  });

  it("renders multiple items", async () => {
    const handleStartNewOrder = vi.fn();
    const items: CartItem[] = [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 },
    ];

    await render(
      <OrderConfirmed items={items} onStartNewOrder={handleStartNewOrder} />,
    );

    await expect.element(page.getByText(products[0].name)).toBeInTheDocument();
    await expect.element(page.getByText(products[1].name)).toBeInTheDocument();
  });
});
