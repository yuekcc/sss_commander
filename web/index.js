import { createApp } from 'vue';
import heyui from 'heyui';

import App from './App.vue';

import 'heyui/themes/index.less';
import './style.less';

const app = createApp(App);
app.use(heyui);
app.mount('#app');
