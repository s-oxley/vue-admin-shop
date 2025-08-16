import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthStatusAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (!localToken)
      return {
        ok: false,
      };

    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        ok: false,
      };
    }
    throw new Error('No se pudo realizar la petición');
  }
};
