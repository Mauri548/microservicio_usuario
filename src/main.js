import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from '@/i18n.js' 
// importo el Complemento de internacionalización para Vue.js => i18n 
// antes utilizando el comando "npm install vue-i18n@next"

createApp(App).use(i18n).use(router).use(store).mount('#app')
