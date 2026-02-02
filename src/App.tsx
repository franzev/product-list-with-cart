import { useState } from "react";
import { CartSection, ProductGrid } from "./ui";
import styles from "./App.module.css";
import productsData from "../data.json";
import type { Product } from "./types";
import type { CartItem } from "./types";

function App() {
  const [items, setItems] = useState<CartItem[]>(
    productsData.map((product) => ({
      product,
      quantity: 0,
    }))
  );

  const handleIncrement = (product: Product) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (product: Product) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.name === product.name && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (itemToRemove: CartItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.name === itemToRemove.product.name
          ? { ...item, quantity: 0 }
          : item
      )
    );
  };

  return (
    <main className={styles.base}>
      <section className={styles.products}>
        <h1>Desserts</h1>
        <ProductGrid
          items={items}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      </section>

      <CartSection items={items} onRemoveItem={handleRemoveItem} />
    </main>
  );
}

export default App;
