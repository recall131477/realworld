<script lang="ts">
export default {
  name: 'HeaderLayoutComponent',
};
</script>

<script setup lang="ts"></script>

<template>
  <nav class="fixed left-0 top-0 z-[999] w-full bg-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="flex h-14 items-center justify-between">
        <router-link :to="{ name: 'home' }" class="font-titillium text-2xl text-primary">conduit</router-link>
        <ul class="fixed left-0 top-14 w-full bg-white md:static md:flex md:w-auto md:gap-x-4">
          <li class="border-t border-black/10 md:border-0">
            <a href="javascript:;" class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
              >Home</a
            >
          </li>
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'create-article' }"
              class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
              >New Article</router-link
            >
          </li>
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'login' }"
              class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
              >Sign in</router-link
            >
          </li>
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'register' }"
              class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
              >Sign Up</router-link
            >
          </li>
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'settings' }"
              class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
            >
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'profile' }"
              class="block px-[15px] py-2.5 text-black/80 duration-300 hover:text-black/60 md:p-0"
              >Profile</router-link
            >
          </li>
        </ul>
        <button type="button" class="relative h-10 w-10 md:hidden">
          <span class="absolute left-1/2 top-3 h-0.5 w-6 -translate-x-1/2 bg-[#333333]"></span>
          <span class="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-[#333333]"></span>
          <span class="absolute bottom-3 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#333333]"></span>
        </button>
      </div>
    </div>
  </nav>
</template>
