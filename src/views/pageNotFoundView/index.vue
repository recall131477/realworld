<script lang="ts">
export default {
  name: 'NotFoundView',
};
</script>

<template>
  <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-3xl">This page does not exist!!!</h1>
    <router-link
      :to="{ name: 'global-feed' }"
      class="mt-4 block rounded border border-primary px-4 py-2 text-center text-xl duration-300 hover:bg-primary hover:text-white"
      >Go Home</router-link
    >
  </div>
</template>
