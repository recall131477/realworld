<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { getArticle, getComments } from '@/api';
import Loading from '@/components/Loading.vue';
import ArticleMeta from '@/components/ArticleMeta.vue';
import CommentForm from '@/components/CommentForm.vue';
import CommentPreview from '@/components/CommentPreview.vue';
import { Article, Comment } from '@/types';
import type { ErrorObject } from '@/types/error';

const route = useRoute();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const article = ref<Article>({
  slug: '',
  title: '',
  description: '',
  body: '',
  tagList: [],
  createdAt: '',
  updatedAt: '',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: '',
    image: '',
    bio: '',
    following: false,
  },
});
const comments = ref<Comment[]>([]);

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

const sortedComment = computed(() =>
  comments.value
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
);

const fetchArticle = async () => {
  try {
    const res = await getArticle(route.params.slug as string);
    article.value = res.data.article;
  } catch (error) {
    errors.value = (error as any).errors;
  }
};

const fetchComments = async () => {
  try {
    const res = await getComments(route.params.slug as string);
    comments.value = res.data.comments;
  } catch (error) {
    errors.value = (error as any).errors;
  }
};

const createComment = (comment: Comment) => {
  comments.value.push(comment);
};

const deleteComment = (id: number) => {
  const index = comments.value.findIndex((comment) => comment.id === id);
  comments.value.splice(index, 1);
};

const updateArticleFollow = () => {
  article.value.author.following = !article.value.author.following;
};

const updateArticleFavorite = (item: Article) => {
  article.value.favorited = item.favorited;
  article.value.favoritesCount = item.favoritesCount;
};

onMounted(async () => {
  isLoading.value = true;

  try {
    await Promise.all([fetchArticle(), fetchComments()]);
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
});
</script>

<script lang="ts">
export default {
  name: 'ArticleView',
};
</script>

<template>
  <loading :isLoading="isLoading" />
  <div class="bg-[#333] py-8 text-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <h1 class="mb-8 text-[44px] font-semibold leading-none">
        {{ article.title }}
      </h1>
      <article-meta
        :article="article"
        @update-follow="updateArticleFollow"
        @update-favorite="updateArticleFavorite"
      />
    </div>
  </div>
  <div class="pt-8">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="font-serif text-lg">
        {{ article.body }}
      </div>
      <ul class="mt-8 flex gap-1">
        <li v-for="tag in article.tagList" :key="tag">
          <router-link
            :to="{ name: 'tag', params: { tag: tag } }"
            class="rounded-full border border-[#ddd] px-2 text-sm font-light text-[#aaa]"
            >{{ tag }}</router-link
          >
        </li>
      </ul>
      <div class="mb-12 mt-8 border-t border-black/10 pt-6">
        <div class="flex justify-center">
          <article-meta
            :article="article"
            @update-follow="updateArticleFollow"
            @update-favorite="updateArticleFavorite"
          />
        </div>
      </div>
      <div class="space-y-3 md:mx-auto md:w-2/3">
        <comment-form v-if="isLoggedIn" @create-comment="createComment" />
        <p v-else>
          <router-link
            :to="{ name: 'login' }"
            class="duration-300 hover:border-b hover:border-black"
          >
            Sign in
          </router-link>
          or
          <router-link
            :to="{ name: 'register' }"
            class="duration-300 hover:border-b hover:border-black"
          >
            Sign up
          </router-link>
          to add comments on this article.
        </p>
        <comment-preview
          v-for="comment in sortedComment"
          :key="comment.id"
          :comment="comment"
          @delete-comment="deleteComment"
        />
      </div>
    </div>
  </div>
</template>
