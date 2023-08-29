<script lang="ts">
export default {
  name: 'ProfileView',
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import type { Author } from '@/types';
import type { ErrorObject } from '@/types/error';
import { getProfile, followProfile, unfollowProfile } from '@/api';
import ArticleListComponent from '@/components/ArticleListComponent.vue';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const { userInfo, isLoggedIn } = storeToRefs(userStore);

const profile = ref<Author>({
  username: '',
  bio: '',
  image: '',
  following: false,
});

const isLoading = ref(false);
const isFollowing = ref(false);

const errors = ref<ErrorObject>({});

const isCurrentUser = computed(() => {
  return isLoggedIn && userInfo.value?.username === profile.value.username;
});

const fetchProfile = async () => {
  isLoading.value = true;

  try {
    const res = await getProfile(route.params.username as string);
    profile.value = res.profile;
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const toggleFollow = async () => {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
    });
  }

  isFollowing.value = true;

  try {
    const res = profile.value.following
      ? await unfollowProfile(profile.value.username)
      : await followProfile(profile.value.username);
    profile.value.following = res.profile.following;
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isFollowing.value = false;
};

onMounted(() => {
  fetchProfile();
});

watch(
  () => route.params.username,
  () => {
    fetchProfile();
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-[#f3f3f3] py-8 pb-4">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <div v-if="isLoading">Loading profile...</div>
        <template v-else>
          <img
            :src="profile.image"
            :alt="profile.username"
            class="mx-auto h-[100px] w-[100px] rounded-full object-cover"
          />
          <div class="mt-4 text-center">
            <h1 class="text-2xl font-bold">{{ profile.username }}</h1>
            <p class="mt-1 font-light text-[#aaa]">{{ profile.bio }}</p>
          </div>
          <div class="mt-2 text-right">
            <router-link
              :to="{ name: 'settings' }"
              class="inline-block rounded border border-[#999] px-2 py-1 text-sm leading-tight text-[#999] duration-300 hover:bg-[#ccc]"
              v-if="isCurrentUser"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
            <button
              type="button"
              class="inline-block rounded border border-[#999] px-2 py-1 text-sm leading-tight text-[#999] hover:bg-[#ccc] disabled:pointer-events-none disabled:opacity-60"
              :class="{ 'bg-white text-[#373a3c]': profile.following }"
              :disabled="isFollowing"
              @click="toggleFollow"
              v-else
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? 'Unfollow' : 'Follow' }}
              {{ profile.username }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <ul class="flex">
          <li>
            <router-link
              :to="{ name: 'profile' }"
              class="block border-b-2 px-4 py-2 duration-300 hover:border-primary hover:text-primary"
              :class="
                route.name === 'profile'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-[#aaa]'
              "
              >My Articles
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'profile-favorites' }"
              class="block border-b-2 px-4 py-2 duration-300 hover:border-primary hover:text-primary"
              :class="
                route.name === 'profile-favorites'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-[#aaa]'
              "
              >Favorited Articles</router-link
            >
          </li>
        </ul>
        <article-list-component />
      </div>
    </div>
  </div>
</template>
