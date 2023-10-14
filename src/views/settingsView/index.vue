<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { updateUser } from '@/api';
import debounce from 'lodash.debounce';
import type { UserInfo } from '@/types';
import type { ErrorObject } from '@/types/error';

const router = useRouter();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { setUser } = userStore;

const user = ref<UserInfo>({
  email: '',
  password: '',
  username: '',
  bio: '',
  image: '',
});

const isLoading = ref(false);

const errors = ref<ErrorObject>({});

const handleUpdateUser = async () => {
  isLoading.value = true;

  try {
    const res = await updateUser({ user: user.value });
    setUser(res.data.user);

    router.push({
      name: 'profile',
      params: {
        username: res.data.user.username,
      },
    });
  } catch (error) {
    errors.value = (error as any).errors;
  }

  isLoading.value = false;
};

const debounceHandleUpdateUser = debounce(() => {
  handleUpdateUser();
}, 250);

onMounted(() => {
  if (userInfo.value) {
    user.value = {
      email: userInfo.value.email,
      password: '',
      username: userInfo.value.username,
      bio: userInfo.value.bio,
      image: userInfo.value.image,
    };
  }
});
</script>

<script lang="ts">
export default {
  name: 'SettingsView',
};
</script>

<template>
  <div class="pt-6">
    <div class="mx-auto max-w-[1140px] px-[15px]">
      <div class="md:mx-auto md:w-1/2">
        <h1 class="text-center text-[40px]">Your Settings</h1>
        <form @submit.prevent="debounceHandleUpdateUser">
          <fieldset class="space-y-4" :disabled="isLoading">
            <fieldset class="form-group">
              <input
                type="text"
                id="profileUrl"
                name="profileUrl"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999]"
                placeholder="URL of profile picture"
                v-model="user.image"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                id="userName"
                name="userName"
                autocomplete="userName"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999]"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999]"
                rows="8"
                placeholder="Short bio about you"
                v-model="user.bio"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                type="email"
                id="email"
                name="email"
                autocomplete="email"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999]"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                id="password"
                name="password"
                autocomplete="current-password"
                class="border-black/15 block w-full rounded border bg-white px-6 py-3 text-xl leading-tight text-[#55595c] outline-none placeholder:text-[#999]"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <div class="text-right">
              <button
                type="submit"
                class="inline-block rounded bg-primary px-6 py-3 text-xl leading-tight text-white duration-300 hover:bg-primary-dark"
              >
                Update Settings
              </button>
            </div>
          </fieldset>
        </form>
        <div class="mt-4 border-t border-black/10 pt-4">
          <button
            class="inline-block rounded border border-danger px-4 py-2 leading-tight text-danger duration-300 hover:bg-danger hover:text-white"
          >
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
