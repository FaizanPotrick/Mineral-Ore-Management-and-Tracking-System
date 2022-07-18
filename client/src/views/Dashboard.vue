<script setup>
import { useRoute } from 'vue-router';
import PageNotFoundVue from '@/components/PageNotFound.vue';
import SidebarVue from '@/components/Sidebar.vue';
const route = useRoute();
</script>
<template>
    <div v-if="route.params.dashboard_id === 'officials_dashboard' || route.params.dashboard_id === 'miner_dashboard' || route.params.dashboard_id === 'buyer_dashboard'"
        class="flex bg-yellow-50">
        <SidebarVue />
        <RouterView class="m-10 w-full" />
    </div>
    <PageNotFoundVue v-else />
</template>