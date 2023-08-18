<script lang="ts">
export default {
  name: 'ArticlePreviewComponent',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import type { Article } from '@/types';
import type { ErrorObject } from '@/types/error';
import { formatDate } from '@/helper';
import { favoriteArticle, unfavoriteArticle } from '@/api';

const props = defineProps<{
  article: Article;
}>();

const emit = defineEmits<{
  (event: 'update-article-favorite', article: Article): void;
}>();

const router = useRouter();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const errors = ref<ErrorObject>({});

const toggleFavorite = async () => {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
    });
  }

  try {
    const res = props.article.favorited
      ? await unfavoriteArticle(props.article.slug)
      : await favoriteArticle(props.article.slug);

    emit('update-article-favorite', res.article);
  } catch (error) {
    errors.value = (error as any).errors;
  }
};
</script>

<template>
  <div class="border-t border-black/10 py-6">
    <div class="flex items-center justify-between gap-x-4">
      <div class="flex items-center gap-x-2">
        <router-link
          :to="{
            name: 'profile',
            params: { username: article.author.username },
          }"
        >
          <img
            class="h-8 w-8 rounded-full object-cover"
            :src="article.author.image"
            :alt="article.author.username"
          />
        </router-link>
        <div>
          <router-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            class="block font-medium text-primary"
            >{{ article.author.username }}</router-link
          >
          <span class="block text-xs text-[#bbbbbb]">{{
            formatDate(article.createdAt)
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
        @click="toggleFavorite"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link
      :to="{
        name: 'article',
        params: {
          slug: article.slug,
        },
      }"
      class="mt-4 block"
    >
      <h2 class="text-2xl font-semibold leading-[1.1]">
        {{ article.title }}
      </h2>
      <p class="mt-1 font-light text-[#999999]">
        {{ article.description }}
      </p>
      <div class="mt-4 flex justify-between gap-x-4">
        <span class="text-sm font-light text-[#bbbbbb]">Read more...</span>
        <ul class="flex flex-wrap gap-1">
          <li
            class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
            v-for="tag in article.tagList"
            :key="tag"
          >
            <span>{{ tag }}</span>
          </li>
        </ul>
      </div>
    </router-link>
  </div>
</template>
