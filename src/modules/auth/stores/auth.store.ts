import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus, type RegisterError, type RegisterSuccess } from '../interfaces';
import { checkAuthStatusAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);

  // Actions
  const register = async (
    email: string,
    password: string,
    fullName: string,
  ): Promise<RegisterSuccess | RegisterError | null> => {
    try {
      const registerResponse = await registerAction(email, password, fullName);

      if (!registerResponse.ok) {
        return registerResponse;
      }
      setInformationAuthenticated(registerResponse.user, registerResponse.token);
      return registerResponse;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        return logout();
      }

      setInformationAuthenticated(loginResponse.user, loginResponse.token);
      return true;
    } catch (e) {
      console.error(e);
      return logout();
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const responseCheckStatus = await checkAuthStatusAction();
      if (!responseCheckStatus.ok) return logout();

      setInformationAuthenticated(responseCheckStatus.user, responseCheckStatus.token);
      return responseCheckStatus.ok;
    } catch (e) {
      console.error(e);
      return logout();
    }
  };

  // Helpers
  const setInformationAuthenticated = (userResponse: User, tokenResponse: string) => {
    user.value = userResponse;
    token.value = tokenResponse;
    authStatus.value = AuthStatus.Authenticated;
  };

  const logout = () => {
    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.NotAuthenticated;
    localStorage.removeItem('token');
    return false;
  };

  return {
    // Estado
    user,
    token,
    authStatus,

    // Getters
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    username: computed(() => user.value?.fullName),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    // Actions
    login,
    register,
    checkAuthStatus,
    logout,
  };
});
