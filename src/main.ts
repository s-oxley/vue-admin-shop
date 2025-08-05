import './assets/main.css';

// https://vuejs.org/
import { createApp } from 'vue';

// https://pinia.vuejs.org/
import { createPinia } from 'pinia';

// https://tanstack.com/query/latest/docs/framework
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
