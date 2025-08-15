import { tesloApi } from '@/api/tesloApi';
import { isAxiosError } from 'axios';
import type { AuthResponse, RegisterError, RegisterSuccess } from '../interfaces';

export const registerAction = async (
  email: string,
  password: string,
  fullName: string,
): Promise<RegisterSuccess | RegisterError> => {
  // console.log('registerAction');

  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      email,
      password,
      fullName,
    });
    // console.log(data);
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 400) {
        return {
          ok: false,
          message: error.response.data.message,
          statusCode: error.response.data.status,
          error: error.response.data.error,
        };
      }
    }
    throw new Error('No se pudo realizar la petición');
  }
};
