import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  /** 不需要身分驗證 */
  {
    path: '/',
    name: 'home',
    component: () => import('../views/homeView/index.vue'),
  },
  {
    path: '/',
    name: 'global-feed',
    component: () => import('../views/homeView/index.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('../views/homeView/index.vue'),
    meta: {
      title: 'tag',
      anonymousOnly: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/registerView/index.vue'),
    meta: {
      title: 'register',
      anonymousOnly: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView/index.vue'),
    meta: {
      title: 'login',
      anonymousOnly: true,
    },
  },
  /** 需要身分驗證 */
  {
    path: '/my-feed',
    name: 'my-feed',
    component: () => import('../views/homeView/index.vue'),
    meta: {
      title: 'my-feed',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/settingsView/index.vue'),
    meta: {
      title: 'settings',
      requiresAuth: true,
    },
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/articleView/index.vue'),
    meta: {
      title: 'article',
      requiresAuth: true,
    },
  },
  {
    path: '/article/create',
    name: 'create-article',
    component: () => import('../views/articleView/editor.vue'),
    meta: {
      title: 'create-article',
      requiresAuth: true,
    },
  },
  {
    path: '/article/edit',
    name: 'edit-article',
    component: () => import('../views/articleView/editor.vue'),
    meta: {
      title: 'edit-article',
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profileView/index.vue'),
    meta: {
      title: 'my-feed',
      requiresAuth: true,
    },
  },
  {
    path: '/profile/favorites',
    name: 'profile-favorites',
    component: () => import('../views/profileView/index.vue'),
    meta: {
      title: 'my-feed',
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 切換網址自動回到頂部
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
