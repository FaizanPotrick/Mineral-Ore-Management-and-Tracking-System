import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueCookies from "vue-cookies";
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/dist/vue3-openlayers.css";
import App from "./App.vue";

const app = createApp(App);

const Authentication = async () => {
  const { data } = await axios.get("/api/authentication");
  if (!data) {
    return { path: "/login" };
  }
};

const PageAccess = (to) => {
  if (!to.meta.type_of_user.includes($cookies.get("type_of_user"))) {
    return (to.meta.access = false);
  }
  if (
    $cookies.get("type_of_user") === "government" &&
    !to.meta.type_of_region.includes($cookies.get("type_of_region"))
  ) {
    return (to.meta.access = false);
  }
  return (to.meta.access = true);
};

app.use(createPinia());
app.use(OpenLayersMap);
app.use(VueCookies);

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
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/DashBoard.vue"),
        children: [
          {
            path: "",
            name: "home_dashboard",
            meta: {
              active: "home",
              access: false,
              type_of_user: [
                "government",
                "organization",
                "mine",
                "warehouse",
                "checkpoint",
                "lab",
              ],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => {
              if ($cookies.get("type_of_user") === "government") {
                return import("@/views/Dashboard/Government.vue");
              } else if ($cookies.get("type_of_user") === "organization") {
                return import("@/views/Dashboard/Organization.vue");
              } else if ($cookies.get("type_of_user") === "mine") {
                return import("@/views/Dashboard/Mine.vue");
              } else if ($cookies.get("type_of_user") === "warehouse") {
                return import("@/views/Dashboard/Warehouse.vue");
              } else if ($cookies.get("type_of_user") === "checkpoint") {
                return import("@/views/Dashboard/CheckPoint.vue");
              } else {
                return import("@/views/Dashboard/Lab.vue");
              }
            },
          },
          {
            path: "governments",
            name: "governments",
            meta: {
              active: "governments",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Government.vue"),
          },
          {
            path: "governments/:region_type/:region_id",
            name: "government_dashboard",
            meta: {
              active: "governments",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Dashboard/Government.vue"),
          },
          {
            path: "organizations",
            name: "organizations",
            meta: {
              active: "organizations",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Organizations.vue"),
          },
          {
            path: "organizations/:organization_id",
            name: "organization_dashboard",
            meta: {
              active: "organizations",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Dashboard/Organization.vue"),
          },
          {
            path: "mines",
            name: "mines",
            meta: {
              active: "mines",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Mines.vue"),
          },
          {
            path: "mines/:mine_id",
            name: "mine_dashboard",
            meta: {
              active: "mines",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Dashboard/Mine.vue"),
          },
          {
            path: "checkpoints",
            name: "checkpoints",
            meta: {
              active: "check points",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/CheckPoints.vue"),
          },
          {
            path: "checkpoints/:checkpoint_id",
            name: "checkpoint_dashboard",
            meta: {
              active: "check points",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Dashboard/CheckPoint.vue"),
          },
          {
            path: "labs",
            name: "labs",
            meta: {
              active: "labs",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Labs.vue"),
          },
          {
            path: "labs/:lab_id",
            name: "lab_dashboard",
            meta: {
              active: "labs",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Dashboard/Lab.vue"),
          },
          {
            path: "mined_batches",
            name: "mined_batches_list",
            meta: {
              active: "mined batches",
              access: false,
              type_of_user: ["mine"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/MinedBatches.vue"),
          },
          {
            path: "tested_mined_batches",
            name: "tested_mined_batches_list",
            meta: {
              active: "tested mined batches",
              access: false,
              type_of_user: ["government", "mine"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/TestedMinedBatches.vue"),
            alias: "mines/:mine_id/tested_mined_batches",
          },
          {
            path: "tested_mined_batches/:batch_id",
            name: "mine_tested_mined_batch",
            meta: {
              active: "tested mined batches",
              access: false,
              type_of_user: ["government", "mine"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/MinedBatch.vue"),
            alias: "mines/:mine_id/tested_mined_batches/:batch_id",
          },
          {
            path: "transactions",
            name: "transactions",
            meta: {
              active: "transactions",
              access: false,
              type_of_user: ["government", "mine"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Transactions.vue"),
            alias: "mines/:mine_id/transactions",
          },
          {
            path: "transactions/:transaction_id",
            name: "transaction",
            meta: {
              active: "transactions",
              access: false,
              type_of_user: ["government", "mine", "checkpoint", "lab"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Transaction.vue"),
            alias: "mines/:mine_id/transactions/:transaction_id",
          },
          {
            path: "suspicious",
            name: "suspicious",
            meta: {
              active: "suspicious",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/List/Suspicious.vue"),
          },
          {
            path: "suspicious/:transaction_id",
            name: "suspicious_transaction",
            meta: {
              active: "transactions",
              access: false,
              type_of_user: [
                "government",
                "organization",
                "mine",
                "checkpoint",
                "lab",
              ],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Suspicious.vue"),
          },
          {
            path: "registration/government",
            name: "officer_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Government.vue"),
          },
          {
            path: "registration/organization",
            name: "organization_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["country", "state", "district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Organization.vue"),
          },
          {
            path: "registration/mine",
            name: "mine_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Mine.vue"),
          },
          {
            path: "registration/mine/:mine_id/registration/warehouse",
            name: "warehouse_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Warehouse.vue"),
          },
          {
            path: "registration/checkpoint",
            name: "checkpoint_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/CheckPoint.vue"),
          },
          {
            path: "registration/lab",
            name: "lab_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["government"],
              type_of_region: ["district"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Lab.vue"),
          },
          {
            path: "registration/mined_batch",
            name: "mined_batch_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["mine"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/MinedBatch.vue"),
          },
          {
            path: "registration/tested_mined_batch",
            name: "tested_mined_batch_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["mine"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () =>
              import("@/views/Registration/TestedMinedBatch.vue"),
          },
          {
            path: "registration/transaction",
            name: "transaction_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["mine"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Transaction.vue"),
          },
          {
            path: "registration/suspicious/:transaction_id",
            name: "suspicious_registration",
            meta: {
              active: "home",
              access: false,
              type_of_user: ["checkpoint"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/Registration/Suspicious.vue"),
          },
          {
            path: "approve_transaction",
            name: "approve_transaction ",
            meta: {
              active: "approve transaction",
              access: false,
              type_of_user: ["organization", "checkpoint"],
            },
            beforeEnter: [Authentication, PageAccess],
            component: () => import("@/views/ApproveTransaction.vue"),
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
