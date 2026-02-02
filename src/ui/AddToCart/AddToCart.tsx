import clsx from 'clsx';
import styles from './AddToCart.module.css';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';

export type AddToCartProps = HTMLAttributes<HTMLButtonElement> & {
  count?: number;
  children?: string;
};

type ControlsProps = {
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const Controls = ({ count, onDecrement, onIncrement }: ControlsProps) => {
  return (
    <div className={clsx(styles.base, styles.withCount, styles.controls)}>
      <button type="button" className={styles.controlIcon} onClick={onDecrement}>
        <img src="/assets/images/icon-decrement-quantity.svg" alt="Decrement Quantity" />
      </button>
      <span>{count}</span>
      <button type="button" className={styles.controlIcon} onClick={onIncrement}>
        <img src="/assets/images/icon-increment-quantity.svg" alt="Increment Quantity" />
      </button>
    </div>
  );
};

export const AddToCart = ({ count = 0, children = 'Add to Cart'}: AddToCartProps) => {
  const [quantity, setQuantity] = useState(count);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
    }
  };

  if (quantity === 0) {
    return (
      <button type="button" className={clsx(styles.base, styles.empty)} onClick={handleAddToCart}>
        <div className={styles.content}>
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          {children}
        </div>
      </button>
    );
  }

  return (
    <Controls count={quantity} onDecrement={handleDecrement} onIncrement={handleIncrement} />
  );
};
