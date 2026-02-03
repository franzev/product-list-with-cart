import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { useState } from "react";
import { AddToCart } from "./AddToCart";

describe("AddToCart", () => {
  it("renders add to cart button when quantity is 0", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={0}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />,
    );

    await expect
      .element(page.getByRole("button", { name: "Add to Cart" }))
      .toBeInTheDocument();
  });

  it("renders quantity controls when quantity is greater than 0", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={2}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />,
    );

    await expect
      .element(page.getByRole("group", { name: "Quantity controls for item" }))
      .toBeInTheDocument();
  });

  it("displays correct quantity", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={3}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />,
    );

    await expect.element(page.getByText("3")).toBeInTheDocument();
  });

  it("shows add to cart button when quantity becomes 0", async () => {
    const TestComponent = () => {
      const [qty, setQty] = useState(1);
      return (
        <AddToCart
          quantity={qty}
          onIncrement={() => {
            setQty(qty + 1);
          }}
          onDecrement={() => {
            setQty(0);
          }}
        />
      );
    };

    await render(<TestComponent />);

    await expect
      .element(page.getByRole("group", { name: "Quantity controls for item" }))
      .toBeInTheDocument();

    await page.getByRole("button", { name: "Decrease quantity" }).click();

    await expect
      .element(page.getByRole("button", { name: "Add to Cart" }))
      .toBeInTheDocument();
  });

  it("calls onIncrement when increment button is clicked", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={1}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        productName="Test Product"
      />,
    );

    await page
      .getByRole("button", { name: "Increase quantity of Test Product" })
      .click();

    expect(handleIncrement).toHaveBeenCalledOnce();
  });

  it("calls onDecrement when decrement button is clicked", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={2}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        productName="Test Product"
      />,
    );

    await page
      .getByRole("button", { name: "Decrease quantity of Test Product" })
      .click();

    expect(handleDecrement).toHaveBeenCalledOnce();
  });

  it("calls onIncrement when add to cart button is clicked", async () => {
    const handleIncrement = vi.fn();
    const handleDecrement = vi.fn();

    await render(
      <AddToCart
        quantity={0}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        productName="Test Product"
      />,
    );

    await page
      .getByRole("button", { name: "Add Test Product to cart" })
      .click();

    expect(handleIncrement).toHaveBeenCalledOnce();
  });
});
