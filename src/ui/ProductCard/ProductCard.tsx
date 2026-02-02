import type { CartItem, Product } from "../../types";
import { AddToCart } from "../AddToCart";
import styles from "./ProductCard.module.css";

type ProductCardProps = CartItem & {
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
    <article className={styles.base} aria-label={product.name}>
      <div className={styles.imageAndControls}>
        <img
          src={product.image.mobile}
          alt={`${product.name} - ${product.category}`}
          className={quantity > 0 ? styles.withQuantity : undefined}
          loading="lazy"
        />
        <AddToCart
          quantity={quantity}
          onDecrement={() => onDecrement(product)}
          onIncrement={() => onIncrement(product)}
          productName={product.name}
        />
      </div>

      <div className={styles.productInfo}>
        <span
          className={styles.category}
          aria-label={`Category: ${product.category}`}
        >
          {product.category}
        </span>

        <h3 className={styles.name}>{product.name}</h3>

        <span
          className={styles.price}
          aria-label={`Price: $${product.price.toFixed(2)}`}
        >
          ${product.price.toFixed(2)}
        </span>
      </div>
    </article>
  );
};
