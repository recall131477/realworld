<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const route = useRoute();

const userStore = useUserStore();
const { userInfo, isLoggedIn } = storeToRefs(userStore);
const { removeUser } = userStore;

const isMenuOpen = ref(false);

const logout = () => {
  removeUser();
};

watch(route, () => {
  isMenuOpen.value = false;
});
</script>

<script lang="ts">
export default {
  name: 'TheHeader',
};
</script>

<template>
  <nav class="fixed left-0 top-0 z-[999] w-full bg-white">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="flex h-14 items-center justify-between">
        <router-link
          :to="{ name: 'global-feed' }"
          class="font-titillium text-2xl text-primary"
          >conduit</router-link
        >
        <ul
          class="fixed left-0 top-14 w-full bg-white duration-300 md:visible md:static md:flex md:w-auto md:gap-x-4 md:opacity-100"
          :class="isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <li class="border-t border-black/10 md:border-0">
            <router-link
              :to="{ name: 'global-feed' }"
              class="block px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
              :class="
                route.name !== 'global-feed' ? 'text-black/30' : 'text-black/80'
              "
              >Home
            </router-link>
          </li>
          <template v-if="!isLoggedIn">
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{ name: 'login' }"
                class="block px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
                :class="
                  route.name !== 'login' ? 'text-black/30' : 'text-black/80'
                "
                >Sign in</router-link
              >
            </li>
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{ name: 'register' }"
                class="block px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
                :class="
                  route.name !== 'register' ? 'text-black/30' : 'text-black/80'
                "
                >Sign up</router-link
              >
            </li>
          </template>
          <template v-else>
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{ name: 'create-article' }"
                class="block px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
                :class="
                  route.name !== 'create-article'
                    ? 'text-black/30'
                    : 'text-black/80'
                "
                >New Article</router-link
              >
            </li>
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{ name: 'settings' }"
                class="block px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
                :class="
                  route.name !== 'settings' ? 'text-black/30' : 'text-black/80'
                "
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </router-link>
            </li>
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{
                  name: 'profile',
                  params: {
                    username: userInfo?.username,
                  },
                }"
                class="flex items-center gap-x-1 px-[15px] py-2.5 duration-300 hover:text-black/60 md:p-0"
                :class="
                  route.name !== 'profile' ? 'text-black/30' : 'text-black/80'
                "
              >
                <img
                  :src="userInfo?.image"
                  :alt="userInfo?.username"
                  class="h-6 w-6 rounded-full object-cover"
                />
                {{ userInfo?.username }}
              </router-link>
            </li>
            <li class="border-t border-black/10 md:border-0">
              <router-link
                :to="{ name: 'global-feed' }"
                class="block px-[15px] py-2.5 text-black/30 duration-300 hover:text-black/60 md:p-0"
                @click="logout"
                >Sign out
              </router-link>
            </li>
          </template>
        </ul>
        <button
          type="button"
          class="relative h-10 w-10 md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span
            class="absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#333] duration-300"
            :class="
              isMenuOpen ? 'top-1/2  -translate-y-1/2 rotate-45' : 'top-3'
            "
          ></span>
          <span
            class="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-[#333] duration-300"
            :class="{ 'opacity-0': isMenuOpen }"
          ></span>
          <span
            class="absolute left-1/2 h-0.5 w-6 -translate-x-1/2 bg-[#333] duration-300"
            :class="
              isMenuOpen ? 'bottom-1/2  translate-y-1/2 -rotate-45' : 'bottom-3'
            "
          ></span>
        </button>
      </div>
    </div>
  </nav>
</template>
