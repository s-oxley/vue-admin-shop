import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const getProductsAction = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await tesloApi.get<Product[]>(
      `/products?offset=${page * limit}&limit=${limit}`,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
