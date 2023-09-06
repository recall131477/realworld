<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { register } from '@/api';
import ErrorMessage from '@/components/ErrorMessage.vue';
import debounce from 'lodash.debounce';
import type { User } from '@/types';
import type { ErrorObject } from '@/types/error';

const router = useRouter();

const userStore = useUserStore();
const { setUser } = userStore;

const user = ref<User>({
  username: '',
  email: '',
  password: '',
});

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

const handleRegister = async () => {
  isLoading.value = true;

  try {
    const res = await register({ user: user.value });
    setUser(res.user);

    router.push({ name: 'global-feed' });
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const debounceHandleRegister = debounce(() => {
  handleRegister();
}, 250);
</script>

<script lang="ts">
export default {
  name: 'RegisterView',
};
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-1/2">
        <div class="mb-4 text-center">
          <h1 class="text-[40px]">Sign up</h1>
          <router-link :to="{ name: 'login' }" class="text-primary"
            >Have an account?</router-link
          >
        </div>
        <error-message :errors="errors" />
        <form @submit.prevent="debounceHandleRegister">
          <fieldset class="space-y-4" :disabled="isLoading">
            <fieldset>
              <input
                type="text"
                id="userName"
                name="userName"
                autocomplete="userName"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset>
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="current-password"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999] disabled:pointer-events-none disabled:bg-[#eceeef]"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <div class="text-right">
              <button
                type="submit"
                class="inline-block rounded bg-primary px-6 py-3 text-xl leading-tight text-white duration-300 hover:bg-primary-dark"
              >
                Sign up
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>
