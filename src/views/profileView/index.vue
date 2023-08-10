<script lang="ts">
export default {
  name: 'ProfileView',
};
</script>

<script setup lang="ts"></script>

<template>
  <div class="bg-[#f3f3f3] py-8 pb-4">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <span class="mx-auto block h-[100px] w-[100px] rounded-full bg-pink-200"></span>
        <div class="mt-4 text-center">
          <h1 class="text-2xl font-bold">recall131477</h1>
          <p class="mt-1 font-light text-[#aaaaaa]">肉鬆</p>
        </div>
        <div class="mt-2 text-right">
          <router-link
            :to="{ name: 'settings' }"
            class="inline-block rounded border border-[#999999] px-2 py-1 text-sm leading-tight text-[#999999] duration-300 hover:bg-[#cccccc]"
          >
            <i class="ion-gear-a"></i> Edit Profile Settings
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-10/12">
        <ul class="flex">
          <li>
            <router-link :to="{ name: 'profile' }" class="block border-b-2 border-primary px-4 py-2 text-primary"
              >My Articles
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'profile-favorites' }"
              class="block border-b-2 border-transparent px-4 py-2 text-[#aaaaaa] duration-300 hover:border-primary hover:text-primary"
              >Favorited Articles</router-link
            >
          </li>
        </ul>
        <ul>
          <li>
            <div class="border-t border-black/10 py-6">
              <div class="flex items-center justify-between gap-x-4">
                <div class="flex items-center gap-x-2">
                  <a href="javascript:;" class="h-8 w-8 rounded-full bg-pink-500"></a>
                  <div>
                    <a href="javascript:;" class="block font-medium text-primary">recall131477</a>
                    <span class="block text-xs text-[#bbbbbb]">2023/8/10</span>
                  </div>
                </div>
                <button
                  type="button"
                  class="inline-block rounded border border-primary px-2 py-1 text-sm leading-tight text-primary duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
                >
                  <i class="ion-heart"></i> 0
                </button>
              </div>
              <router-link :to="{ name: 'article' }" class="mt-4 block">
                <h2 class="text-2xl font-semibold leading-[1.1]">test</h2>
                <p class="mt-1 font-light text-[#999999]">test</p>
                <div class="mt-4 flex justify-between gap-x-4">
                  <span class="text-sm font-light text-[#bbbbbb]">Read more...</span>
                  <ul class="flex flex-wrap gap-1">
                    <li class="rounded-full border border-[#dddddd] px-2 text-sm font-light text-[#aaaaaa]">
                      <span>test</span>
                    </li>
                  </ul>
                </div>
              </router-link>
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
        </ul>
      </div>
    </div>
  </div>
</template>
