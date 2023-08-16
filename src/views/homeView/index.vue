<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import TagsComponent from '@/components/TagsComponent.vue';

const route = useRoute();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
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
                    : 'border-transparent text-[#aaaaaa]'
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
                    : 'border-transparent text-[#aaaaaa]'
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
                    : 'border-transparent text-[#aaaaaa]'
                "
              >
                <i class="ion-pound"></i>
                {{ route.params.tag }}
              </router-link>
            </li>
          </ul>
          <ul>
            <li>
              <div class="border-t border-black/10 py-6">
                <div class="flex items-center justify-between gap-x-4">
                  <div class="flex items-center gap-x-2">
                    <a
                      href="javascript:;"
                      class="h-8 w-8 rounded-full bg-pink-500"
                    ></a>
                    <div>
                      <a
                        href="javascript:;"
                        class="block font-medium text-primary"
                        >Anah</a
                      >
                      <span class="block text-xs text-[#bbbbbb]"
                        >2022/12/9</span
                      >
                    </div>
                  </div>
                  <button
                    type="button"
                    class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight text-primary duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    <i class="ion-heart"></i> 1584
                  </button>
                </div>
                <router-link :to="{ name: 'article' }" class="mt-4 block">
                  <h2 class="text-2xl font-semibold leading-[1.1]">
                    Try to transmit the HTTP card, maybe it will override the
                    multi-byte hard drive!
                  </h2>
                  <p class="mt-1 font-light text-[#999999]">
                    Assumenda molestiae laboriosam enim ipsum quaerat enim
                    officia vel quo. Earum odit rem natus totam atque cumque.
                    Sint dolorem facere non.
                  </p>
                  <div class="mt-4 flex justify-between gap-x-4">
                    <span class="text-sm font-light text-[#bbbbbb]"
                      >Read more...</span
                    >
                    <ul class="flex flex-wrap gap-1">
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>voluptate</span>
                      </li>
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>rerum</span>
                      </li>
                    </ul>
                  </div>
                </router-link>
              </div>
            </li>
            <li>
              <div class="border-t border-black/10 py-6">
                <div class="flex items-center justify-between gap-x-4">
                  <div class="flex items-center gap-x-2">
                    <a
                      href="javascript:;"
                      class="h-8 w-8 rounded-full bg-pink-500"
                    ></a>
                    <div>
                      <a
                        href="javascript:;"
                        class="block font-medium text-primary"
                        >Anah</a
                      >
                      <span class="block text-xs text-[#bbbbbb]"
                        >2022/12/9</span
                      >
                    </div>
                  </div>
                  <button
                    type="button"
                    class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight text-primary duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    <i class="ion-heart"></i> 1584
                  </button>
                </div>
                <a href="javascript:;" class="mt-4 block">
                  <h2 class="text-2xl font-semibold leading-[1.1]">
                    Try to transmit the HTTP card, maybe it will override the
                    multi-byte hard drive!
                  </h2>
                  <p class="mt-1 font-light text-[#999999]">
                    Assumenda molestiae laboriosam enim ipsum quaerat enim
                    officia vel quo. Earum odit rem natus totam atque cumque.
                    Sint dolorem facere non.
                  </p>
                  <div class="mt-4 flex justify-between gap-x-4">
                    <span class="text-sm font-light text-[#bbbbbb]"
                      >Read more...</span
                    >
                    <ul class="flex flex-wrap gap-1">
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>voluptate</span>
                      </li>
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>rerum</span>
                      </li>
                    </ul>
                  </div>
                </a>
              </div>
            </li>
            <li>
              <div class="border-t border-black/10 py-6">
                <div class="flex items-center justify-between gap-x-4">
                  <div class="flex items-center gap-x-2">
                    <a
                      href="javascript:;"
                      class="h-8 w-8 rounded-full bg-pink-500"
                    ></a>
                    <div>
                      <a
                        href="javascript:;"
                        class="block font-medium text-primary"
                        >Anah</a
                      >
                      <span class="block text-xs text-[#bbbbbb]"
                        >2022/12/9</span
                      >
                    </div>
                  </div>
                  <button
                    type="button"
                    class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight text-primary duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    <i class="ion-heart"></i> 1584
                  </button>
                </div>
                <a href="javascript:;" class="mt-4 block">
                  <h2 class="text-2xl font-semibold leading-[1.1]">
                    Try to transmit the HTTP card, maybe it will override the
                    multi-byte hard drive!
                  </h2>
                  <p class="mt-1 font-light text-[#999999]">
                    Assumenda molestiae laboriosam enim ipsum quaerat enim
                    officia vel quo. Earum odit rem natus totam atque cumque.
                    Sint dolorem facere non.
                  </p>
                  <div class="mt-4 flex justify-between gap-x-4">
                    <span class="text-sm font-light text-[#bbbbbb]"
                      >Read more...</span
                    >
                    <ul class="flex flex-wrap gap-1">
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>voluptate</span>
                      </li>
                      <li
                        class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]"
                      >
                        <span>rerum</span>
                      </li>
                    </ul>
                  </div>
                </a>
              </div>
            </li>
          </ul>
          <ul class="mt-4 flex">
            <li>
              <a
                href="javascript:;"
                class="-ml-[1px] block border border-primary bg-primary px-3 py-2 text-white duration-300"
                >1</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                class="-ml-[1px] block border border-[#dddddd] bg-white px-3 py-2 text-primary duration-300 hover:bg-[#eceeef]"
                >2</a
              >
            </li>
            <li>
              <a
                href="javascript:;"
                class="-ml-[1px] block border border-[#dddddd] bg-white px-3 py-2 text-primary duration-300 hover:bg-[#eceeef]"
                >3</a
              >
            </li>
          </ul>
        </div>
        <div>
          <div class="rounded bg-[#f3f3f3] p-2.5">
            <span>Popular Tags</span>
            <TagsComponent />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
