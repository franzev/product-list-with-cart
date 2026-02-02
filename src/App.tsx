import { useState } from "react";
import { CartSection, ProductGrid, Modal, OrderConfirmed } from "./ui";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStartNewOrder = () => {
    setIsModalOpen(false);
    // Wait for fade out animation to complete (400ms) before clearing cart
    setTimeout(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({ ...item, quantity: 0 }))
      );
    }, 400);
  };

  const filteredItems = items.filter((item) => item.quantity > 0);

  return (
    <>
      <main className={styles.base} aria-hidden={isModalOpen}>
        <section className={styles.products}>
          <h1>Desserts</h1>
          <ProductGrid
            items={items}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </section>

        <CartSection
          items={items}
          onRemoveItem={handleRemoveItem}
          onConfirmOrder={handleConfirmOrder}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        titleId="order-confirmed-title"
        descriptionId="order-confirmed-description"
      >
        <OrderConfirmed
          items={filteredItems}
          onStartNewOrder={handleStartNewOrder}
        />
      </Modal>
    </>
  );
}

export default App;
