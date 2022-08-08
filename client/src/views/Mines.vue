<script setup>
import Miner from "@/assets/json/Miner.json";
import { ref } from "vue";

const miner_list = Miner;
const search = ref("");
function filterList() {
    return miner_list.filter(item => {
        if (item.Name.toLowerCase().includes(search.value.toLowerCase())) {
            return item.Name;
        }
        else if (item.Type.toLowerCase().includes(search.value.toLowerCase())) {
            return item.Type
        }
        else if (item.Grade.toLowerCase().includes(search.value.toLowerCase())) {
            return item.Grade
        }
        else if (item.batch_id.toLowerCase().includes(search.value.toLowerCase())) {
            return item.batch_id
        }
        else if (item.quantity.toLowerCase().includes(search.value.toLowerCase())) {
            return item.quantity
        }
        else if (item.Price.toLowerCase().includes(search.value.toLowerCase())) {
            return item.Price
        }
        else if (item.Time_Stamp.toLowerCase().includes(search.value.toLowerCase())) {
            return item.Time_Stamp
        }
    });
}
</script>
<template>
    <div class="flex flex-col gap-4 items-center">
        <div class="flex flex-col justify-center items-center gap-4 py-4 rounded-xl bg-white shadow-inner w-fit p-5">
            <div class="flex justify-between items-center bg-white rounded-lg">
                <div class="text-2xl text-gray-900">Mines</div>
                <input type="search" v-model="search" class="form-control px-3 py-1.5 border border-gray-300 rounded-lg"
                    placeholder="Search">
            </div>
            <div class="border rounded-lg">
                <table>
                    <thead class="border-b">
                        <tr>
                            <th scope="col" class=" text-gray-900 px-6 py-4 text-left">
                                Batch ID
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                Mine Name
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                Grade
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-4 text-left ">
                                Timestamp
                            </th>
                            <th scope="col" class="px-6 py-4 text-left">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody class="font-normal text-gray-600 whitespace-nowrap">
                        <tr v-for="mine in filterList()" :key="mine.batch_id">
                            <td class="px-6 py-4 ">
                                {{ mine.batch_id }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.Name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.Type }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.Grade }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.quantity }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.Price }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.Time_Stamp }}
                            </td>
                            <td class="px-6 py-4">
                                <button>View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
