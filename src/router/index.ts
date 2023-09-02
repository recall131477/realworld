import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes = [
  /** 404 */
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import('@/views/pageNotFoundView/index.vue'),
    meta: {
      title: 'page not found',
    },
  },
  /** 不需要身分驗證 */
  {
    path: '/',
    name: 'global-feed',
    component: () => import('@/views/homeView/index.vue'),
  },
  {
    path: '/tag/:tag',
    name: 'tag',
    component: () => import('@/views/homeView/index.vue'),
    meta: {
      title: 'tag',
    },
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: () => import('@/views/articleView/index.vue'),
    meta: {
      title: 'article',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registerView/index.vue'),
    meta: {
      title: 'register',
      anonymousOnly: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginView/index.vue'),
    meta: {
      title: 'login',
      anonymousOnly: true,
    },
  },
  /** 需要身分驗證 */
  {
    path: '/my-feed',
    name: 'my-feed',
    component: () => import('@/views/homeView/index.vue'),
    meta: {
      title: 'my feed',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settingsView/index.vue'),
    meta: {
      title: 'settings',
      requiresAuth: true,
    },
  },
  {
    path: '/article/create',
    name: 'create-article',
    component: () => import('@/views/articleView/editor.vue'),
    meta: {
      title: 'create article',
      requiresAuth: true,
    },
  },
  {
    path: '/article/edit/:slug',
    name: 'edit-article',
    component: () => import('@/views/articleView/editor.vue'),
    meta: {
      title: 'edit article',
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: () => import('@/views/profileView/index.vue'),
    meta: {
      title: 'profile',
      requiresAuth: true,
    },
  },
  {
    path: '/profile/:username/favorites',
    name: 'profile-favorites',
    component: () => import('@/views/profileView/index.vue'),
    meta: {
      title: 'profile favorites',
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 切換網址自動回到頂部
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { isLoggedIn } = userStore;
  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      name: 'login',
    };
  }
  if (to.meta.anonymousOnly && isLoggedIn) {
    return {
      name: 'global-feed',
    };
  }
});

export default router;
