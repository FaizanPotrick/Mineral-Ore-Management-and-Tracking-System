<script setup>
import HeaderDashboard from "@/components/HeaderDashboard.vue";
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
  <div class="bg-yellow-50" v-if="useDashboardStore().auth_check(route)">
    <HeaderDashboard />
    <RouterView class="p-10 w-full min-h-[92vh]" />
  </div>
  <ForbiddenAccess v-else />
</template>
