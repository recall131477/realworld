<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

const route = useRoute();

watch(route, (to) => {
  const nowTitle = to.meta.title || '';

  document.title = nowTitle === '' ? 'Conduit' : `${nowTitle} - Conduit`;
});
</script>

<template>
  <the-header />
  <main class="min-h-[calc(100vh-3.5rem)] py-14">
    <router-view />
  </main>
  <the-footer />
</template>
