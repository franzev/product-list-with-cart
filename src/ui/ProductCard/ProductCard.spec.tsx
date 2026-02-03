import { describe, it, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { ProductCard } from "./ProductCard";
import { waffleProduct } from "../../mocks";

describe("ProductCard", () => {
  it("renders product name", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={0}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await expect
      .element(page.getByText(waffleProduct.name))
      .toBeInTheDocument();
  });

  it("renders product category", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={0}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await expect
      .element(page.getByLabelText(`Category: ${waffleProduct.category}`))
      .toBeInTheDocument();
  });

  it("renders product price", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={0}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await expect
      .element(page.getByLabelText(`Price: $${waffleProduct.price.toFixed(2)}`))
      .toBeInTheDocument();
  });

  it("renders product image", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={0}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    const imageAlt = `${waffleProduct.name} - ${waffleProduct.category}`;
    await expect.element(page.getByAltText(imageAlt)).toBeInTheDocument();
  });

  it("calls onIncrement when add to cart is clicked", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={0}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await page
      .getByRole("button", { name: `Add ${waffleProduct.name} to cart` })
      .click();

    expect(handleIncrement).toHaveBeenCalledOnce();
    expect(handleIncrement).toHaveBeenCalledWith(waffleProduct);
  });

  it("calls onDecrement when decrement is clicked", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={2}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await page
      .getByRole("button", {
        name: `Decrease quantity of ${waffleProduct.name}`,
      })
      .click();

    expect(handleDecrement).toHaveBeenCalledOnce();
    expect(handleDecrement).toHaveBeenCalledWith(waffleProduct);
  });

  it("calls onIncrement when increment is clicked", async () => {
    const handleDecrement = vi.fn();
    const handleIncrement = vi.fn();

    await render(
      <ProductCard
        product={waffleProduct}
        quantity={1}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />,
    );

    await page
      .getByRole("button", {
        name: `Increase quantity of ${waffleProduct.name}`,
      })
      .click();

    expect(handleIncrement).toHaveBeenCalledOnce();
    expect(handleIncrement).toHaveBeenCalledWith(waffleProduct);
  });
});
