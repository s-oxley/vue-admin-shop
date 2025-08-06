export interface Products {
  count: number;
  pages: number;
  products: Product[];
}

import type { User } from '@/modules/auth/interfaces/user.interface';

export interface Product {
  description: string;
  gender: string;
  id: string;
  images: string[];
  price: number;
  sizes: Size[];
  slug: string;
  stock: number;
  tags: string[];
  title: string;
  user: User;
}

export enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}
