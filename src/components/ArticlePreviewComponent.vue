<script lang="ts">
export default {
  name: 'ArticlePreviewComponent',
};
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Article } from '@/types';
import { formatDate } from '@/helper';

const props = defineProps<{
  article: Article;
}>();

const tempArticle = ref<Article>(JSON.parse(JSON.stringify(props.article)));

watch(props.article, (newArticle) => {
  tempArticle.value = JSON.parse(JSON.stringify(newArticle));
});
</script>

<template>
  <div class="border-t border-black/10 py-6">
    <div class="flex items-center justify-between gap-x-4">
      <div class="flex items-center gap-x-2">
        <router-link
          :to="{
            name: 'profile',
            params: { username: tempArticle.author.username },
          }"
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
              params: { username: tempArticle.author.username },
            }"
            class="block font-medium text-primary"
            >{{ tempArticle.author.username }}</router-link
          >
          <span class="block text-xs text-[#bbbbbb]">{{
            formatDate(tempArticle.createdAt)
          }}</span>
        </div>
      </div>
      <button
        type="button"
        class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
        :class="{
          'bg-primary text-white': article.favorited,
          'text-primary': !article.favorited,
        }"
      >
        <i class="ion-heart"></i> {{ tempArticle.favoritesCount }}
      </button>
    </div>
    <router-link
      :to="{
        name: 'article',
        params: {
          slug: tempArticle.slug,
        },
      }"
      class="mt-4 block"
    >
      <h2 class="text-2xl font-semibold leading-[1.1]">
        {{ tempArticle.title }}
      </h2>
      <p class="mt-1 font-light text-[#999999]">
        {{ tempArticle.description }}
      </p>
      <div class="mt-4 flex justify-between gap-x-4">
        <span class="text-sm font-light text-[#bbbbbb]">Read more...</span>
        <ul class="flex flex-wrap gap-1">
          <li
            class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
            v-for="tag in tempArticle.tagList"
            :key="tag"
          >
            <span>{{ tag }}</span>
          </li>
        </ul>
      </div>
    </router-link>
  </div>
</template>
