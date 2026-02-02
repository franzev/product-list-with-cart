import { Fragment } from "react";
import type { CartItem } from "../../types";
import { Button } from "../Button";
import { OrderTotal } from "../Cart";
import { Separator } from "../CartItems";
import styles from "./OrderConfirmed.module.css";

type OrderConfirmedProps = {
  items: CartItem[];
  onStartNewOrder?: () => void;
};

export const OrderConfirmed = ({
  items,
  onStartNewOrder,
}: OrderConfirmedProps) => {
  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <img
          className={styles.icon}
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          aria-hidden="true"
        />

        <div className={styles.title}>
          <h2 id="order-confirmed-title">Order Confirmed</h2>

          <span id="order-confirmed-description">
            We hope you enjoy your food!
          </span>
        </div>
      </div>

      <div className={styles.inner}>
        <ul className={styles.items}>
          {items.map((item, index) => (
            <Fragment key={item.product.id}>
              <li className={styles.item}>
                <div className={styles.itemContent}>
                  <img
                    src={item.product.image.thumbnail}
                    alt={item.product.name}
                  />

                  <div className={styles.itemDetails}>
                    <span className={styles.itemName}>{item.product.name}</span>

                    <div className={styles.qtyAndPrice}>
                      <span className={styles.quantity}>{item.quantity}x</span>
                      <span className={styles.price}>
                        @ ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={styles.total}>
                  ${(item.quantity * item.product.price).toFixed(2)}
                </span>
              </li>

              {items.length > 1 && index !== items.length - 1 && (
                <li>
                  <Separator />
                </li>
              )}
            </Fragment>
          ))}
        </ul>

        <Separator />

        <OrderTotal items={items} />
      </div>

      <Button onClick={onStartNewOrder}>Start New Order</Button>
    </div>
  );
};
