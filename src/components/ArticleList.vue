<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, RouteLocationNormalized } from 'vue-router';
import { pageToOffset } from '@/helper';
import { getArticles } from '@/api';
import ArticlePreview from '@/components/ArticlePreview.vue';
import Pagination from '@/components/Pagination.vue';
// 假頭像圖片
import fakeAuthorImage from '@/assets/images/turtle.jpg';
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

// 假資料
const fakeArticles = ref<Article[]>([
  {
    title: '深入了解 TypeScript 泛型',
    description: '學習如何有效使用 TypeScript 的泛型功能。',
    body: '泛型是 TypeScript 中一個非常強大的工具，可以用來撰寫靈活又可重複使用的程式碼...',
    tagList: ['TypeScript', '泛型', '程式設計'],
    slug: 'understanding-typescript-generics',
    createdAt: '2024-11-19T08:30:00Z',
    updatedAt: '2024-11-19T10:00:00Z',
    favorited: true,
    favoritesCount: 120,
    author: {
      username: '程式達人',
      bio: '熱愛程式設計，喜歡分享知識。',
      image: fakeAuthorImage,
      following: false,
    },
  },
  {
    title: 'Vue 3 的新功能介紹',
    description: '完整介紹 Vue 3 的全新功能。',
    body: 'Vue 3 帶來了 Composition API、更快的效能，以及更完善的 TypeScript 支援...',
    tagList: ['Vue', 'JavaScript', '前端開發'],
    slug: 'vue-3-whats-new',
    createdAt: '2024-11-18T14:00:00Z',
    updatedAt: '2024-11-18T16:30:00Z',
    favorited: false,
    favoritesCount: 75,
    author: {
      username: '前端高手',
      bio: '專職於前端開發，也是 UI/UX 愛好者。',
      image: fakeAuthorImage,
      following: true,
    },
  },
  {
    title: 'React Hooks 大解密',
    description: '了解 React Hooks 的基本觀念與進階應用。',
    body: 'React Hooks，例如 `useState` 和 `useEffect`，讓開發者可以在函式型元件中輕鬆管理狀態與生命週期...',
    tagList: ['React', 'Hooks', 'JavaScript'],
    slug: 'demystifying-react-hooks',
    createdAt: '2024-11-17T09:00:00Z',
    updatedAt: '2024-11-17T09:45:00Z',
    favorited: true,
    favoritesCount: 200,
    author: {
      username: 'React 達人',
      bio: '分享 React 生態系的開發技巧與教學。',
      image: fakeAuthorImage,
      following: false,
    },
  },
  {
    title: '深入淺出 Node.js Streams',
    description: '帶你認識 Node.js 中的資料流處理。',
    body: '資料流是 Node.js 中一個核心概念，適合用來高效處理大量的資料...',
    tagList: ['Node.js', '後端開發', '資料流'],
    slug: 'exploring-nodejs-streams',
    createdAt: '2024-11-16T12:00:00Z',
    updatedAt: '2024-11-16T14:00:00Z',
    favorited: false,
    favoritesCount: 58,
    author: {
      username: '後端專家',
      bio: '專精於 Node.js 的後端開發工程師。',
      image: fakeAuthorImage,
      following: true,
    },
  },
  {
    title: 'CSS Grid：打造現代化版面設計',
    description: '掌握 CSS Grid，輕鬆完成現代化的網頁版面設計。',
    body: 'CSS Grid 是 CSS 中一套非常強大的版面配置工具，讓開發者可以快速建立響應式的設計...',
    tagList: ['CSS', '前端設計', '網頁排版'],
    slug: 'css-grid-modern-layouts',
    createdAt: '2024-11-15T07:15:00Z',
    updatedAt: '2024-11-15T09:20:00Z',
    favorited: true,
    favoritesCount: 90,
    author: {
      username: 'CSS 女王',
      bio: '熱愛所有與樣式設計相關的事物。',
      image: fakeAuthorImage,
      following: false,
    },
  },
]);
const fakeArticlesCount = ref(100);
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
  <!-- <template v-else>
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
  </template> -->
  <template v-else>
    <div v-if="!fakeArticles.length" class="border-t border-black/10 py-6">
      No articles are here... yet.
    </div>
    <template v-else>
      <ul>
        <li v-for="article in fakeArticles" :key="article.slug">
          <article-preview
            :article="article"
            @update-article-favorite="updateArticleFavorite"
          />
        </li>
      </ul>
      <pagination
        :articles-count="fakeArticlesCount"
        :current-page="currentPage"
        @change-page="changePage"
      />
    </template>
  </template>
</template>
