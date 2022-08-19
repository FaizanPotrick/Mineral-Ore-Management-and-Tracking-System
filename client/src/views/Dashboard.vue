<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import useHomeStore from "@/stores/HomeStore";
import useUserStore from "@/stores/UserStore";

const router = useRouter();
const route = useRoute();
useHomeStore().user_fetch();
</script>
<template>
  <div class="bg-yellow-50" v-if="route.meta.access">
    <div
      class="flex gap-4 justify-between items-center bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 py-3 md:px-10">
      <div class="flex flex-col items-start flex-shrink-0">
        <div class="text-xl capitalize">{{ useHomeStore().user_name }}</div>
        <div class="text-gray-600 text-sm">
          {{ useHomeStore().user_email_address }}
        </div>
      </div>
      <div class="flex justify-start w-full gap-4">
        <RouterLink :key="button" v-for="button of useHomeStore().buttons_fetch()" :to="button.router_link" :class="
          route.meta.active === button.name
            ? 'bg-yellow-300 shadow-inner'
            : 'bg-yellow-100/60 hover:bg-yellow-300 hover:shadow-inner'
        " class="rounded-xl py-2.5 px-4 capitalize shadow-md">
          {{ button.name }}
        </RouterLink>
      </div>
      <div class="relative">
        <button
          class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 peer capitalize shadow-md">
          Profile
        </button>
        <div class="invisible absolute top-14 right-0 bg-white rounded-lg shadow-md px-5 py-2 w-60 peer-hover:visible">
          <div class="flex justify-between items-center">
            <div class="font-semibold flex-shrink-0">
              Name :
            </div>
            <div class="font-normal flex-shrink-0 ml-1">ABC</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="font-semibold flex-shrink-0">
              Email Address :
            </div>
            <div class="font-normal flex-shrink-0 ml-1">XYZ</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="font-semibold flex-shrink-0">
              Aadhar Card :
            </div>
            <div class="font-normal flex-shrink-0 ml-1">PQR</div>
          </div>
        </div>
      </div>
      <button @click="useUserStore().logout_fn(router)" class="text-yellow-700 hover:text-gray-900">
        Logout
      </button>
    </div>
    <RouterView class="p-10 w-full min-h-[92vh]" />
  </div>
  <div v-else class="flex flex-col items-center justify-center min-h-screen">
    <div class="mb-8 font-extrabold text-8xl sm:text-9xl text-yellow-700">
      403
    </div>
    <div class="text-2xl font-semibold sm:text-3xl">
      Sorry, we couldn't give access to this page.
    </div>
    <div class="mt-4 mb-8 text-yellow-700">
      You do not have access to this page or resource.
    </div>
  </div>
</template>