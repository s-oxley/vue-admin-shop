<script setup lang="ts">
import ShopFooter from '../components/ShopFooter.vue'
import TopMenu from '../components/TopMenu.vue'
</script>

<template>
  <!-- Top menu -->
  <TopMenu />
  <!-- Content -->
  <RouterView />
  <!-- Footer -->
  <ShopFooter />
</template>
