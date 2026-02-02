import { Fragment } from "react";
import type { CartItem } from "../../types";
import styles from "./CartItems.module.css";

export type CartItemsProps = {
  items: CartItem[];
  onRemoveItem: (item: CartItem) => void;
};

export const Separator = () => {
  return <div className={styles.separator} />;
};

export const CartItems = ({ items, onRemoveItem }: CartItemsProps) => {
  const filteredItems = items.filter((item) => item.quantity > 0);

  return (
    <ul className={styles.base}>
      {filteredItems.map((item, index) => (
        <Fragment key={item.product.id}>
          <li className={styles.item}>
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

            <button
              type="button"
              onClick={() => onRemoveItem(item)}
              aria-label={`Remove ${item.product.name} from cart`}
            >
              <img
                src="/assets/images/icon-remove-item.svg"
                alt=""
                aria-hidden="true"
              />
            </button>
          </li>
          {filteredItems.length > 1 && index !== filteredItems.length - 1 && (
            <li>
              <Separator />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};
