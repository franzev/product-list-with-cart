import type { Product } from "../../types";
import { AddToCart } from "../AddToCart";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onDecrement: (product: Product) => void;
  onIncrement: (product: Product) => void;
};

export const ProductCard = ({
  product,
  quantity,
  onDecrement,
  onIncrement,
}: ProductCardProps) => {
  return (
    <div className={styles.base}>
      <div className={styles.imageAndControls}>
        <img
          src={product.image.mobile}
          alt={product.name}
          className={quantity > 0 ? styles.withQuantity : undefined}
        />
        <AddToCart
          quantity={quantity}
          onDecrement={() => onDecrement(product)}
          onIncrement={() => onIncrement(product)}
        />
      </div>

      <div className={styles.productInfo}>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
