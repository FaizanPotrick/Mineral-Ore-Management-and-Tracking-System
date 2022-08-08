import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import VueCookies from "vue-cookies";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";

const app = createApp(App);
app.use(OpenLayersMap);
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
        path: "/forgot_password",
        name: "forgot password",
        component: () => import("@/views/ForgotPassword.vue"),
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/views/Test.vue"),
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
              active: "home",
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
            path: "ceo_registration",
            name: "ceo registration",
            meta: {
              active: "CEO registration",
              type_of_user: ["organization"],
            },
            component: () => import("@/views/Registration/CEO.vue"),
          },
          {
            path: "mine/manager_registration",
            name: "manager registration",
            meta: {
              type_of_user: ["organization"],
            },
            component: () => import("@/views/Registration/Manager.vue"),
          },
          {
            path: "approve_transaction",
            name: "approve transaction",
            meta: {
              type_of_user: ["organization"],
            },
            component: () =>
              import("@/views/Organization/ApproveTransaction.vue"),
          },
          {
            path: "mines",
            name: "mines",
            meta: {
              active: "mines",
              type_of_user: ["officer", "organization"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/Mines.vue"),
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
        ],
      },
      {
        path: "/minebatch",
        name: "Batch",
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
