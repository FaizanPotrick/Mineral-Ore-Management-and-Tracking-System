<script setup>
import useDashboardStore from "@/stores/DashboardStore";
import Buttons from "@/assets/json/Buttons.json";
import Cards from "@/assets/json/Cards.json";
console.log(useDashboardStore().component_check(Cards))
</script>

<template>
    <div
        class="border-r border-gray-400/20 bg-white min-w-[18rem] flex flex-col justify-start drop-shadow-md font-bold h-screen sticky top-0 bottom-0">
        <div class="flex items-center justify-center px-4 py-6 border-b">
            <img class="w-10 h-10 rounded-full" src="../assets/ministry_of_mine.png" alt="">
            <div>
                <div class="text-gray-900">Bonnie Green</div>
                <div class="font-medium text-gray-500 truncate">name@flowbite.com</div>
            </div>
        </div>
        <div class="flex flex-col justify-between items-start h-full p-4">
            <div class="flex flex-col gap-2 w-full">
                <RouterLink v-for="button of useDashboardStore().component_check(Buttons)" :to="button.router_link"
                    class="flex items-center hover:bg-yellow-100 rounded-xl text-gray-900 py-2.5 px-4 capitalize">
                    {{ button.name }}
                </RouterLink>
            </div>
            <button
                class="w-full flex flex-shrink-0 justify-start items-center rounded-xl py-2.5 px-4  hover:text-yellow-900 hover:bg-yellow-200">
                <img alt="" class="w-5 h-5 mr-4" src="@/assets/icons/logout.svg" />
                Logout
            </button>
        </div>
    </div>
</template>