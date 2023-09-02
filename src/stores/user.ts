import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';
import { getUser } from '@/api';
import type { UserInfo } from '@/types';

const userStorage = storage('user');

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null);

  const isLoggedIn = computed(() => !!userInfo.value);

  const setUser = (user: UserInfo) => {
    userInfo.value = user;
    userStorage.set(user.token);
  };

  const removeUser = () => {
    userInfo.value = null;
    userStorage.remove();
  };

  const verifyAuth = async () => {
    if (!userInfo.value && userStorage.get()) {
      const res = await getUser();
      setUser(res.user);
    }
  };

  return {
    userInfo,
    isLoggedIn,
    setUser,
    removeUser,
    verifyAuth,
  };
});
