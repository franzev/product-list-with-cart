import clsx from "clsx";
import type { Product } from "../../types/Product";
import styles from "./AddToCart.module.css";

interface ControlsProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  product: Product;
}

const Controls = ({
  quantity,
  onDecrement,
  onIncrement,
  className,
  product,
}: ControlsProps & { className?: string }) => {
  const displayQuantity = quantity === 0 ? 1 : quantity;
  const decrementLabel = product.name
    ? `Decrease quantity of ${product.name}`
    : "Decrease quantity";
  const incrementLabel = product.name
    ? `Increase quantity of ${product.name}`
    : "Increase quantity";

  const isHidden = quantity === 0;

  return (
    <div
      className={clsx(
        styles.base,
        styles.withCount,
        styles.controls,
        className,
      )}
      role="group"
      aria-label={`Quantity controls for ${product.name}`}
      aria-hidden={isHidden}
    >
      <button
        type="button"
        className={styles.controlIcon}
        onClick={isHidden ? undefined : onDecrement}
        aria-label={decrementLabel}
        aria-controls={product.id}
        tabIndex={isHidden ? -1 : 0}
        disabled={isHidden}
      >
        <img
          src="/images/icon-decrement-quantity.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
      <span id={product.id} aria-live="polite" aria-atomic="true">
        {displayQuantity}
      </span>
      <button
        type="button"
        className={styles.controlIcon}
        onClick={isHidden ? undefined : onIncrement}
        aria-label={incrementLabel}
        aria-controls={product.id}
        tabIndex={isHidden ? -1 : 0}
        disabled={isHidden}
      >
        <img
          src="/images/icon-increment-quantity.svg"
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
  product,
}: ControlsProps) => {
  const addToCartLabel = product.name
    ? `Add ${product.name} to cart`
    : "Add to Cart";

  const isAddToCartHidden = quantity > 0;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={clsx(
          styles.base,
          styles.empty,
          quantity === 0 ? styles.visible : styles.hidden,
        )}
        onClick={isAddToCartHidden ? undefined : onIncrement}
        aria-label={addToCartLabel}
        aria-hidden={isAddToCartHidden}
        tabIndex={isAddToCartHidden ? -1 : 0}
        disabled={isAddToCartHidden}
      >
        <img src="/images/icon-add-to-cart.svg" alt="" aria-hidden="true" />
        Add to Cart
      </button>
      <Controls
        quantity={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        product={product}
        className={clsx(quantity === 0 ? styles.hidden : styles.visible)}
      />
    </div>
  );
};
