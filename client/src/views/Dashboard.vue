<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import useHomeStore from "@/stores/HomeStore";
import useLoginStore from "@/stores/LoginStore";

const router = useRouter();
const route = useRoute();
useHomeStore().user_fetch();
</script>
<template>
  <div class="bg-yellow-50" v-if="route.meta.access">
    <div
      class="flex gap-4 justify-between items-center bg-white border-gray-400/20 font-medium drop-shadow text-gray-900 px-5 py-3 md:px-10"
    >
      <div class="flex flex-col items-start flex-shrink-0">
        <div class="text-xl capitalize">{{ useHomeStore().user_name }}</div>
        <div class="text-gray-600 text-sm">
          {{ useHomeStore().user_email_address }}
        </div>
      </div>
      <div class="flex justify-start w-full gap-4">
        <RouterLink
          :key="button"
          v-for="button of useHomeStore().buttons_fetch()"
          :to="button.router_link"
          :class="
            route.meta.active === button.name
              ? 'bg-yellow-300 shadow-inner'
              : 'bg-yellow-100/60 hover:bg-yellow-300 hover:shadow-inner'
          "
          class="rounded-xl py-2.5 px-4 capitalize shadow-md"
        >
          {{ button.name }}
        </RouterLink>
      </div>
      <button
        @click="onToggle"
        class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 capitalize shadow-md"
      >
        Profile
      </button>

       

      <button
        @click="useLoginStore().logout_fn(router)"
        class="text-yellow-700 hover:text-gray-900"
      >
        Logout
      </button>
    </div>


    <transition name="fade">
      <div v-if="isModalVisible">
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
             
              <h2 class="text-2xl font-bold py-4">Details</h2>
              <p class="text-md text-gray-500 px-8">
               Aadhar Card: XYZ
               <br>
               Registered Mine: ABC
               <br>
               Contact No: 5468745210
              </p>
            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button
                @click="onToggle"
                class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 capitalize shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>


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

<script>
export default {
  data() {
    return {
      isOpen: true
    };
  },

  computed: {
    isModalVisible() {
      return this.isOpen;
    }
  },

  methods: {
    onToggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
