<template>
  <div class="container-btn">
    <button
      class="btn-pagination"
      :disabled="properties.isFirstPage"
      @click="$router.push({ query: { page: properties.page - 1 } })"
    >
      <ArrowLeftIcon />
      <span>Anterior</span>
    </button>
    <button
      class="btn-pagination"
      :disabled="properties.isLastPage"
      @click="$router.push({ query: { page: properties.page + 1 } })"
    >
      <span>Siguiente</span>
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const properties = defineProps<Props>();
</script>

<style scoped>
@reference "tailwindcss";
.btn-pagination {
  @apply flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-white bg-blue-600 disabled:bg-gray-300 hover:bg-blue-900 transition-all w-[150px];
}
.container-btn {
  @apply flex justify-center py-10 bg-gray-100 space-x-3;
}
</style>
