import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import quasarIconSet from 'quasar/icon-set/svg-mdi-v6'

import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import router from './Routes'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet
})
app.use(createPinia())
app.use(router)

app.mount('#app')