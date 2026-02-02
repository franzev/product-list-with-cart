import type { CartItem } from "../../types/Cart";
import type { Product } from "../../types/Product";
import { products } from "../data/products";

export type ProductItem = {
  product: Product;
  quantity: number;
};

const createCartItem = (product: Product, quantity: number): CartItem => ({
  product,
  quantity: Math.max(0, quantity),
});

const createProductItem = (
  product: Product,
  quantity: number = 0
): ProductItem => ({
  product,
  quantity,
});

const getQuantityForProduct = (
  productId: string,
  cartItems: CartItem[]
): number =>
  cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;

export const initialCartItems: CartItem[] = [
  createCartItem(products[3], 1),
  createCartItem(products[1], 4),
  createCartItem(products[8], 2),
];

export const initialProducts: ProductItem[] = products.map((product) =>
  createProductItem(
    product,
    getQuantityForProduct(product.id, initialCartItems)
  )
);

export const emptyCart: CartItem[] = [];
export const multipleItemsCart = initialCartItems;

export const productGridWithQuantities: ProductItem[] = products.map(
  (product, index) => {
    const quantities = [0, 3, 0, 5, 0, 2, 1, 4, 7];
    return createProductItem(product, quantities[index] ?? 0);
  }
);

export const productGridEmpty: ProductItem[] = products.map((product) =>
  createProductItem(product, 0)
);

export const waffleProduct = products[0];
export const macaronProduct = products[2];
