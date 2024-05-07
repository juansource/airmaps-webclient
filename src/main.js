import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Primevue from 'primevue/config'
import store from './store' // Import the store here

const app = createApp(App)

app.use(Primevue)
app.use(store) // Use the store before the router
app.use(router)

app.mount('#app')
//testing