import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { storage } from '@/utils/storage';
import { getUser } from '@/api';
// 假頭像圖片
import fakeAuthorImage from '@/assets/images/turtle.jpg';
import type { UserInfo } from '@/types';

const userStorage = storage('user');

export const useUserStore = defineStore('user', () => {
  // const userInfo = ref<UserInfo | null>(null);
  const userInfo = ref<UserInfo | null>({
    email: 'rousong@cc.cc',
    username: '肉鬆',
    bio: '大家好，我是肉鬆，是一名前端工程師。',
    image: fakeAuthorImage
  });

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
      setUser(res.data.user);
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
