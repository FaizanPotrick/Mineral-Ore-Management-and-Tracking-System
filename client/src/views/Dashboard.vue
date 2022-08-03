<script setup>
import SidebarVue from "@/components/Sidebar.vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import useDashboardStore from "@/stores/DashboardStore";
import ForbiddenAccess from "@/components/ForbiddenAccess.vue";
const router = useRouter();
const route = useRoute();
useDashboardStore().auth_fetch(router)
onBeforeRouteUpdate(() => {
  useDashboardStore().auth_fetch(router)
})
</script>
<template>
  <div class="flex bg-yellow-50" v-if="useDashboardStore().auth_check(route)">
    <SidebarVue />
    <RouterView class="m-10 w-full" />
  </div>
  <ForbiddenAccess v-else />
</template>
