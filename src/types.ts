// types.ts
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  discount?: string;
  createdAt: Date;
  updatedAt: Date;
};
