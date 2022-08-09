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
            name: "home_dashboard",
            meta: {
              active: "home",
              type_of_user: ["officer", "organisation", "miner"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/Dashboard/Home.vue"),
          },
          {
            path: "organisations/:organisation_id",
            name: "organisation_dashboard",
            meta: {
              active: "organisations",
              type_of_user: ["officer"],
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/Dashboard/Organisation.vue"),
          },
          {
            path: "mines/:mine_id",
            name: "mine_dashboard",
            meta: {
              active: "mines",
              type_of_user: ["officer", "organisation"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/Dashboard/Mine.vue"),
          },
          {
            path: "officer_registration",
            name: "officer_registration",
            meta: {
              active: "officer registration",
              type_of_user: ["officer"],
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/Registration/Officer.vue"),
          },
          {
            path: "organisation_registration",
            name: "organisation_registration",
            meta: {
              active: "organisation registration",
              type_of_user: ["officer"],
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/Registration/Organisation.vue"),
          },
          {
            path: "mine_registration",
            name: "mine_registration",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["district"],
            },
            component: () => import("@/views/Registration/Mine.vue"),
          },
          {
            path: "approve_mined_batch",
            name: "approve_mined_batch",
            meta: {
              type_of_user: ["officer"],
              type_of_region: ["district"],
            },
            component: () => import("@/views/Officer/ApproveMinedBatch.vue"),
          },
          {
            path: "organisations",
            name: "organisations",
            meta: {
              active: "organisations",
              type_of_user: ["officer"],
              type_of_region: ["country", "state"],
            },
            component: () => import("@/views/List/Organisations.vue"),
          },
          {
            path: "mines",
            name: "mines",
            meta: {
              active: "mines",
              type_of_user: ["officer", "organisation"],
              type_of_region: ["country", "state", "district"],
            },
            component: () => import("@/views/List/Mines.vue"),
          },
          {
            path: "ceo_registration",
            name: "ceo_registration",
            meta: {
              active: "CEO registration",
              type_of_user: ["organization"],
            },
            component: () => import("@/views/Registration/CEO.vue"),
          },
          {
            path: "mines/:mine_id/manager_registration",
            name: "manager_registration",
            meta: {
              type_of_user: ["organization"],
            },
            component: () => import("@/views/Registration/Manager.vue"),
          },
          {
            path: "approve_transaction",
            name: "approve_transaction",
            meta: {
              type_of_user: ["organization"],
            },
            component: () =>
              import("@/views/Organization/ApproveTransaction.vue"),
          },
          {
            path: "add_mined_batch",
            name: "add_mined_batch",
            meta: {
              type_of_user: ["miner"],
            },
            component: () => import("@/views/Registration/AddMinedBatch.vue"),
          },
          {
            path: "add_transaction",
            name: "add_transaction",
            meta: {
              type_of_user: ["miner"],
            },
            component: () => import("@/views/Registration/AddTransaction.vue"),
          },
        ],
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
