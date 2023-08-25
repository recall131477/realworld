<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import HeaderLayout from '@/components/layout/headerLayout/index.vue';
import FooterLayout from '@/components/layout/footerLayout/index.vue';

const route = useRoute();

watch(route, (to) => {
  const nowTitle = to.meta.title || '';

  document.title = nowTitle === '' ? 'Conduit' : `${nowTitle} - Conduit`;
});
</script>

<template>
  <HeaderLayout />
  <main class="min-h-[calc(100vh-3.5rem)] py-14">
    <router-view />
  </main>
  <FooterLayout />
</template>
