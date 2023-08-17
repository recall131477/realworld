<script lang="ts">
export default {
  name: 'ArticleMetaComponent',
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
    <div class="flex items-center gap-x-2">
      <a href="javascript:;" class="h-8 w-8 rounded-full bg-pink-500"></a>
      <div>
        <a href="javascript:;" class="block font-medium">Anah</a>
        <span class="block text-xs text-[#bbbbbb]">2022/12/9</span>
      </div>
    </div>
    <div class="flex flex-wrap gap-x-2 gap-y-2">
      <router-link
        :to="{ name: 'edit-article' }"
        class="inline-block rounded border border-[#cccccc] px-2 py-1 text-sm leading-tight text-[#cccccc] hover:bg-[#cccccc] hover:text-[#373a3c]"
      >
        <i class="ion-edit space">&nbsp;</i>
        Edit Article
      </router-link>
      <button
        type="button"
        class="inline-block rounded border border-danger px-2 py-1 text-sm leading-tight text-danger hover:bg-danger hover:text-white"
      >
        <i class="ion-trash-a">&nbsp;</i>
        Delete Article
      </button>
      <button
        type="button"
        class="inline-block rounded border border-[#cccccc] px-2 py-1 text-sm leading-tight text-[#cccccc] duration-300 hover:bg-white hover:text-[#373a3c] disabled:pointer-events-none disabled:opacity-60"
      >
        <i class="ion-plus-round">&nbsp;</i>
        Follow Anah
      </button>
      <button
        type="button"
        class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight text-primary duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
      >
        <i class="ion-heart">&nbsp;</i>
        Favorite Article
        <span>(1589)</span>
      </button>
    </div>
  </div>
</template>
