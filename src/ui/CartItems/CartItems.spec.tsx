import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { products } from "../../mocks";
import type { CartItem } from "../../types";
import { CartItems } from "./CartItems";

describe("CartItems", () => {
  it("renders empty list when no items", async () => {
    const handleRemoveItem = vi.fn();

    await render(<CartItems items={[]} onRemoveItem={handleRemoveItem} />);

    await expect.element(page.getByLabelText("Cart items")).toBeInTheDocument();
  });

  it("renders cart items", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(page.getByLabelText(`Cart item: ${products[0].name}`))
      .toBeInTheDocument();
  });

  it("displays product name", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(page.getByLabelText(`Product name: ${products[0].name}`))
      .toBeInTheDocument();
  });

  it("displays quantity", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(page.getByLabelText("Quantity: 2"))
      .toBeInTheDocument();
  });

  it("displays price per item", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(
        page.getByLabelText(`Price per item: $${products[0].price.toFixed(2)}`)
      )
      .toBeInTheDocument();
  });

  it("displays item total", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };
    const expectedTotal = (products[0].price * 2).toFixed(2);

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(page.getByLabelText(`Item total: $${expectedTotal}`))
      .toBeInTheDocument();
  });

  it("calls onRemoveItem when remove button is clicked", async () => {
    const handleRemoveItem = vi.fn();
    const cartItem: CartItem = {
      product: products[0],
      quantity: 2,
    };

    await render(<CartItems items={[cartItem]} onRemoveItem={handleRemoveItem} />);

    await page
      .getByRole("button", { name: `Remove ${products[0].name} from cart` })
      .click();

    expect(handleRemoveItem).toHaveBeenCalledOnce();
    expect(handleRemoveItem).toHaveBeenCalledWith(cartItem);
  });

  it("renders separators between multiple items", async () => {
    const handleRemoveItem = vi.fn();
    const items: CartItem[] = [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 },
    ];

    await render(<CartItems items={items} onRemoveItem={handleRemoveItem} />);

    await expect
      .element(page.getByLabelText(`Cart item: ${products[0].name}`))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText(`Cart item: ${products[1].name}`))
      .toBeInTheDocument();
  });
});
