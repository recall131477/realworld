<script lang="ts">
export default {
  name: 'ArticleMetaComponent',
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { Article } from '@/types';
import type { ErrorObject } from '@/types/error';
import { formatDate } from '@/helper';
import {
  deleteArticle,
  followProfile,
  unfollowProfile,
  favoriteArticle,
  unfavoriteArticle,
} from '@/api';

const props = defineProps<{
  article: Article;
}>();

const emit = defineEmits<{
  (event: 'update-follow'): void;
  (event: 'update-favorite', article: Article): void;
}>();

const router = useRouter();

const userStore = useUserStore();
const { userInfo, isLoggedIn } = storeToRefs(userStore);

const tempArticle = ref<Article>(JSON.parse(JSON.stringify(props.article)));

const isDeleting = ref(false);
const isFollowing = ref(false);
const isFavoriting = ref(false);

const errors = ref<ErrorObject>({});

const isCurrentUser = computed(() => {
  return (
    isLoggedIn && userInfo.value?.username === tempArticle.value.author.username
  );
});

const toggleFollow = async () => {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
    });
  }

  isFollowing.value = true;

  try {
    tempArticle.value.author.following
      ? await unfollowProfile(tempArticle.value.author.username)
      : await followProfile(tempArticle.value.author.username);

    emit('update-follow');
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isFollowing.value = false;
};

const toggleFavorite = async () => {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
    });
  }

  isFavoriting.value = true;

  try {
    const res = tempArticle.value.favorited
      ? await unfavoriteArticle(tempArticle.value.slug)
      : await favoriteArticle(tempArticle.value.slug);

    emit('update-favorite', res.article);
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isFavoriting.value = false;
};

const handleDeleteArticle = async () => {
  isDeleting.value = true;

  try {
    await deleteArticle(tempArticle.value.slug);
    router.push({ name: 'global-feed' });
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isDeleting.value = false;
};

watch(
  () => props.article,
  (newValue) => {
    tempArticle.value = JSON.parse(JSON.stringify(newValue));
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
    <div class="flex items-center gap-x-2">
      <router-link
        :to="{
          name: 'profile',
          params: { username: tempArticle.author.username },
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
        <span class="block text-xs text-[#bbb]">{{
          formatDate(tempArticle.createdAt)
        }}</span>
      </div>
    </div>
    <div class="flex flex-wrap gap-x-2 gap-y-2">
      <template v-if="isCurrentUser">
        <router-link
          :to="{
            name: 'edit-article',
            params: {
              slug: tempArticle.slug,
            },
          }"
          class="inline-block rounded border border-[#ccc] px-2 py-1 text-sm leading-tight text-[#ccc] duration-300 hover:bg-[#ccc] hover:text-[#373a3c]"
        >
          <i class="ion-edit space">&nbsp;</i>
          Edit Article
        </router-link>
        <button
          type="button"
          class="inline-block rounded border border-danger px-2 py-1 text-sm leading-tight text-danger duration-300 hover:bg-danger hover:text-white"
          :disabled="isDeleting"
          @click="handleDeleteArticle"
        >
          <i class="ion-trash-a">&nbsp;</i>
          Delete Article
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="inline-block rounded border border-[#ccc] px-2 py-1 text-sm leading-tight duration-300 hover:bg-white hover:text-[#373a3c] disabled:pointer-events-none disabled:opacity-60"
          :class="
            tempArticle.author.following
              ? 'bg-white text-[#373a3c]'
              : 'text-[#ccc]'
          "
          :disabled="isFollowing"
          @click="toggleFollow"
        >
          <i class="ion-plus-round">&nbsp;</i>
          {{ tempArticle.author.following ? 'Unfollow' : 'Follow' }}
          {{ tempArticle.author.username }}
        </button>
        <button
          type="button"
          class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
          :class="
            tempArticle.favorited ? 'bg-primary text-white' : 'text-primary'
          "
          :disabled="isFavoriting"
          @click="toggleFavorite"
        >
          <i class="ion-heart">&nbsp;</i>
          {{
            tempArticle.favorited ? 'Unfavorite Article' : 'Favorite Article'
          }}
          <span>({{ tempArticle.favoritesCount }})</span>
        </button>
      </template>
    </div>
  </div>
</template>
