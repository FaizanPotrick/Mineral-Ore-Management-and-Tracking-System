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
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "/godash",
        name: "go dash",
        component: () => import("@/views/GovOffDistDashboard.vue"),
      },
      {
        path: "/statedash",
        name: "state dash",
        component: () => import("@/views/GovOffStateDashboard.vue"),
      },
      {
        path: "/centraldash",
        name: "central dash",
        component: () => import("@/views/GovOffCentralDashboard.vue"),
      },
      {
        path: "/mdash",
        name: "new miner dash",
        component: () => import("@/views/MDash.vue"),
      },
      {
        path: "/manager",
        name: "manager",
        component: () => import("@/views/Manager.vue"),
      },
      {
        path: "/forgot_password",
        name: "forgot password",
        component: () => import("@/views/ForgotPassword.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "",
            name: "home dashboard",
            meta: {
              type_of_user: ["officer", "organization", "miner"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/HomeDashboard.vue"),
          },
          {
            path: "officer_registration",
            name: "officer registration",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/Registration/Officer.vue"),
          },
          {
            path: "organization_registration",
            name: "organization registration",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/Registration/Organization.vue"),
          },
          {
            path: "mine_registration",
            name: "mine registration",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["district"],
            },
            component: () => import("@/views/Registration/Mine.vue"),
          },
          {
            path: "approve_mined_batch",
            name: "approve mined batch",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["district"],
            },
            component: () => import("@/views/Officer/ApproveMinedBatch.vue"),
          },
          {
            path: "approve_transaction",
            name: "approve transaction",
            meta: {
              type_of_user: ["organization"],
            },
            component: () => import("@/views/Organization/ApproveTransaction.vue"),
          },
          {
            path: "add_mined_batch",
            name: "add mined batch",
            meta: {
              type_of_user: ["miner"],
            },
            component: () => import("@/views/Registration/AddMinedBatch.vue"),
          },
          {
            path: "add_transaction",
            name: "add transaction",
            meta: {
              type_of_user: ["miner"],
            },
            component: () => import("@/views/Registration/AddTransaction.vue"),
          },
        ]
      },
      {
        path: "/minebatch",
        name: "MineBatch",
        component: () => import("@/views/MineBatch.vue"),
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
