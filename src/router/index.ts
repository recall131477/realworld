import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/homeView/index.vue'),
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
