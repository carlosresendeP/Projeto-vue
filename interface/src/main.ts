import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import router from './Routes'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})
app.use(createPinia())
app.use(router)

app.mount('#app')