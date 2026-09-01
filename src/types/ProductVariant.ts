import type { Product } from "./Product";

export type ProductVariant = {
  id: number;
  product?: Product;
  variantName?: string;
  sku: string;
  barcode?: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
};
