<script setup>
import useDashboardStore from '@/stores/DashboardStore.js';
import { Bar, Doughnut } from "vue-chartjs";
import { useRouter } from 'vue-router';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale
);
const router = useRouter();
useDashboardStore().card_fetch();
if ($cookies.get('type_of_user') === "organization" || $cookies.get('type_of_user') === "officer") {
    useDashboardStore().map_fetch();
}
if ($cookies.get('type_of_user') === "organization" || $cookies.get('type_of_user') === "miner") {
    useDashboardStore().name_fetch();
}
const data = {
    labels: ["January", "February", "March"],
    datasets: [
        {
            label: "High",
            backgroundColor: "#41B883",
            data: [40, 20, 12],
        },
        {
            label: "Medium",
            backgroundColor: "#E46651",
            data: [30, 20, 12],
        },
        {
            label: "Low",
            backgroundColor: "#00D8FF",
            data: [20, 20, 12],
        },
    ],
};
const doughnut = {
    labels: ["High", "Medium", "Low"],
    datasets: [
        {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [40, 20, 80],
        },
    ],
};
const redirect = (id) => {
    router.push('/dashboard/mines/' + id);
}
</script>
<template>
    <div class="flex flex-col gap-4">
        <div class="text-xl font-semibold capitalize">
            {{ useDashboardStore().company_name }}
        </div>
        <ol-map v-if="$cookies.get('type_of_user') === 'organization' || $cookies.get('type_of_user') === 'officer'"
            style="height:40vh">
            <ol-view ref="view" :center="[78.9629, 20.5937]" :rotation="0" :zoom="5" projection="EPSG:4326" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>
            <ol-zoom-control v-if="true" />
            <ol-overlay :key="marker._id" v-for="marker of useDashboardStore().marker" :position="marker.coordinates"
                @click="redirect(marker._id)">
                <img src="@/assets/marker.png" class="h-8 w-8 cursor-pointer" alt="">
            </ol-overlay>
        </ol-map>
        <div class="flex gap-4 flex-wrap w-full font-semibold">
            <div :key="card" v-for="card of useDashboardStore().card_data"
                class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-8 bg-white rounded-lg drop-shadow-md">
                <div class="text-xl">{{ card.title }}</div>
                <div class="flex gap-4 capitalize">
                    <div v-if="typeof (card.value) === 'object'" v-for="(value, name) of     card.value">
                        {{ name }} : {{ value }}
                    </div>
                    <div v-else>{{ card.value }}</div>
                </div>
            </div>
        </div>
        <div class="flex justify-start gap-4 w-full drop-shadow-md text-xl font-medium">
            <div class="bg-white p-4 text-center rounded-xl">Mining Overview
                <Bar :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :chart-data="data" />
            </div>
            <div class="bg-white p-4 text-center rounded-xl"> Grades Of Iron Ore
                <Doughnut :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :chart-data="doughnut" />
            </div>
        </div>
        <div class="flex flex-col">
            <button class="btn bg-blue-200 p-5 font-bold">Logs</button>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-white border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Sr.No
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Batch ID
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Mine Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Type
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Grade
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Quantity (Tons)
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Price
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Time Stamp
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        0x12ojfdasa
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Lump
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        High
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        1000
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Sold
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        5
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        2:30 PM <br />
                                        13 March 2022
                                    </td>
                                </tr>

                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        2
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        5rrhsaXpa
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Lump
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        High
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        1000
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Sold
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        9
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        8:30 PM <br />
                                        9 May 2022
                                    </td>
                                </tr>

                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        3
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        1h45xkkl
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Fine
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Medium
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        500
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Mined
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        7
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        7:30 PM <br />
                                        5 June 2022
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <button class="btn bg-blue-200 p-5 font-bold"> Miner Logs</button>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-white border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Sr.No
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Batch ID
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Mine Name
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Total Quantity(Tons)
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        High
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Medium
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Low
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        1
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        0x12ojfdasa
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Lump
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        350
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        150
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        100
                                    </td>


                                </tr>

                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        2
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        5rrhsaXpa
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Lump
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        250
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        100
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        50
                                    </td>


                                </tr>

                                <tr class="border-b bg-gray-100">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        3
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        1h45xkkl
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Meghahatuburu
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Fine
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        500
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        500
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        100
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
