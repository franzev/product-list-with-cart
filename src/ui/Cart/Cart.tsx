import type { CartItem } from "../../types";
import { Button } from "../Button";
import { CartItems, Separator, type CartItemsProps } from "../CartItems";
import styles from "./Cart.module.css";

const EmptyCart = () => {
  return (
    <div
      className={styles.empty}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={styles.emptyImage}>
        <img
          src="/images/illustration-empty-cart.svg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <p>Your added items will appear here</p>
    </div>
  );
};

export interface OrderTotalProps {
  items: CartItem[];
}

export const OrderTotal = ({ items }: OrderTotalProps) => {
  const orderTotal = items
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <dl className={styles.orderTotal}>
      <dt>Order Total</dt>
      <dd>${orderTotal}</dd>
    </dl>
  );
};

type CartSectionProps = CartItemsProps & {
  onConfirmOrder?: () => void;
};

export const CartSection = ({
  items,
  onRemoveItem,
  onConfirmOrder,
}: CartSectionProps) => {
  const filteredItems = items.filter((item) => item.quantity > 0);
  const totalQuantity = filteredItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <aside
      className={styles.base}
      aria-labelledby="cart-heading"
      aria-live="polite"
    >
      <h2 id="cart-heading">Your Cart ({totalQuantity})</h2>

      {filteredItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartItems items={items} onRemoveItem={onRemoveItem} />

          <Separator />

          <OrderTotal items={items} />

          <div
            className={styles.carbonNeutral}
            role="note"
            aria-label="Carbon neutral delivery"
          >
            <img
              src="/images/icon-carbon-neutral.svg"
              alt=""
              aria-hidden="true"
            />
            <span>
              This is a <strong>carbon-neutral</strong> delivery
            </span>
          </div>

          <Button onClick={onConfirmOrder}>Confirm Order</Button>
        </>
      )}
    </aside>
  );
};
