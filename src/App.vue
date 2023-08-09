<script setup lang="ts">
import HeaderLayout from './components/layout/headerLayout/index.vue';
import FooterLayout from './components/layout/footerLayout/index.vue';
</script>

<template>
  <HeaderLayout />
  <main class="min-h-[calc(100vh-3.5rem)] py-14">
    <router-view />
  </main>
  <FooterLayout />
</template>
