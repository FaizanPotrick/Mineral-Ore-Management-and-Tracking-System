<script setup>
import SidebarVue from "@/components/Sidebar.vue";
import { onBeforeUpdate } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDashboardStore from "@/stores/DashboardStore";
import ForbiddenAccess from "@/components/ForbiddenAccess.vue";
const router = useRouter();
const route = useRoute();
useDashboardStore().auth_check(router)
useDashboardStore().getAuthRegionData(route)
onBeforeUpdate(() => {
  useDashboardStore().auth_check(router)
  useDashboardStore().getAuthRegionData(route)
})
</script>
<template>
  <div class="flex bg-yellow-50" v-if="useDashboardStore().auth_value">
    <SidebarVue />
    <RouterView class="m-10 w-full" />
  </div>
  <ForbiddenAccess v-else />
</template>
