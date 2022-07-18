<script setup>
import MinistryOfMine from "@/assets/ministry_of_mine.png";
</script>
<template>
    <nav
        class="bg-white flex justify-around items-center w-full h-[8vh] text-xl font-semibold border-b border-gray-400/20">
        <RouterLink to="/" class="flex items-center justify-center text-yellow-700 hover:text-yellow-700/80">
            <img :src="MinistryOfMine" class="h-22 w-16" alt="Ministry of mine logo" />
            <div class="text-xl font-semibold">Ministry Of Mines</div>
        </RouterLink>
        <button
            class="relative flex justify-center items-center flex-shrink-0 border border-gray-400/20 h-fit px-4 py-2 group bg-green-100 rounded-lg shadow-sm">
            <span>
                Login
            </span>
            <svg class="ml-1 w-5 h-5 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            <span
                class="invisible group-hover:visible flex flex-col justify-center items-start flex-shrink-0 w-40 absolute top-12 -m-0.5 z-10 rounded-lg shadow-md bg-green-100 text-gray-800 text-base p-2 border border-gray-400/20">
                <RouterLink to="/login/officials_login" class="w-full rounded-lg py-2 px-4 hover:bg-green-200">
                    Officials Login
                </RouterLink>
                <RouterLink to="/login/miner_login" class="w-full rounded-lg py-2 px-4 hover:bg-green-200">Miner
                    Login
                </RouterLink>
                <RouterLink to="/login/buyer_login" class="w-full rounded-lg py-2 px-4 hover:bg-green-200">Buyer
                    Login
                </RouterLink>
            </span>
        </button>
    </nav>
</template>