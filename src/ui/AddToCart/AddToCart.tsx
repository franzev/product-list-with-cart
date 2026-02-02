import clsx from "clsx";
import styles from "./AddToCart.module.css";

type ControlsProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const Controls = ({
  quantity,
  onDecrement,
  onIncrement,
  className,
}: ControlsProps & { className?: string }) => {
  return (
    <div
      className={clsx(
        styles.base,
        styles.withCount,
        styles.controls,
        className
      )}
    >
      <button
        type="button"
        className={styles.controlIcon}
        onClick={onDecrement}
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt="Decrement Quantity"
        />
      </button>
      <span>{quantity === 0 ? 1 : quantity}</span>
      <button
        type="button"
        className={styles.controlIcon}
        onClick={onIncrement}
      >
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt="Increment Quantity"
        />
      </button>
    </div>
  );
};

export const AddToCart = ({
  quantity,
  onDecrement,
  onIncrement,
}: ControlsProps) => {
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
      >
        <div className={styles.content}>
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          Add to Cart
        </div>
      </button>
      <Controls
        quantity={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        className={clsx(quantity === 0 ? styles.hidden : styles.visible)}
      />
    </div>
  );
};
