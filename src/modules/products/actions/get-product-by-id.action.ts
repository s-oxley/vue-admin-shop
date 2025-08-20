import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);
    // console.dir(data);

    return {
      ...data,
      images: data.images.map((img) => getProductImageAction(img)),
    };
  } catch (error) {
    console.error(error);
  }
};
