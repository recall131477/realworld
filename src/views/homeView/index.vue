<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import ArticleList from '@/components/ArticleList.vue';
import Tags from '@/components/Tags.vue';

const route = useRoute();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
</script>

<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<template>
  <div class="bg-primary py-8 text-center text-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <h1 class="font-titillium text-[56px] leading-none">conduit</h1>
      <p class="mt-2 text-2xl font-light">A place to share your knowledge.</p>
    </div>
  </div>
  <div class="pt-8">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="grid grid-cols-1 gap-[30px] lg:grid-cols-4">
        <div class="lg:col-span-3">
          <ul class="flex">
            <li v-if="isLoggedIn">
              <router-link
                :to="{ name: 'my-feed' }"
                class="block border-b-2 px-4 py-2 duration-300 hover:border-primary hover:text-primary"
                :class="
                  route.name === 'my-feed'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#aaa]'
                "
              >
                Your Feed
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'global-feed' }"
                class="block border-b-2 px-4 py-2 duration-300 hover:border-primary hover:text-primary"
                :class="
                  route.name === 'global-feed'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#aaa]'
                "
              >
                Global Feed
              </router-link>
            </li>
            <li v-if="route.params.tag">
              <router-link
                :to="{
                  name: 'tag',
                  params: { tag: route.params.tag },
                }"
                class="block border-b-2 px-4 py-2 duration-300 hover:border-primary hover:text-primary"
                :class="
                  route.name === 'tag'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#aaa]'
                "
              >
                <i class="ion-pound"></i>
                {{ route.params.tag }}
              </router-link>
            </li>
          </ul>
          <article-list />
        </div>
        <div>
          <div class="rounded bg-[#f3f3f3] p-2.5">
            <span>Popular Tags</span>
            <tags />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
