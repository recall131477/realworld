<script lang="ts">
export default {
  name: 'RegisterView',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import type { User } from '@/types';

import { register } from '@/api';

const user = ref<User>({
  username: '',
  email: '',
  password: '',
});

const onSubmit = async () => {
  try {
    const res = await register({ user: user.value });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-1/2">
        <div class="mb-4 text-center">
          <h1 class="text-[40px]">Sign up</h1>
          <router-link :to="{ name: 'login' }" class="text-primary">Have an account?</router-link>
        </div>
        <ul class="mb-4 list-disc pl-10 font-bold text-danger">
          <li>error message</li>
        </ul>
        <form @submit.prevent="onSubmit">
          <fieldset class="space-y-4">
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
