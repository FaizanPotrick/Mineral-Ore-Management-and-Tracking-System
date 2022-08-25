<script setup>
import { useRoute, useRouter } from "vue-router";
import useHomeStore from "@/stores/HomeStore";
import useAlertStore from "@/stores/Alert";
import { ref } from "vue";
import axios from "axios";

const { open_alert_box } = useAlertStore();
const router = useRouter();
const route = useRoute();
const user = ref({
  name: "",
  email_address: "",
});
const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
}
const user_fetch = async () => {
  const { data } = await axios.get(`/api/user/${$cookies.get("type_of_user")}`);
  user.value = { name: data.name, email_address: data.email_address };
};

user_fetch();

const logout = async () => {
  await axios.get("/api/logout").then((res) => {
    router.push("/login");
    open_alert_box(res.data.message, res.data.type);
  });
};
</script>
<template>
  <div class="bg-yellow-50" v-if="route.meta.access">
    <div
      class="flex gap-4 md:justify-between items-center bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 py-3 md:px-10">
      <div class="flex flex-col items-start flex-shrink-0">
        <div class="text-xl capitalize">{{ user.name }}</div>
        <div class="text-gray-600 text-sm">
          {{ user.email_address }}
        </div>
      </div>
      <!-- Hamburger button -->
      <button @click="toggleMenu" id="hamburger" type="button" class="
              md:hidden
                text-gray-800
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              ">
        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
          <path fill-rule="evenodd"
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
          </path>
        </svg>
      </button>

      <!-- Desktop Nav -->
      <div id="desktop_nav" class="flex flex-row justify-end w-full gap-4">
        <RouterLink :key="button" v-for="button of useHomeStore().buttons_fetch()" :to="button.router_link" :class="
          route.meta.active === button.name
            ? 'text-gray-900'
            : 'text-yellow-700 hover:text-gray-900'
        " class="capitalize">
          {{ button.name }}
        </RouterLink>
        <RouterLink to="/dashboard/suspisious_activity" class="flex items-center text-yellow-700 hover:text-gray-900">
          Suspicious Activity
        </RouterLink>
        <button @click="logout" class="text-yellow-700 hover:text-gray-900">
          Logout
        </button>
      </div>
    </div>

    <!-- mobile Hamburger View-->
    <div id="mobile_nav" v-if="showMenu" class="container">

      <div class=" flex flex-col md:hidden justify-start w-full gap-4">
        <RouterLink :key="button" v-for="button of useHomeStore().buttons_fetch()" :to="button.router_link" :class="
          route.meta.active === button.name
            ? 'bg-yellow-300 shadow-inner'
            : 'bg-yellow-100/60 hover:bg-yellow-300 hover:shadow-inner'
        " class="rounded-xl py-2.5 px-4 capitalize shadow-md">
          {{ button.name }}
        </RouterLink>
      </div>
      <RouterLink to="/dashboard/suspisious_activity" class="flex items-center text-yellow-700 hover:text-gray-900">
        Suspicious Activity
      </RouterLink>
      <button @click="logout" class="text-yellow-700 hover:text-gray-900">
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
<style>
#hamburger,
#mobile_nav {
  visibility: hidden;
}

@media screen and (max-width: 640px) {
  #desktop_nav {
    visibility: hidden;
  }

  #hamburger,
  #mobile_nav {
    visibility: visible;
  }
}
</style>