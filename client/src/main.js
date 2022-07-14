import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueCookies from "vue-cookies";

const app = createApp(App);
app.use(createPinia());
app.use(VueCookies);
app.use(
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "/miner/registration",
        name: "Miner Registration",
        component: () => import("@/views/Miner/Registration.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        props: (route) => ({ login_id: route.query.login_id }),
      },
      {
        path: "/miner/ores",
        name: "Miner Ores",
        component: () => import("@/views/Miner/OresForm.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/AboutView.vue"),
      },
    ],
  })
);
app.mount("#app");
