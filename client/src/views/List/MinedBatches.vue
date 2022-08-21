<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mined_batches = ref([]);
const filter_batches = ref([]);
const search = ref("");
const status = ["pending", "approved", "disapproved"];
const grade = ["low", "medium", "high"];
const checked_list = ref([]);

const get_mined_batches = async () => {
    const { data } = await axios.get(
        `/api/mined_batches/${route.params.mine_id !== undefined
            ? `officer?mine_id=${route.params.mine_id}`
            : $cookies.get("type_of_user") === "officer"
                ? "officer/district"
                : $cookies.get("type_of_user")
        }`
    );
    mined_batches.value = data;
    filter_batches.value = data;
};
get_mined_batches();

const filterList = () => {
    const data = filter_batches.value.filter((item) => {
        if (!checked_list.value.length) return filter_batches.value;
        if (
            item.status.includes(checked_list.value) ||
            item.grade.includes(checked_list.value)
        )
            return true;
    });
    mined_batches.value = data;
};

const searchList = () => {
    const data = filter_batches.value.filter((item) => {
        if (search.value === "") {
            return filter_batches.value;
        } else if (
            item.type_of_ore.toLowerCase().includes(search.value.toLowerCase())
        )
            return true;
        else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
            return true;
        else if (item.manager_id.toLowerCase().includes(search.value.toLowerCase()))
            return true;
        else if (item.grade.toLowerCase().includes(search.value.toLowerCase()))
            return true;
        else if (item.status.toLowerCase().includes(search.value.toLowerCase()))
            return true;
        else if (item.fe_percentage.toString().includes(search.value)) return true;
        else if (item.quantity.toString().includes(search.value)) return true;
        else if (item.createdAt.toLowerCase().includes(search.value.toLowerCase()))
            return true;
    });

    mined_batches.value = data;
};
</script>
<template>
    <div class="flex flex-col gap-4 items-center">
        <div
            class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
            <div class="flex justify-between items-center w-full">
                <div class="text-3xl font-semibold">Mines</div>
                <div class="flex flex-wrap items-center">
                    <div>
                        <h3 class="mb-1 font-semibold text-gray-900">Status</h3>
                        <ul class="w-32 text-sm font-medium text-gray-900 bg-white ">
                            <li v-for="status in status">
                                <input type="checkbox" v-model="checked_list" v-bind:value="status"
                                    @keyup.enter="filterList()" />
                                {{ status }}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="mb-1 font-semibold text-gray-900">Grade</h3>
                        <ul class="w-32 text-sm font-medium text-gray-900 bg-white">
                            <li v-for="grade in grade" class="rounded-lg">
                                <input type="checkbox" v-model="checked_list" v-bind:value="grade" />
                                {{ grade }}
                            </li>
                        </ul>
                    </div>
                    <div>

                        <button type="submit" @click="filterList()"
                            class="text-white mx-2  bg-yellow-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2">Filter</button>
                    </div>
                    <div>
                        <input type="search" class="max-w-sm w-8vw px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="Search" v-model="search" @keyup.enter="searchList()" />
                        <button type="submit"
                            class="absolute top-18 right-5 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-600 hover:bg-orange-400">
                            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
            <thead class="border-b whitespace-nowrap bg-yellow-400">
                <tr class="text-center">
                    <th class="px-2 py-4">Batch Id</th>
                    <th class="px-2 py-4" v-if="$cookies.get('type_of_user') === 'officer'">
                        Manager Id
                    </th>
                    <th class="px-2 py-4">Grade</th>
                    <th class="px-2 py-4">Fe Percentage</th>
                    <th class="px-2 py-4">Type of Ore</th>
                    <th class="px-2 py-4">Quantity</th>
                    <th class="px-2 py-4">Status</th>
                    <th class="px-2 py-4">Timestamp</th>
                    <th v-if="
                        $cookies.get('type_of_user') === 'officer' &&
                        route.params.mine_id === undefined
                    " class="px-2 py-4">
                        Form
                    </th>
                    <th v-else class="px-2 py-4"></th>
                </tr>
            </thead>
            <tbody class="font-normal text-gray-600 whitespace-nowrap">
                <tr :key="mine._id" v-for="mine in mined_batches" class="text-center">
                    <td class="px-2 py-4">
                        <abbr style="text-decoration: none" :title="mine._id">
                            ...{{ mine._id.slice(19) }}
                        </abbr>
                    </td>
                    <td class="px-2 py-4" v-if="$cookies.get('type_of_user') === 'officer'">
                        {{ mine.manager_id.slice(4) }}
                    </td>
                    <td class="px-2 py-4">
                        {{ mine.grade }}
                    </td>
                    <td class="px-2 py-4">
                        {{ mine.fe_percentage }}
                    </td>
                    <td class="px-2 py-4">
                        {{ mine.type_of_ore }}
                    </td>
                    <td class="px-2 py-4">
                        {{ mine.quantity }}
                    </td>
                    <td class="px-2 py-4">
                        {{ mine.status }}
                    </td>
                    <td class="px-2 py-4">
                        <abbr style="text-decoration: none" :title="mine.createdAt">
                            {{ mine.createdAt.slice(-12, -5) }}
                        </abbr>
                    </td>
                    <td v-if="
                        $cookies.get('type_of_user') === 'officer' &&
                        route.params.mine_id === undefined
                    " class="px-6 py-4">
                        <RouterLink :to="
                            '/dashboard/mined_batches/' +
                            mine._id +
                            '/approve_mined_batch'
                        " class="hover:text-yellow-700">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z">
                                </path>
                            </svg>
                        </RouterLink>
                    </td>
                    <td v-else class="px-6 py-4">
                        <RouterLink :to="
                            $cookies.get('type_of_user') !== 'miner'
                                ? '/dashboard/mines/' +
                                route.params.mine_id +
                                '/mined_batches/' +
                                mine._id
                                : '/dashboard/mined_batches/' + mine._id
                        " class="hover:text-yellow-700">
                            <!-- <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  ></path>
                </svg> -->
                            <button type="button"
                                class="inline-block px-4 py-2  border-2 bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs leading-normal uppercase rounded-lg">
                                View
                            </button>
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
