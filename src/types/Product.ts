import type { Category } from "./Category";
import type { Brand } from "./Brand";
import type { Supplier } from "./Supplier";

export type Product = {
  id: number;
  name: string;
  description?: string;
  category?: Category;
  brand?: Brand;
  supplier?: Supplier;
};
