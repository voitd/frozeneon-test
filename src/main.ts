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

const light = {
  dark: false,
  colors: {
    primary: "#667acc",
    secondary: "#FFFFFF",
    background: "#F5F5F5",
    foreground: "#F5F5F5",
    "v-theme-background": "#FFFFFF",
    "v-theme-card": "#FFFFFF",
  },
};

const dark = {
  dark: true,
  colors: {
    primary: "#667acc",
    secondary: "#1E2127",
    background: "#18191B",
    foreground: "#1E1E1E",
    "v-theme-background": "#1E2127",
    "v-theme-card": "#22252B",
  },
};

const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const vuetify = createVuetify({
  theme: {
    defaultTheme: darkMode ? "dark" : "light",
    themes: {
      dark,
      light,
    },
  },
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(TrendChart)
  .mount("#app");
