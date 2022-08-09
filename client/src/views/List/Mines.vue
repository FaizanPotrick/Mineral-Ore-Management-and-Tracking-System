<script setup>
import useDashboardStore from "@/stores/DashboardStore";
import { ref } from "vue";
const search = ref("");
useDashboardStore().mines_fetch()

function filterList() {
    return useDashboardStore().mines.filter(mine => {
        if (mine._id.toLowerCase().includes(search.value.toLowerCase())) {
            return mine._id;
        }
        else if (mine.manager_id.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.manager_id
        }
        else if (mine.organization_id.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.organization_id
        }
        else if (mine.region_id.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.region_id
        }
        else if (mine.batch_id.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.batch_id
        }
        else if (mine.warehouse_capacity.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.warehouse_capacity
        }
        else if (mine.location.pin_code.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.location.pin_code
        }
        else if (mine.lease_period.to.toLowerCase().includes(search.value.toLowerCase())) {
            return mine.lease_period.to
        } else {
            return mine
        }
    });
}
</script>
<template>
    <div class="flex flex-col gap-4 items-center">
        <div
            class="flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
            <div class="flex justify-between items-center w-full">
                <div class="text-3xl font-semibold">Mines</div>
                <input type="search" v-model="search"
                    class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search">
            </div>
            <div class="border rounded-xl overflow-hidden drop-shadow-md">
                <table>
                    <thead class="border-b whitespace-nowrap bg-yellow-400">
                        <tr class="text-center">
                            <th class="px-6 py-4">
                                Mine Id
                            </th>
                            <th class="px-6 py-4">
                                Manager Id
                            </th>
                            <th v-if="$cookies.get('type_of_user') === 'officer'" class="px-6 py-4">
                                Organization Id
                            </th>
                            <th class="px-6 py-4">
                                Region Id
                            </th>
                            <th class="px-6 py-4">
                                Warehouse Capacity
                            </th>
                            <th class="px-6 py-4">
                                Pin Code
                            </th>
                            <th class="px-6 py-4">
                                Lease Period
                            </th>
                            <th class="px-6 py-4">
                                View
                            </th>
                        </tr>
                    </thead>
                    <tbody class="font-normal text-gray-600 whitespace-nowrap">
                        <tr :key="mine._id" v-for="mine in useDashboardStore().mines" class="text-center">
                            <td class="px-6 py-4">
                                {{ mine._id }}
                            </td>
                            <td class="px-6 py-4 ">
                                {{ mine.manager_id }}
                            </td>
                            <td class="px-6 py-4" v-if="$cookies.get('type_of_user') === 'officer'">
                                {{ mine.organization_id }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.region_id }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.warehouse_capacity }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.location.pin_code }}
                            </td>
                            <td class="px-6 py-4">
                                {{ mine.lease_period.to }}
                            </td>
                            <td class="px-6 py-4">
                                <RouterLink :to="'/dashboard/mines/' + mine._id" class="hover:text-yellow-700">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z">
                                        </path>
                                    </svg>
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
