<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
// se suscribe a los cambios del store authStore
authStore.$subscribe(
  (mutation, state) => {
    // console.log(state.authStatus);
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }
    // console.log(state.authStatus);

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
