import clsx from "clsx";
import styles from "./AddToCart.module.css";

type ControlsProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  productName?: string;
};

const Controls = ({
  quantity,
  onDecrement,
  onIncrement,
  className,
  productName,
}: ControlsProps & { className?: string }) => {
  const quantityId = `quantity-${
    productName?.replace(/\s+/g, "-").toLowerCase() || "item"
  }`;
  const displayQuantity = quantity === 0 ? 1 : quantity;
  const decrementLabel = productName
    ? `Decrease quantity of ${productName}`
    : "Decrease quantity";
  const incrementLabel = productName
    ? `Increase quantity of ${productName}`
    : "Increase quantity";

  return (
    <div
      className={clsx(
        styles.base,
        styles.withCount,
        styles.controls,
        className
      )}
      role="group"
      aria-label={`Quantity controls for ${productName || "item"}`}
    >
      <button
        type="button"
        className={styles.controlIcon}
        onClick={onDecrement}
        aria-label={decrementLabel}
        aria-controls={quantityId}
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
      <span id={quantityId} aria-live="polite" aria-atomic="true">
        {displayQuantity}
      </span>
      <button
        type="button"
        className={styles.controlIcon}
        onClick={onIncrement}
        aria-label={incrementLabel}
        aria-controls={quantityId}
      >
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export const AddToCart = ({
  quantity,
  onDecrement,
  onIncrement,
  productName,
}: ControlsProps) => {
  const addToCartLabel = productName
    ? `Add ${productName} to cart`
    : "Add to Cart";

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(
          styles.base,
          styles.empty,
          quantity === 0 ? styles.visible : styles.hidden
        )}
        onClick={onIncrement}
        aria-label={addToCartLabel}
      >
        <div className={styles.content}>
          <img
            src="/assets/images/icon-add-to-cart.svg"
            alt=""
            aria-hidden="true"
          />
          Add to Cart
        </div>
      </button>
      <Controls
        quantity={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        productName={productName}
        className={clsx(quantity === 0 ? styles.hidden : styles.visible)}
      />
    </div>
  );
};
