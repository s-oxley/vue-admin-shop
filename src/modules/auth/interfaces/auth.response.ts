import type { User } from './user.interface';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterError {
  ok: false;
  message: string[];
  error: string;
  statusCode: number;
}

export interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}
