import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;

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

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((img) => img instanceof File) as File[];
  const filesCurrentImages = images.filter((img) => typeof img === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await tesloApi.post<{ secure_url: string }>('/files/product', formData);
      return data.secure_url;
    } catch (error) {
      console.error(error);
      throw new Error('Error uploading images');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);
  return [...uploadedImages, ...filesCurrentImages];
};
