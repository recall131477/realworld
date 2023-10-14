<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouteLocationNormalized } from 'vue-router';
import { pageToOffset } from '@/helper';
import { getArticles } from '@/api';
import ArticlePreview from '@/components/ArticlePreview.vue';
import Pagination from '@/components/Pagination.vue';
import type { Article, ArticleType, ArticleConfig } from '@/types';
import type { ErrorObject } from '@/types/error';

const route = useRoute();

const articles = ref<Article[]>([]);
const articlesCount = ref(0);
const currentPage = ref(1);

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

const fetchArticles = async () => {
  isLoading.value = true;

  const config: ArticleConfig = {
    type: route.name as ArticleType,
    params: {
      ...pageToOffset(currentPage.value),
    },
  };

  setArticleParams(config, route);

  try {
    const res = await getArticles(config);

    articles.value = res.data.articles;
    articlesCount.value = res.data.articlesCount;
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const setArticleParams = (
  config: ArticleConfig,
  route: RouteLocationNormalized
) => {
  switch (route.name) {
    case 'tag':
      if (typeof route.params.tag === 'string') {
        const newConfig = { ...config };
        newConfig.params.tag = route.params.tag;
      }
      break;
    case 'profile':
      if (typeof route.params.username === 'string') {
        const newConfig = { ...config };
        newConfig.params.author = route.params.username;
      }
      break;
    case 'profile-favorites':
      if (typeof route.params.username === 'string') {
        const newConfig = { ...config };
        newConfig.params.favorited = route.params.username;
      }
      break;
    default:
      break;
  }
};

const updateArticleFavorite = (article: Article) => {
  const index = articles.value.findIndex((item) => item.slug === article.slug);

  articles.value[index].favorited = article.favorited;
  articles.value[index].favoritesCount = article.favoritesCount;

  if (route.name === 'profile-favorites') {
    fetchArticles();
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

<script lang="ts">
export default {
  name: 'ArticleListComponent',
};
</script>

<template>
  <div v-if="isLoading" class="border-t border-black/10 py-6">
    Loading articles...
  </div>
  <template v-else>
    <div v-if="!articles.length" class="border-t border-black/10 py-6">
      No articles are here... yet.
    </div>
    <template v-else>
      <ul>
        <li v-for="article in articles" :key="article.slug">
          <article-preview
            :article="article"
            @update-article-favorite="updateArticleFavorite"
          />
        </li>
      </ul>
      <pagination
        :articles-count="articlesCount"
        :current-page="currentPage"
        @change-page="changePage"
      />
    </template>
  </template>
</template>
