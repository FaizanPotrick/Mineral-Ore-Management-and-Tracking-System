<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import Buttons from "@/stores/Buttons.json";

const router = useRouter();
const route = useRoute();
const user = ref({
  name: "",
  email_address: "",
});

const user_fetch = async () => {
  const { data } = await axios.get(`/api/user/${$cookies.get("type_of_user")}`);
  user.value = { name: data.name, email_address: data.email_address };
};

user_fetch();

const buttons_fetch = () => {
  return Buttons.filter((button) => {
    if (!button.type_of_user.includes($cookies.get("type_of_user"))) {
      return false;
    }
    if (
      $cookies.get("type_of_user") === "government" &&
      !button.type_of_region.includes($cookies.get("type_of_region"))
    ) {
      return false;
    }
    return true;
  });
};

const logout = async () => {
  await axios.get("/api/logout");
  router.push("/login");
};
</script>
<template>
  <div class="bg-yellow-50" v-if="route.meta.access">
    <div
      class="flex gap-4 justify-between items-center bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 py-1.5 md:px-10"
    >
      <div class="flex flex-col items-start flex-shrink-0">
        <div class="text-lg capitalize">{{ user.name }}</div>
        <div class="text-gray-600 text-xs">
          {{ user.email_address }}
        </div>
      </div>
      <div class="flex flex-row justify-end w-full gap-4 text-sm md:text-base">
        <RouterLink
          :key="button"
          v-for="button of buttons_fetch()"
          :to="button.router_link"
          :class="
            route.meta.active === button.name
              ? 'text-gray-900'
              : 'text-yellow-700 hover:text-gray-900'
          "
          class="capitalize"
        >
          {{ button.name }}
        </RouterLink>
        <button @click="logout" class="text-yellow-700 hover:text-gray-900">
          Logout
        </button>
      </div>
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
