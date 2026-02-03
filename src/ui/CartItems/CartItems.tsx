import { Fragment } from "react";
import type { CartItem } from "../../types";
import styles from "./CartItems.module.css";

export interface CartItemsProps {
  items: CartItem[];
  onRemoveItem: (item: CartItem) => void;
}

export const Separator = () => {
  return <div className={styles.separator} aria-hidden="true" />;
};

export const CartItems = ({ items, onRemoveItem }: CartItemsProps) => {
  const filteredItems = items.filter((item) => item.quantity > 0);

  return (
    <ul className={styles.base} aria-label="Cart items">
      {filteredItems.map((item, index) => (
        <Fragment key={item.product.id}>
          <li
            className={styles.item}
            aria-label={`Cart item: ${item.product.name}`}
          >
            <div className={styles.itemContent}>
              <span
                className={styles.itemName}
                aria-label={`Product name: ${item.product.name}`}
              >
                {item.product.name}
              </span>

              <div
                className={styles.qtyAndPrice}
                role="group"
                aria-label={`Pricing for ${item.product.name}`}
              >
                <span
                  className={styles.quantity}
                  aria-label={`Quantity: ${item.quantity.toString()}`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {item.quantity}x
                </span>
                <span
                  className={styles.price}
                  aria-label={`Price per item: $${item.product.price.toFixed(
                    2
                  )}`}
                >
                  @ ${item.product.price.toFixed(2)}
                </span>
                <span
                  className={styles.total}
                  aria-label={`Item total: $${(
                    item.quantity * item.product.price
                  ).toFixed(2)}`}
                >
                  ${(item.quantity * item.product.price).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onRemoveItem(item);
              }}
              aria-label={`Remove ${item.product.name} from cart`}
            >
              <img
                src="/images/icon-remove-item.svg"
                alt=""
                aria-hidden="true"
              />
            </button>
          </li>
          {filteredItems.length > 1 && index !== filteredItems.length - 1 && (
            <li aria-hidden="true">
              <Separator />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};
