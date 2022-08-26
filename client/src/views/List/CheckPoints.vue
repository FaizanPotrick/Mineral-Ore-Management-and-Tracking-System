<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const checkpoints = ref([]);
const filter_checkpoint = ref([]);
const search = ref("");
const dashboard = async () => {
    const { data } = await axios.get(
        `/api/checkpoints/officer/${$cookies.get('type_of_region')}`
    );
    checkpoints.value = data;
    filter_checkpoint.value = data;
};
dashboard();

const searchList = () => {
    const data = filter_checkpoint.value.filter((item) => {
        if (search.value === "") {
            return filter_checkpoint.value;
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

    transactions.value = data;
};

</script>

<template>
    <div class="flex flex-col gap-4 items-center">
        <div
            class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
            <div class="flex justify-between items-center w-full">
                <div class="text-3xl font-semibold">Check Points</div>
                <div class="hidden sm:block">
                    <input type="search" class="max-w-sm w-8vw px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Search" v-model="search" @keyup.enter="searchList()" />
                    <button type="submit" @click="searchList()"
                        class="absolute top-18 right-5 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-600 hover:bg-orange-400">
                        <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
            <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
                <table class="w-full">
                    <thead class="border-b whitespace-nowrap bg-yellow-400">
                        <tr>
                            <th class="py-4">CheckPoint Id</th>
                            <th class="py-4">Officer Id</th>
                            <th class="py-4">Region Id</th>
                        </tr>
                    </thead>
                    <tbody class="whitespace-nowrap">
                        <tr :key="checkpoint._id" v-for="checkpoint in checkpoints"
                            class="text-center hover:bg-yellow-100/20 cursor-pointer"
                            @click="router.push(`/dashboard/checkpoints/${checkpoint._id}`)">
                            <td class="py-4">
                                <abbr style="text-decoration: none" :title="checkpoint._id">
                                    ...{{ checkpoint._id.slice(15) }}
                                </abbr>
                            </td>
                            <td class="py-4">
                                {{ checkpoint.checkpoint_officer_id }}
                            </td>
                            <td class="py-4 capitalize">
                                {{ checkpoint.region_id }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
