import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { products } from "../../mocks";
import type { ProductGridItem } from "./ProductGrid";
import { ProductGrid } from "./ProductGrid";

describe("ProductGrid", () => {
  it("renders product list", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();
    const items: ProductGridItem[] = [{ product: products[0], quantity: 0 }];

    await render(
      <ProductGrid
        items={items}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    );

    await expect
      .element(page.getByLabelText("Product list"))
      .toBeInTheDocument();
  });

  it("renders single product", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();
    const items: ProductGridItem[] = [{ product: products[0], quantity: 0 }];

    await render(
      <ProductGrid
        items={items}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    );

    await expect.element(page.getByText(products[0].name)).toBeInTheDocument();
  });

  it("renders multiple products", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();
    const items: ProductGridItem[] = [
      { product: products[0], quantity: 0 },
      { product: products[1], quantity: 1 },
    ];

    await render(
      <ProductGrid
        items={items}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    );

    await expect.element(page.getByText(products[0].name)).toBeInTheDocument();
    await expect.element(page.getByText(products[1].name)).toBeInTheDocument();
  });

  it("calls onIncrement with correct product", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();
    const items: ProductGridItem[] = [{ product: products[0], quantity: 0 }];

    await render(
      <ProductGrid
        items={items}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    );

    await page
      .getByRole("button", { name: `Add ${products[0].name} to cart` })
      .click();

    expect(handleIncrement).toHaveBeenCalledOnce();
    expect(handleIncrement).toHaveBeenCalledWith(products[0]);
  });

  it("calls onDecrement with correct product", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();
    const items: ProductGridItem[] = [{ product: products[0], quantity: 2 }];

    await render(
      <ProductGrid
        items={items}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
    );

    await page
      .getByRole("button", {
        name: `Decrease quantity of ${products[0].name}`,
      })
      .click();

    expect(handleDecrement).toHaveBeenCalledOnce();
    expect(handleDecrement).toHaveBeenCalledWith(products[0]);
  });
});
