<script lang="ts">
export default {
  name: 'ArticleListComponent',
};
</script>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouteLocationNormalized } from 'vue-router';
import type { Article, ArticleType, ArticleConfig } from '@/types';
import type { ErrorObject } from '@/types/error';
import { pageToOffset } from '@/helper';
import { getArticles } from '@/api';
import ArticlePreviewComponent from '@/components/ArticlePreviewComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const route = useRoute();

const articles = ref<Article[]>([]);
const articlesCount = ref(0);
const currentPage = ref(1);

const errors = ref<ErrorObject>({});

const fetchArticles = async () => {
  const config: ArticleConfig = {
    type: route.name as ArticleType,
    params: {
      ...pageToOffset(currentPage.value),
    },
  };

  setArticleParams(config, route);

  try {
    const res = await getArticles(config);
    articles.value = res.articles;
    articlesCount.value = res.articlesCount;
  } catch (error) {
    errors.value = (error as any).errors;
  }
};

const setArticleParams = (
  config: ArticleConfig,
  route: RouteLocationNormalized
) => {
  switch (route.name) {
    case 'tag':
      if (typeof route.params.tag === 'string') {
        config.params.tag = route.params.tag;
      }
      break;
    case 'profile':
      if (typeof route.params.username === 'string') {
        config.params.author = route.params.username;
      }
      break;
    case 'profile-favorites':
      if (typeof route.params.username === 'string') {
        config.params.favorited = route.params.username;
      }
      break;
    default:
      break;
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
  fetchArticles();
};

onMounted(() => {
  fetchArticles();
});

watch(
  route,
  () => {
    fetchArticles();
  },
  { immediate: true }
);
</script>

<template>
  <ul>
    <li v-for="article in articles" :key="article.slug">
      <ArticlePreviewComponent :article="article" />
    </li>
  </ul>
  <PaginationComponent
    :articles-count="articlesCount"
    :current-page="currentPage"
    @change-page="changePage"
  />
</template>
