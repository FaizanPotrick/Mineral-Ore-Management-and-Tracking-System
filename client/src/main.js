import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import VueCookies from "vue-cookies";

const app = createApp(App);
app.use(createPinia());
app.use(VueCookies);
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
        path: "/forgot_password",
        name: "forgot",
        component: () => import("@/views/Forgot.vue"),
      },

      {
        path: "/officer_dashboard",
        name: "officer",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "",
            name: "officer dashboard",
            meta: {
              type_of_user: "officer",
            },
            component: () => import("@/views/Officer/Dashboard.vue"),
          },
          {
            path: "miner_registration",
            name: "Miner Registration",
            meta: {
              type_of_user: "officer",
              type_of_region: ["district"],
            },
            component: () => import("@/views/Registration/Miner.vue"),
          },
          {
            path: "organization_registration",
            name: "Organization Registration",
            meta: {
              type_of_user: "officer",
              type_of_region: ["state"],
            },
            component: () => import("@/views/Registration/Organization.vue"),
          },
          {
            path: "officer_registration",
            name: "Officer Registration",
            meta: {
              type_of_user: "officer",
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/Registration/Officer.vue"),
          },
          {
            path: "/officer_check",
            name: "Officer Checking Form",
            meta: {
              type_of_user: "organization",
            },
            component: () => import("@/views/Officer/OfficerCheckingForm.vue"),
          },
        ],
      },
      {
        path: "/organization_dashboard",
        name: "organization",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "",
            name: "organization dashboard",
            meta: {
              type_of_user: "organization",
            },
            component: () => import("@/views/Miner/Dashboard.vue"),
          },
          {
            path: "ores_registration",
            name: "ores registration",
            meta: {
              type_of_user: "organization",
            },
            component: () => import("@/views/Miner/OresRegistration.vue"),
          },
        ],
      },
      {
        path: "/miner_dashboard",
        name: "miner",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "",
            name: "miner dashboard",
            meta: {
              type_of_user: "miner",
            },
            component: () => import("@/views/Miner/Dashboard.vue"),
          },
          {
            path: "ores_registration",
            name: "Ores Registration",
            meta: {
              type_of_user: "miner",
            },
            component: () => import("@/views/Miner/OresRegistration.vue"),
          },
        ],
      },
      {
        path: "/ores_transactions",
        name: "Ores Transactions",
        component: () => import("@/views/OreTransaction.vue"),
      },
      {
        path: "/transaction",
        name: "Transaction",
        component: () => import("@/views/Transaction.vue"),
      },
      {
        path: "/servererror",
        name: "Server Error",
        component: () => import("@/components/InternalServerError.vue"),
      },
      {
        path: "/forbidden",
        name: "403",
        component: () => import("@/components/ForbiddenPage.vue"),
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
