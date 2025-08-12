<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Correo Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo Electrónico</label>
      <input
        v-model="form.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        type="password"
        v-model="form.password"
        ref="passwordInputRef"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        class="text-blue-500"
        v-model="form.rememberMe"
      />
      <label for="remember" class="text-gray-600 ml-2">Recordar usuario</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      @click="onLogin"
      type="button"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear una cuenta</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

// const email = ref('');
// const password = ref('');
const toast = useToast();
const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
});
const authStore = useAuthStore();
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  const userEmail = localStorage.getItem('email');
  console.log(`email: ${userEmail}`);
  if (userEmail) {
    form.email = userEmail;
    form.rememberMe = true;
  }
});

const onLogin = async () => {
  // console.log(form);
  if (form.email === '') {
    return emailInputRef.value?.focus();
  }

  if (form.password === '') {
    return passwordInputRef.value?.focus();
  }

  if (form.rememberMe) {
    localStorage.setItem('email', form.email);
  } else {
    localStorage.removeItem('email');
  }

  const ok = await authStore.login(form.email, form.password);

  if (ok) {
    console.log(ok);
    return;
  } else {
    toast.error('Credenciales inválidas!');
  }
};
</script>
