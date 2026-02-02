import clsx from "clsx";
import styles from "./AddToCart.module.css";

type ControlsProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const Controls = ({ quantity, onDecrement, onIncrement }: ControlsProps) => {
  return (
    <div className={clsx(styles.base, styles.withCount, styles.controls)}>
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
      <span>{quantity}</span>
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
  if (quantity === 0) {
    return (
      <button
        type="button"
        className={clsx(styles.base, styles.empty)}
        onClick={onIncrement}
      >
        <div className={styles.content}>
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          Add to Cart
        </div>
      </button>
    );
  }

  return (
    <Controls
      quantity={quantity}
      onDecrement={onDecrement}
      onIncrement={onIncrement}
    />
  );
};
