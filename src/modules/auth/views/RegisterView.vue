<template>
  <h1 class="text-2xl font-semibold mb-4">Registro de nueva cuenta</h1>
  <form action="#" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre completo</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="formRegister.name"
        ref="fullNameInputRef"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        type="text"
        id="email"
        name="email"
        v-model="formRegister.email"
        ref="emailInputRef"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="formRegister.password"
        ref="passwordInputRef"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidó la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      @click.prevent="onRegister"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Crear cuenta
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresar por aquí</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const formRegister = reactive({
  name: '',
  email: '',
  password: '',
});
const fullNameInputRef = ref<HTMLInputElement | null>(null);
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);
const authStore = useAuthStore();
const toast = useToast();

const onRegister = async (): Promise<void> => {
  if (formRegister.name === '') {
    return fullNameInputRef.value?.focus();
  }

  if (formRegister.email === '') {
    return emailInputRef.value?.focus();
  }

  if (formRegister.password === '') {
    return passwordInputRef.value?.focus();
  }

  const resp = await authStore.register(
    formRegister.email.trim(),
    formRegister.password.trim(),
    formRegister.name.trim(),
  );

  if (resp === null) {
    toast.error('Ocurrió un error al crear la cuenta!');
  } else if (resp?.ok) {
    console.log(resp);
  } else {
    let messages = '';
    if (Array.isArray(resp.message)) {
      resp.message?.forEach((msg) => {
        messages += `- ${msg}\n`;
      });
    } else {
      messages = resp.message;
    }
    toast.error(messages);
  }
};

// watch(formRegister, () => {
//   console.log(formRegister);
// });
</script>
