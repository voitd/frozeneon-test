import { createApp } from "vue";
import "./style.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";

import App from "./App.vue";
import { createPinia } from "pinia";
import TrendChart from "vue-trend-chart";
import router from "./router";

const pinia = createPinia();

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(TrendChart)
  .mount("#app");
