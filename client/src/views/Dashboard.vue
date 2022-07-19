<script setup>
import { useRoute } from 'vue-router';
import SidebarVue from '@/components/Sidebar.vue';
const route = useRoute();
</script>
<template>
    <div class="flex bg-yellow-50">
        <SidebarVue />
        <RouterView class="m-10 w-full" />
    </div>
</template>