import styles from "./ProductGrid.module.css";
import type { Product } from "../../types";
import { ProductCard } from "../ProductCard";

export interface ProductGridItem {
  product: Product;
  quantity: number;
}

interface ProductGridProps {
  items: ProductGridItem[];
  onDecrement: (product: Product) => void;
  onIncrement: (product: Product) => void;
}

export const ProductGrid = ({
  items,
  onDecrement,
  onIncrement,
}: ProductGridProps) => {
  return (
    <div className={styles.base} role="list" aria-label="Product list">
      {items.map((item) => (
        <ProductCard
          key={item.product.id}
          product={item.product}
          quantity={item.quantity}
          onDecrement={() => {
            onDecrement(item.product);
          }}
          onIncrement={() => {
            onIncrement(item.product);
          }}
        />
      ))}
    </div>
  );
};
