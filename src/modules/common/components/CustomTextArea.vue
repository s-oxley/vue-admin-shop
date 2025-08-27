<template>
  <div>
    <textarea
      :type="props.type"
      :value="props.modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '')"
      @blur="$emit('blur')"
      :class="['text-area', { 'border-red-500': error }]"
    ></textarea>
    <span class="text-red-400" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  error?: string;
  type: 'text' | 'number';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});
defineEmits(['update:modelValue', 'blur']);
</script>

<style scoped>
@reference "tailwindcss";
.text-area {
  @apply shadow h-32 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
</style>
