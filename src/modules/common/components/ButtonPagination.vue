<script setup lang="ts">
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
</script>

<template>
  <div class="flex justify-center py-10 bg-gray-100 space-x-3">
    <button class="btn-pagination">
      <ArrowLeftIcon />
      <span>Anterior</span>
    </button>
    <button class="btn-pagination">
      <span>Siguiente</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.btn-pagination {
  @apply flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-600 disabled:bg-gray-300 hover:bg-blue-900 transition-all w-[150px];
}
</style>
