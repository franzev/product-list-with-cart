import { useState } from "react";
import styles from "./App.module.css";
import { initialCartItems, initialProducts } from "./mocks";
import type { CartItem, Product } from "./types";
import { CartSection, Modal, OrderConfirmed, ProductGrid } from "./ui";

interface ProductItem {
  product: Product;
  quantity: number;
}

function App() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIncrement = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCartItems, { product, quantity: 1 }];
    });
  };

  const handleDecrement = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.product.id === product.id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem && existingItem.quantity > 1) {
        return prevCartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      return prevCartItems.filter((item) => item.product.id !== product.id);
    });
  };

  const handleRemoveItem = (itemToRemove: CartItem) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.product.id === itemToRemove.product.id
          ? { ...item, quantity: 0 }
          : item,
      ),
    );

    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) => item.product.id !== itemToRemove.product.id,
      ),
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
      setProducts((prevProducts) =>
        prevProducts.map((item) => ({ ...item, quantity: 0 })),
      );
      setCartItems([]);
    }, 400);
  };

  return (
    <>
      <main
        className={styles.base}
        aria-hidden={isModalOpen}
        aria-label="Product list and shopping cart"
      >
        <section className={styles.products} aria-labelledby="products-heading">
          <h1>Desserts</h1>
          <ProductGrid
            items={products}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </section>

        <CartSection
          items={cartItems}
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
          items={cartItems}
          onStartNewOrder={handleStartNewOrder}
        />
      </Modal>
    </>
  );
}

export default App;
