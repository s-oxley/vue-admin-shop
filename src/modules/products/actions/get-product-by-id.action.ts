import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImageAction } from './get-product-image.action';

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  if (productId === 'new') {
    return {
      id: '',
      title: '',
      description: '',
      price: 0,
      slug: '',
      stock: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gender: '' as any,
      sizes: [],
      images: [],
      tags: [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: {} as any,
    };
  }

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
