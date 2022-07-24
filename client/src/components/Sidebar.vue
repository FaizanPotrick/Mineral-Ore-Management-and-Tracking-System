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
                <RouterLink to="/dashboard/miner_dashboard"
                    class="flex items-center bg-yellow-200 rounded-xl text-yellow-900 py-2.5 px-4">
                    <svg fill="currentColor" class="w-5 h-5 mr-4" viewBox="0 0 16 16">
                        <path
                            d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    </svg>Plan
                </RouterLink>
                <RouterLink to="/dashboard/miner_dashboard/ores_registration"
                    class="flex bg-white hover:bg-yellow-50 rounded-xl text-gray-900 py-2.5 px-4">
                    <img alt="" class="w-5 h-5 mr-4" src="@/assets/icons/file.svg" />
                    Create Batch
                </RouterLink>
                <button class="flex bg-white hover:bg-yellow-50 rounded-xl text-gray-900 py-2.5 px-4">
                    <svg fill="currentColor" class="w-5 h-5 mr-4" viewBox="0 0 16 16">
                        <path
                            d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                    </svg>Projects
                </button>
                <button class="flex bg-white hover:bg-yellow-50 rounded-xl text-gray-900 py-2.5 px-4">
                    <svg fill="currentColor" class="w-5 h-5 mr-4" viewBox="0 0 16 16">
                        <path
                            d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>Tags
                </button>
            </div>
            <button
                class="w-full flex flex-shrink-0 justify-start items-center rounded-xl py-2.5 px-4  hover:text-yellow-900 hover:bg-yellow-200">
                <img alt="" class="w-5 h-5 mr-4" src="@/assets/icons/logout.svg" />
                Logout
            </button>
        </div>
    </div>
</template>