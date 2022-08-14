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
      <!-- <button 
        @click="onToggle"
        class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 capitalize shadow-md"
      >
        Profile
      </button> -->

      <!-- VUE JS POP OVER  -->
      <button
        @click="showPopover()"
        class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 capitalize shadow-md"
      >
        Profile
      </button>
      <!-- END OF VUE JSPOP OVER -->

      <!-- TAILWIND CSS POP OVER -->
      <!-- <button 
        data-popover-target="popover-user-profile"
        class="text-black bg-yellow-100/60 hover:bg-yellow-300 rounded-xl py-2.5 px-4 capitalize shadow-md"
      >
        Profile
      </button> -->
      <!-- END OF TAILWIND CSS POP OVER -->

      <!-- TAILWIND CSS POP OVER -->
      <!-- <div id="popover-user-profile" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600">
    <div class="p-3">
        <div class="flex justify-between items-center mb-2">
            <a href="#">
                <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos">
            </a>
            <div>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
            </div>
        </div>
        <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <a href="#">Jese Leos</a>
        </p>
        <p class="mb-3 text-sm font-normal">
            <a href="#" class="hover:underline">@jeseleos</a>
        </p>
        <p class="mb-4 text-sm font-light">Open-source contributor. Building <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
        <ul class="flex text-sm font-light">
            <li class="mr-2">
                <a href="#" class="hover:underline">
                    <span class="font-semibold text-gray-900 dark:text-white">799</span>
                    <spa>Following</spa>
                </a>
            </li>
            <li>
                <a href="#" class="hover:underline">
                    <span class="font-semibold text-gray-900 dark:text-white">3,758</span>
                    <span>Followers</span>
                </a>
            </li>
        </ul>
    </div>
    <div data-popper-arrow></div>
</div> -->
      <!-- END TAILWIND CSS POP OVER -->

      <!-- VUE JS Code block starts -->
      <div
        id="popover"
        class="transition duration-150 ease-in-out mt-16 absolute w-full sm:w-1/2"
      >
        <div class="w-full bg-white rounded shadow-2xl">
          <div class="w-full h-full px-4 xl:px-8 pt-3 pb-5">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div>
                  <h3
                    class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4"
                  >
                    Aadhar Card
                  </h3>
                  <p class="text-gray-600 text-xs leading-3">ABC</p>
                </div>
              </div>
            </div>
            <div class="py-6 flex justify-between items-center">
              <div class="flex items-center">
                <div>
                  <h3
                    class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4"
                  >
                    Registration Number
                  </h3>
                  <p class="text-gray-600 text-xs leading-3">XYZ</p>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div>
                  <h3
                    class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4"
                  >
                    Registerd Mine
                  </h3>
                  <p class="text-gray-600 text-xs leading-3">PQR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- VUE JS Code block ends -->

      <!-- TAILWIND POP OVER  -->

      <!-- <div id="popover-user-profile" role="tooltip" class="inline-block absolute invisible z-10 w-64 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(278.4px, 218.4px, 0px);">
        <div class="p-3">
            <div class="flex justify-between items-center mb-2">
                <a href="#">
                    <img class="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese Leos">
                </a>
                <div>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                </div>
            </div>
            <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#">Jese Leos</a>
            </p>
            <p class="mb-3 text-sm font-normal">
                <a href="#" class="hover:underline">@jeseleos</a>
            </p>
            <p class="mb-4 text-sm font-light">Open-source contributor. Building <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">flowbite.com</a>.</p>
            <ul class="flex text-sm font-light">
                <li class="mr-2">
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">799</span>
                        <spa>Following
                    </spa></a>
                </li>
                <li>
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">3,758</span>
                        <span>Followers</span>
                    </a>
                </li>
            </ul>
        </div>
        <div data-popper-arrow="" style="position: absolute; left: 0px; transform: translate3d(123.2px, 0px, 0px);"></div>
    </div> -->

      <!-- END TAILWIND POP OVER -->
      <button
        @click="useLoginStore().logout_fn(router)"
        class="text-yellow-700 hover:text-gray-900"
      >
        Logout
      </button>
    </div>
    <!-- <transition name="fade">
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
    </transition> -->

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

<!-- <script>
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
</style> -->

<!-- vue js popover -->
<script>
export default {
  name: "SimplePopover",
  methods: {
    showPopover() {
      document.getElementById("popover").classList.toggle("opacity-0");
    },
    dropdownFunction(flag) {
      let upIcon;
      let downIcon;
      if (flag === 1) {
        upIcon = document.getElementById("upIcon1");
        downIcon = document.getElementById("downIcon1");
        upIcon.classList.toggle("hidden");
        downIcon.classList.toggle("hidden");
      } else if (flag === 2) {
        upIcon = document.getElementById("upIcon2");
        downIcon = document.getElementById("downIcon2");
        upIcon.classList.toggle("hidden");
        downIcon.classList.toggle("hidden");
      } else if (flag === 3) {
        upIcon = document.getElementById("upIcon3");
        downIcon = document.getElementById("downIcon3");
        upIcon.classList.toggle("hidden");
        downIcon.classList.toggle("hidden");
      }
    },
  },
};
</script>
<!-- end of vue js popover -->
