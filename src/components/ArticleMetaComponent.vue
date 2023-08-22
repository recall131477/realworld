<script lang="ts">
export default {
  name: 'ArticleMetaComponent',
};
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Article } from '@/types';
import { formatDate } from '@/helper';

const props = defineProps<{
  article: Article;
}>();

const tempArticle = ref<Article>(JSON.parse(JSON.stringify(props.article)));

watch(
  () => props.article,
  (newValue) => {
    tempArticle.value = JSON.parse(JSON.stringify(newValue));
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
    <div class="flex items-center gap-x-2">
      <router-link
        :to="{
          name: 'profile',
          params: { username: article.author.username },
        }"
        v-if="tempArticle.author.username"
      >
        <img
          class="h-8 w-8 rounded-full object-cover"
          :src="tempArticle.author.image"
          :alt="tempArticle.author.username"
        />
      </router-link>
      <div>
        <router-link
          :to="{
            name: 'profile',
            params: {
              username: tempArticle.author.username,
            },
          }"
          class="block font-medium"
          v-if="tempArticle.author.username"
        >
          {{ tempArticle.author.username }}
        </router-link>
        <span class="block text-xs text-[#bbbbbb]">{{
          formatDate(tempArticle.createdAt)
        }}</span>
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
