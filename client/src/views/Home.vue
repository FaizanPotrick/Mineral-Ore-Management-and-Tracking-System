<script setup>
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
</script>
<template>
  <div>
    <HeaderVue />
    <div class="">
      <div
        class="hero-image bg-right-bottom bg-cover flex w-full h-[86vh] z-30 bg-gradient-to-r bg-black bg-transparent"
        style="
          background-image: url(https://media.istockphoto.com/photos/queue-for-loading-picture-id522749832?k=20&m=522749832&s=612x612&w=0&h=U4EWOeTcG-ETZ6f57j8YF5qXJEvANMp2MV32oa_1PT8=);
        "
      >
        <div class="relative container mx-auto p-4 z-5">
          <div>
            <div class="text-left m-12 py-20">
              <!-- <h1
                class="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight"
              >
                Iron Ore Mining
              </h1> -->
              <!-- <p
                class="leading-normal text-white text-base md:text-xl lg:text-2xl mb-8"
              >
                Sub-hero message, not too long and not too short. Make it just
                right!
              </p> -->
              <!-- <div class="space-x-4">
                <button
                  class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded my-2 md:my-6 py-3 px-3 shadow-md shadow-orange-400 w-40"
                >
                 Getting Started
                </button>
                
              </div> -->

              <div class="container">
                <div class="row align-items-center">
                  <div
                    class="col-md-6 text-md-start text-center py-6 space-x-4"
                  >
                    <h1 class="mb-4 fs-9 fw-bold text-white text-3xl font-bold">
                      IRON ORE MINING
                    </h1>
                    <p class="mb-6 text-2xl lead text-white font-semibold">
                      Ministry Of Mines is responsible for survey<br
                        class="d-none d-xl-block"
                      />and exploration of all minerals other than<br
                        class="d-none d-xl-block"
                      />natural gases, petroleum and atomic minerals, for mining.
                    </p>

                    <button
                      class="relative inline-flex items-center justify-center border border-black-2 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br hover:bg-yellow-200 group-hover:from-red-200 group-hover:via-red-300 dark:text-white focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      >
                        Login
                      </span>
                    </button>

                    <!-- <button
                      class="text-center text-md-start bg-white hover:bg-yellow-200 rounded-md p-5"
                    >
                    Login
                    </button> -->
                  </div>
                  <div class="col-md-6 text-end">
                    <img
                      class="pt-7 pt-md-0 img-fluid bg-full"
                      height="100%"
                      src="assets/img/large_5.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <!-- <a href="#" class="flex items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover  h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"  alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a> -->
            </div>
          </div>
          <br />
          <div class="flex flex-wrap justify-between py-5 mx-5">
            <!-- <div class="m-3 shadow-md shadow-orange-400">
              <a
                href="#"
                class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Officials
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div> -->
            <!-- <div class="m-3 shadow-md shadow-orange-400">
              <a
                href="#"
                class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Miner
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div> -->
            <!-- <div class="m-3 shadow-md shadow-orange-400">
              <a
                href="#"
                class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Buyer
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <FooterVue />
  </div>
</template>
