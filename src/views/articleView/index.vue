<script lang="ts">
export default {
  name: 'ArticleView',
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { Article, Comment } from '@/types';
import type { ErrorObject } from '@/types/error';
import { getArticle, getComments } from '@/api';
import ArticleMetaComponent from '@/components/ArticleMetaComponent.vue';
import CommentFormComponent from '@/components/CommentFormComponent.vue';
import CommentPreviewComponent from '@/components/CommentPreviewComponent.vue';

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

const sortedComment = computed(() => {
  return comments.value
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
});

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

<template>
  <div
    class="fixed left-0 top-0 z-[999] h-full w-full bg-[#f1f2f3] duration-300"
    :class="{
      'invisible opacity-0': !isLoading,
      'visible opacity-100': isLoading,
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; display: block"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <circle cx="75" cy="50" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.9166666666666666s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.9166666666666666s"
        ></animate>
      </circle>
      <circle cx="71.65063509461098" cy="62.5" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.8333333333333334s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.8333333333333334s"
        ></animate>
      </circle>
      <circle cx="62.5" cy="71.65063509461096" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.75s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.75s"
        ></animate>
      </circle>
      <circle cx="50" cy="75" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.6666666666666666s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.6666666666666666s"
        ></animate>
      </circle>
      <circle
        cx="37.50000000000001"
        cy="71.65063509461098"
        fill="#ffffff"
        r="5"
      >
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.5833333333333334s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.5833333333333334s"
        ></animate>
      </circle>
      <circle cx="28.34936490538903" cy="62.5" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.5s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.5s"
        ></animate>
      </circle>
      <circle cx="25" cy="50" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.4166666666666667s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.4166666666666667s"
        ></animate>
      </circle>
      <circle
        cx="28.34936490538903"
        cy="37.50000000000001"
        fill="#ffffff"
        r="5"
      >
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.3333333333333333s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.3333333333333333s"
        ></animate>
      </circle>
      <circle
        cx="37.499999999999986"
        cy="28.34936490538904"
        fill="#ffffff"
        r="5"
      >
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.25s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.25s"
        ></animate>
      </circle>
      <circle cx="49.99999999999999" cy="25" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.16666666666666666s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.16666666666666666s"
        ></animate>
      </circle>
      <circle cx="62.5" cy="28.349364905389034" fill="#ffffff" r="5">
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="-0.08333333333333333s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="-0.08333333333333333s"
        ></animate>
      </circle>
      <circle
        cx="71.65063509461096"
        cy="37.499999999999986"
        fill="#ffffff"
        r="5"
      >
        <animate
          attributeName="r"
          values="3;3;5;3;3"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
        <animate
          attributeName="fill"
          values="#ffffff;#ffffff;#000000;#ffffff;#ffffff"
          repeatCount="indefinite"
          times="0;0.1;0.2;0.3;1"
          dur="1s"
          begin="0s"
        ></animate>
      </circle>
    </svg>
  </div>
  <div class="bg-[#333] py-8 text-white">
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
            class="rounded-full border border-[#ddd] px-2 text-sm font-light text-[#aaa]"
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
        <CommentFormComponent
          v-if="isLoggedIn"
          @create-comment="createComment"
        />
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
        <CommentPreviewComponent
          v-for="comment in sortedComment"
          :key="comment.id"
          :comment="comment"
          @delete-comment="deleteComment"
        />
      </div>
    </div>
  </div>
</template>
