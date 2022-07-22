<script setup>
import MinistryOfMine from "@/assets/ministry_of_mine.png";
</script>
<template>
  <nav
    class="bg-white flex justify-around items-center w-full h-[8vh] text-xl font-semibold border-b border-gray-400/20"
  >
    <RouterLink
      to="/"
      class="flex items-center justify-center text-yellow-700 hover:text-yellow-700/80"
    >
      <img
        :src="MinistryOfMine"
        class="h-[7vh] w-[7vh]"
        alt="Ministry of mine logo"
      />
      <div class="text-xl font-semibold">Ministry Of Mines</div>
    </RouterLink>
 
        <!-- <RouterLink
          to="/officials_login"
          class="w-full rounded-lg py-2 px-4 hover:bg-green-200 whitespace-nowrap"
        >
          Officer Login
        </RouterLink>
        <RouterLink
          to="/buyer_login"
          class="w-full rounded-lg py-2 px-4 hover:bg-green-200 whitespace-nowrap"
          >Organization Login
        </RouterLink>
        <RouterLink
          to="/miner_login"
          class="w-full rounded-lg py-2 px-4 hover:bg-green-200 whitespace-nowrap"
          >Miner Login
        </RouterLink> -->
     
  </nav>
</template>
