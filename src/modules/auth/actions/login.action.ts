import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces/user.interface';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email, password });
    console.log(data);
    return {
      ok: true,
      ...data,
    };
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 401) {
        return {
          ok: false,
          message: 'Usuario/Contraseña no son correctos',
        };
      }
    }

    console.error(e);
    throw new Error('No se pudo realizar al petición');
  }
};
