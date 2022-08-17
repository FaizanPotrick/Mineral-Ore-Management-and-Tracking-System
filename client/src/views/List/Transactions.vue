<script setup>
import useHomeStore from "@/stores/MinedBatchStore";
useHomeStore().get_mines()

</script>
<template>
    <div class="flex flex-col gap-4 items-center">
        <div
            class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
            <div class="flex justify-between items-center w-full">
                <div class="text-3xl font-semibold">Mines</div>
                <input type="search" class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Search">
            </div>
            <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
                <table class="w-full">
                    <thead class="border-b whitespace-nowrap bg-yellow-400">
                        <tr class="text-center">
                            <th class="px-6 py-4">
                                Mine Id
                            </th>
                            <th class="px-6 py-4">
                                Manager Id
                            </th>
                            <th v-if="$cookies.get('type_of_user') === 'officer'" class="px-6 py-4">
                                Organisation Id
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
                        <tr :key="mine._id" v-for="mine in useHomeStore().mines" class="text-center">
                            <td class="px-6 py-4">
                                {{ mine._id }}
                            </td>
                            <td class="px-6 py-4 ">
                                {{ mine.manager_id }}
                            </td>
                            <td class="px-6 py-4" v-if="$cookies.get('type_of_user') === 'officer'">
                                {{ mine.organisation_id }}
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
