import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const app = createApp(App);
app.use(createPinia());
app.use(
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Landing.vue"),
        children: [
          {
            path: ":login_id",
            name: "Login",
            component: () => import("@/views/Login.vue"),
          },
        ],
      },
      {
        path: "/miner/mine_registration",
        name: "Miner Mine Registration",
        component: () => import("@/views/Miner/MineRegistration.vue"),
      },

      {
        path: "/miner/ores_registration",
        name: "Miner Ores Registration",
        component: () => import("@/views/Miner/OresRegistration.vue"),
      },
      {
        path: "/header",
        name: "Header",
        component: () => import("@/components/Header.vue"),
      },
    ],
  })
);
app.mount("#app");
