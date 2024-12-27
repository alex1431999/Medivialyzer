import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { vuetify } from './plugins/vuetify.ts';
import { pinia } from './plugins/pinia.ts';

const app = createApp(App);

app.use(vuetify);
app.use(pinia);

app.mount('#app');
