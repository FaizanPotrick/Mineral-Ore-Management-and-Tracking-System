<script setup>
import useDashboardStore from "@/stores/DashboardStore";
import { useRouter, useRoute } from 'vue-router';
import useLoginStore from "@/stores/LoginStore";
const router = useRouter();
const route = useRoute();
useDashboardStore().user_fetch();
</script>

<template>
    <div
        class="flex gap-4 justify-between items-center h-[8vh] bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 md:px-10">
        <div class="flex flex-col items-start pr-4 border-r-2">
            <div class="text-xl capitalize">{{ useDashboardStore().user_name }}</div>
            <div class="text-gray-600 text-sm">{{ useDashboardStore().user_email_address }}</div>
        </div>
        <div class="flex justify-start w-full gap-4">
            <RouterLink v-for="button of useDashboardStore().buttons_fetch()" :to="button.router_link"
                :class="route.meta.active === button.name ? 'bg-yellow-300 shadow-inner' : 'bg-yellow-100/60 hover:bg-yellow-300 hover:shadow-inner'"
                class=" rounded-xl py-2.5 px-4 capitalize shadow-md">
                {{ button.name }}
            </RouterLink>
        </div>
        <button @click="useLoginStore().logout_fn(router)" class="text-yellow-700 hover:text-gray-900">
            Logout
        </button>
    </div>
</template>