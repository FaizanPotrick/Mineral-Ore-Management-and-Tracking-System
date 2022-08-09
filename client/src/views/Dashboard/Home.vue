<script setup>
import useHomeStore from '@/stores/Dashboard/HomeStore.js';
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
useHomeStore().dashboard_fetch();
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
    labels: ["Fine", "Lump", "Iron Pellet", "Empty"],
    datasets: [
        {
            label: "High",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#E48665"],
            data: [40, 20, 80, 20],
        },
    ],
};
const redirect = (id) => {
    router.push('/dashboard/mines/' + id);
}
</script>
<template>
    <div class="flex flex-col gap-8">
        <div class="text-2xl font-semibold capitalize">
            {{ useHomeStore().company_name }}
        </div>
        <div class="flex gap-4 flex-wrap font-semibold">
            <div :key="card" v-for="card of useHomeStore().cards"
                class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-8 bg-white rounded-lg drop-shadow-md min-w-[24rem]">
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
            <div class="bg-white p-4 text-center rounded-xl"> Grades Of
                Iron Ore
                <Doughnut :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :chart-data="doughnut" />
            </div>
        </div>
        <ol-map v-if="$cookies.get('type_of_user') !== 'miner'" style="height:40vh">
            <ol-view ref="view" :center="[78.9629, 20.5937]" :rotation="0" :zoom="5" projection="EPSG:4326" />
            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>
            <ol-zoom-control v-if="true" />
            <ol-overlay :key="marker._id" v-for="marker of useHomeStore().markers" :position="marker.coordinates"
                @click="redirect(marker._id)">
                <img src="@/assets/marker.png" class="h-8 w-8 cursor-pointer" alt="">
            </ol-overlay>
        </ol-map>
    </div>
</template>
