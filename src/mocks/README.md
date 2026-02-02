# Mock Data

This directory contains organized mock data for development, testing, and Storybook.

## Structure

```
mocks/
├── data/
│   ├── products.ts    # Raw product catalog data
│   └── index.ts       # Data exports
├── fixtures/
│   ├── shared.ts      # All fixtures and shared utilities
│   └── index.ts       # Fixture exports
└── index.ts           # Main exports
```

## Usage

### Importing from Main Entry

```typescript
import { products, initialCartItems, initialProducts } from "@/mocks";
```

### Importing Fixtures for Stories

```typescript
import {
  productGridWithQuantities,
  productGridEmpty,
  multipleItemsCart,
  emptyCart,
  waffleProduct,
  macaronProduct,
} from "@/mocks/fixtures";

// Use in Storybook stories
export const Default: Story = {
  args: {
    items: productGridWithQuantities,
  },
};
```

## Available Fixtures

### Cart Fixtures

- `initialCartItems` - Initial cart state (Classic Tiramisu, Crème Brûlée, Panna Cotta)
- `multipleItemsCart` - Alias for `initialCartItems`
- `emptyCart` - Empty cart array

### Product Fixtures

- `initialProducts` - Product grid derived from `initialCartItems`
- `productGridWithQuantities` - Product grid with various quantities for stories
- `productGridEmpty` - Product grid with all quantities set to 0
- `waffleProduct` - Single product reference
- `macaronProduct` - Single product reference

### Types

- `ProductItem` - Type for product with quantity

## Best Practices

1. **Use `initialCartItems` and `initialProducts`** for app initialization
2. **Use story fixtures** (`productGridWithQuantities`, `multipleItemsCart`) for Storybook
3. **Keep fixtures centralized** in `fixtures/shared.ts` for easy maintenance
