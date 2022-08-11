<script setup>
import useMineStore from '@/stores/MineStore';
import { Bar, Doughnut } from "vue-chartjs";
import { useRouter, useRoute } from 'vue-router';
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
const route = useRoute();
useMineStore().mine_dashboard(route);
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
</script>
<template>
    <div class="flex flex-col gap-4">
        <div class="text-xl font-semibold capitalize">
            {{ useMineStore().company_name }}
        </div>
        <div class="flex gap-4 flex-wrap w-full font-semibold">
            <div :key="card" v-for="card of useMineStore().cards"
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
            <!-- <div class="bg-white p-4 text-center rounded-xl">Mining Overview
                <Bar :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :chart-data="data" />
            </div> -->
            <div class="bg-white p-4 text-center rounded-xl"> Grades Of Iron Ore
                <Doughnut :chart-options="{
                    responsive: true,
                    maintainAspectRatio: false,
                }" :chart-data="useMineStore().doughnut" />
            </div>
        </div>
    </div>
</template>