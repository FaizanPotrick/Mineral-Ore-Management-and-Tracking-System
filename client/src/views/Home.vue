<script setup>
import MinistryOfMine from "@/assets/ministry_of_mine.png";
</script>
<template>
  <div
    class="flex flex-col justify-between items-center max-h-screen min-h-screen"
    style="
      background: url(https://media.istockphoto.com/photos/queue-for-loading-picture-id522749832?k=20&m=522749832&s=612x612&w=0&h=U4EWOeTcG-ETZ6f57j8YF5qXJEvANMp2MV32oa_1PT8=);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    "
  >
    <nav
      class="flex justify-center items-center bg-white text-xl font-semibold py-3 w-full"
    >
      <RouterLink
        to="/"
        class="flex items-center justify-center text-yellow-700 hover:text-yellow-700/80"
      >
        <img :src="MinistryOfMine" class="h-14" alt="Ministry of mine logo" />
        Ministry Of Mines
      </RouterLink>
    </nav>
    <div class="flex flex-col justify-center items-center font-semibold gap-5">
      <div class="text-white  md:text-5xl lg:text-7xl sm:text-3xl uppercase">
        Iron Ore Mining
      </div>
      <RouterLink
        to="/login"
        class="rounded-lg hover:bg-yellow-200 hover:border-yellow-700 text-yellow-700 text-lg px-5 py-2 bg-white"
      >
        Login
      </RouterLink>
    </div>
    <footer
      class="flex items-center justify-around bg-white font-semibold text-yellow-700 py-3 w-full sm:text-sm md:text-md lg:text-lg"
    >
      <div class="sm: mx-4">© Ministry of Mines. All Rights Reserved.</div>
      <div>@Team Mining.eth</div>
    </footer>
  </div>
</template>
