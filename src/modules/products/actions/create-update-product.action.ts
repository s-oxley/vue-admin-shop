import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  if (product.id && product.id !== '') {
    // update product
    return await updateProduct(product);
  }

  // create product
  return await createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  const productId = product.id;
  product = prepareProduct(product);

  try {
    const { data } = await tesloApi.patch(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  product = prepareProduct(product);

  try {
    const { data } = await tesloApi.post(`/products`, product);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating product');
  }
};

const prepareProduct = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }
      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};
