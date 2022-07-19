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
        name: "Home",
        component: () => import("@/views/HOme.vue"),
      },
      {
        path: "/officials_login/",
        name: "officials_login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/miner_login",
        name: "miner_login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/buyer_login",
        name: "buyer_login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/officials_dashboard",
        name: "officials",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "miner_registration",
            name: "Miner Registration",
            component: () => import("@/views/Miner/MinerRegistration.vue"),
          },
        ],
      },
      {
        path: "/miner_dashboard",
        name: "miner",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "ores_registration",
            name: "Ores Registration",
            component: () => import("@/views/Miner/OresRegistration.vue"),
          },
        ],
      },
      {
        path: "/servererror",
        name: "Server Error",
        component: () => import("@/components/InternalServerError.vue"),
      },
      {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("@/components/PageNotFound.vue"),
      },
    ],
  })
);
app.mount("#app");
