import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App)
  .use(router)
  .use(store, key)
  .mount("#app");

  //.use(store)
