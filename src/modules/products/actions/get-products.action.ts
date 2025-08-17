import { tesloApi } from '@/api/tesloApi';
import type { Products, Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductsAction = async (
  page: number = 1,
  limit: number = 10,
): Promise<Product[]> => {
  try {
    const { data } = await tesloApi.get<Products>(
      `/products?offset=${page * limit}&limit=${limit}`,
    );
    // console.log(data);

    return data.products.map((product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
