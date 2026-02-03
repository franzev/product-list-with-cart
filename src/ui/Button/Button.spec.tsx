import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children text", async () => {
    await render(<Button>Click me</Button>);

    await expect
      .element(page.getByRole("button", { name: "Click me" }))
      .toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();

    await render(<Button onClick={handleClick}>Click me</Button>);

    await page.getByRole("button", { name: "Click me" }).click();

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
