import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Primevue from 'primevue/config';

const app = createApp(App);
app.use(Primevue);

app.use(router).mount('#app');
