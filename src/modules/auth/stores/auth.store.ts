import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        return logout();
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (e) {
      console.error(e);
      return logout();
    }
  };

  const logout = () => {
    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.NotAuthenticated;
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

    // Actions
    login,
  };
});
