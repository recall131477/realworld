<script lang="ts">
export default {
  name: 'ArticleView',
};
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Article, Comment } from '@/types';
import type { ErrorObject } from '@/types/error';
import { getArticle, getComments } from '@/api';
import ArticleMetaComponent from '@/components/ArticleMetaComponent.vue';
import CommentFormComponent from '@/components/CommentFormComponent.vue';
import CommentPreviewComponent from '@/components/CommentPreviewComponent.vue';

const route = useRoute();

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

const errors = ref<ErrorObject>({});

const fetchArticle = async () => {
  try {
    const res = await getArticle(route.params.slug as string);
    article.value = res.article;
  } catch (error) {
    errors.value = (error as any).errors;
  }
};

const fetchComments = async () => {
  try {
    const res = await getComments(route.params.slug as string);
    comments.value = res.comments;
    console.log(comments.value);
  } catch (error) {
    errors.value = (error as any).errors;
  }
};

const createComment = (comment: Comment) => {
  comments.value.push(comment);
};

const updateArticleFollow = () => {
  article.value.author.following = !article.value.author.following;
};

const updateArticleFavorite = (item: Article) => {
  article.value.favorited = item.favorited;
  article.value.favoritesCount = item.favoritesCount;
};

onMounted(() => {
  fetchArticle();
  fetchComments();
});
</script>

<template>
  <div class="bg-[#333333] py-8 text-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <h1 class="mb-8 text-[44px] font-semibold leading-none">
        {{ article.title }}
      </h1>
      <ArticleMetaComponent
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
            class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
            >{{ tag }}</router-link
          >
        </li>
      </ul>
      <div class="mb-12 mt-8 border-t border-black/10 pt-6">
        <div class="flex justify-center">
          <ArticleMetaComponent
            :article="article"
            @update-follow="updateArticleFollow"
            @update-favorite="updateArticleFavorite"
          />
        </div>
      </div>
      <div class="space-y-3 md:mx-auto md:w-2/3">
        <CommentFormComponent @create-comment="createComment" />
        <p>Sign in</p>
        <CommentPreviewComponent
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>
