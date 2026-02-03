import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import { useState } from "react";
import { Modal } from "./Modal";

describe("Modal", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders modal when isOpen is true", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await expect.element(page.getByText("Modal Content")).toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await expect.element(page.getByText("Modal Content")).toBeInTheDocument();
    await expect.element(page.getByRole("dialog")).toBeInTheDocument();

    const dialogEl = document.querySelector("dialog");
    if (dialogEl) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "target", {
        value: dialogEl,
        writable: false,
      });
      dialogEl.dispatchEvent(event);
    }

    expect(handleClose).toHaveBeenCalled();
  });

  it("does not call onClose when content is clicked", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await page.getByText("Modal Content").click();

    expect(handleClose).not.toHaveBeenCalled();
  });

  it("sets body overflow to hidden when modal is open", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow when modal is closed", async () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div>Modal Content</div>
        </Modal>
      );
    };

    await render(<TestComponent />);

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(document.body.style.overflow).toBe("hidden");

    const dialogEl = document.querySelector("dialog");
    if (dialogEl) {
      const event = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "target", {
        value: dialogEl,
        writable: false,
      });
      dialogEl.dispatchEvent(event);
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(document.body.style.overflow).toBe("");
  });

  it("applies titleId to aria-labelledby", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose} titleId="test-title">
        <div>Modal Content</div>
      </Modal>,
    );

    await expect.element(page.getByText("Modal Content")).toBeInTheDocument();

    const dialog = page.getByRole("dialog");
    await expect
      .element(dialog)
      .toHaveAttribute("aria-labelledby", "test-title");
  });

  it("applies descriptionId to aria-describedby", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal
        isOpen={true}
        onClose={handleClose}
        descriptionId="test-description"
      >
        <div>Modal Content</div>
      </Modal>,
    );

    await expect.element(page.getByText("Modal Content")).toBeInTheDocument();

    const dialog = page.getByRole("dialog");
    await expect
      .element(dialog)
      .toHaveAttribute("aria-describedby", "test-description");
  });

  it("calls onClose when ESC key is pressed", async () => {
    const handleClose = vi.fn();

    await render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    await expect.element(page.getByText("Modal Content")).toBeInTheDocument();

    const dialogEl = document.querySelector("dialog");
    if (dialogEl) {
      const cancelEvent = new Event("cancel", {
        bubbles: true,
        cancelable: true,
      });
      dialogEl.dispatchEvent(cancelEvent);
    }

    expect(handleClose).toHaveBeenCalled();
  });
});
