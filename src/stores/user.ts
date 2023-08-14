import { defineStore } from 'pinia';

import type { UserInfo } from '@/types';

import { storage } from '@/utils/storage';

import { getUser } from '@/api';

const userStorage = storage('user');

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null as UserInfo | null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.userInfo;
    },
  },
  actions: {
    setUser(user: UserInfo) {
      this.userInfo = user;
      userStorage.set(user.token);
    },
    removeUser() {
      this.userInfo = null;
      userStorage.remove();
    },
    async verifyAuth() {
      if (!this.userInfo && userStorage.get()) {
        const res = await getUser();
        this.setUser(res.user);
      }
    },
  },
});
