import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interfaces';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  // console.log(from);

  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  return authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'home' }) : next();
  // console.log(`Estado: ${authStore.authStatus}`);
};

export default isNotAuthenticatedGuard;
