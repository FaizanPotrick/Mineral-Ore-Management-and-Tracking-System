<script setup>
import Miner from "@/assets/json/Miner.json";
import { ref } from "vue";

const miner_list = Miner;
const search = ref("");
function filterList() {
    return miner_list.filter(item => {
        return item.Name.toLowerCase().includes(search.value.toLowerCase());
    });
}
</script>
<template>
    <div class="flex justify-around p-6">
        <h3 class="text-2xl font-medium text-gray-900 ">Mine Logs</h3>
        <div class="xl:w-96">
            <div class="input-group relative flex  items-stretch w-full mb-4">
                <input type="search" v-model="search"
                    class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Search Mine Name" aria-label="Search" aria-describedby="button-addon3">
                <button
                    class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="button" id="button-addon3">Search</button>
            </div>
        </div>
    </div>
    <div class="flex justify-center">
        <div class="overflow-x-auto sm:mx-6 lg:mx-8">
            <div class="py-2 inline-block w-[92vw] ">
                <div class="overflow-hidden">
                    <table class="table-auto min-w-full border-2 font-medium ">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Batch ID
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Mine Name
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Type
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Grade
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Quantity
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Price
                                </th>
                                <!-- <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    Status
                                </th> -->
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left ">
                                    Timestamp
                                </th>
                                <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                    View
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mine in filterList()" :key="mine.batch_id"
                                class="bg-gray-100 border-b hover:bg-gray-200">
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.batch_id }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.Name }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.Type }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.Grade }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.quantity }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.Price }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    {{ mine.Time_Stamp }}
                                </td>
                                <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                    <a href="" class=" text-blue-500 hover:underline">View
                                        Log</a>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>
