import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./main.css";
import "./registerServiceWorker";
import router from "./router";

createApp(App).use(router).mount("#app");
