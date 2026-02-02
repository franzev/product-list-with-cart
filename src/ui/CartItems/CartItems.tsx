import type { CartItem } from "../../types";
import styles from "./CartItems.module.css";

export type CartItemsProps = {
  items: CartItem[];
  onRemoveItem: (item: CartItem) => void;
};

export const Separator = () => {
  return <div className={styles.separator} />;
};

export const CartItems = ({ items }: CartItemsProps) => {
  return (
    <ul className={styles.base}>
      {items.map((item, index) => (
        <>
          <li className={styles.item} key={`${index}-${item.product.name}`}>
            <div className={styles.itemContent}>
              <span className={styles.itemName}>{item.product.name}</span>

              <div className={styles.qtyAndPrice}>
                <span className={styles.quantity}>{item.quantity}x</span>
                <span className={styles.price}>
                  @ ${item.product.price.toFixed(2)}
                </span>
                <span className={styles.total}>
                  ${(item.quantity * item.product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <button type="button">
              <img
                src="/assets/images/icon-remove-item.svg"
                alt="Remove Item"
              />
            </button>
          </li>
          {index !== items.length - 1 && (
            <li>
              <Separator />
            </li>
          )}
        </>
      ))}
    </ul>
  );
};
