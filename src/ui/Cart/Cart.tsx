import type { CartItem } from "../../types";
import { Button } from "../Button";
import { CartItems, Separator, type CartItemsProps } from "../CartItems";
import styles from "./Cart.module.css";

const EmptyCart = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyImage}>
        <img
          src="/assets/images/illustration-empty-cart.svg"
          alt="Empty Cart Illustration"
        />
      </div>
      <span>Your added items will appear here</span>
    </div>
  );
};

export type OrderTotalProps = {
  items: CartItem[];
};

export const OrderTotal = ({ items }: OrderTotalProps) => {
  const orderTotal = items
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className={styles.orderTotal}>
      <span>Order Total</span>
      <span>${orderTotal}</span>
    </div>
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

  return (
    <aside className={styles.base}>
      <h2>Your Cart ({filteredItems.length})</h2>

      {filteredItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartItems items={items} onRemoveItem={onRemoveItem} />

          <Separator />

          <OrderTotal items={items} />

          <div className={styles.carbonNeutral}>
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt="Carbon Neutral"
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
