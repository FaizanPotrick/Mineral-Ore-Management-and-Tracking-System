import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const app = createApp(App);
app.use(createPinia());
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBnpAKWxu7ciOW1OnMqYXkaHeuXOhrb6Es",
    libraries: "places",
  },
});
app.use(
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },

      {
        path: "/officer_dashboard",
        name: "officer",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "miner_registration",
            name: "Miner Registration",
            component: () => import("@/views/Registration/Miner.vue"),
          },
          {
            path: "organization_registration",
            name: "Organization Registration",
            component: () => import("@/views/Registration/Organization.vue"),
          },
          {
            path: "officer_registration",
            name: "Officer Registration",
            component: () => import("@/views/Registration/Officer.vue"),
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
