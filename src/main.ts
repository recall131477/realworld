import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';
import App from './App.vue';
import router from './router';

import '@/assets/scss/tailwind.scss';
import '@/assets/scss/app.scss';

const app = createApp(App);

(async () => {
  app.use(createPinia());

  const userStore = useUserStore();
  const { verifyAuth } = userStore;
  await verifyAuth();

  app.use(router);
  app.mount('#app');
})();
