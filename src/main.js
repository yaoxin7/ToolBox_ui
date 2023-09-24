import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import router from "./router/index.js";
import pinia from "./store/index.js";

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
