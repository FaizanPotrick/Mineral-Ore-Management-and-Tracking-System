<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import useHomeStore from "@/stores/Dashboard/HomeStore";
import useLoginStore from "@/stores/LoginStore";

const router = useRouter();
const route = useRoute();
useHomeStore().auth_fetch(router)
onBeforeRouteUpdate(() => {
  useHomeStore().auth_fetch(router)
})
useHomeStore().user_fetch()
// console.log(useHomeStore().buttons_fetch())
</script>
<template>
  <div class="bg-yellow-50" v-if="useHomeStore().auth_check(route)">
    <div
      class="flex gap-4 justify-between items-center bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 py-3 md:px-10">
      <div class="flex flex-col items-start flex-shrink-0">
        <div class="text-xl capitalize">{{ useHomeStore().user_name }}</div>
        <div class="text-gray-600 text-sm">{{ useHomeStore().user_email_address }}</div>
      </div>
      <div class="flex justify-start w-full gap-4">
        <RouterLink :key="button" v-for="button of useHomeStore().buttons_fetch()" :to="button.router_link"
          :class="route.meta.active === button.name ? 'bg-yellow-300 shadow-inner' : 'bg-yellow-100/60 hover:bg-yellow-300 hover:shadow-inner'"
          class=" rounded-xl py-2.5 px-4 capitalize shadow-md">
          {{ button.name }}
        </RouterLink>
      </div>
      <button @click="useLoginStore().logout_fn(router)" class="text-yellow-700 hover:text-gray-900">
        Logout
      </button>
    </div>
    <RouterView class="p-10 w-full min-h-[92vh]" />
  </div>
  <div v-else class="flex flex-col items-center justify-center min-h-screen">
    <div class="mb-8 font-extrabold text-8xl sm:text-9xl text-yellow-700">
      403
    </div>
    <div class="text-2xl font-semibold sm:text-3xl">Sorry, we couldn't give access to this page.</div>
    <div class="mt-4 mb-8 text-yellow-700">You do not have access to this page or resource.
    </div>
  </div>
</template>
