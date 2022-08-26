<script setup>
import { Bar, Doughnut } from "vue-chartjs";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";
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

const route = useRoute();
const title = ref("");
const cards = ref([]);
const doughnut = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/miner${route.params.mine_id === undefined
      ? ""
      : `?mine_id=${route.params.mine_id}`
    }`
  );
  title.value = data.title;
  cards.value = data.cards;
  // doughnut.value = data.doughnut;
};

dashboard();
onBeforeMount(() => {
  dashboard();
});

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
    <div class="flex justify-between">
      <div class="text-2xl text-center font-semibold capitalize">
        {{ title }}
      </div>
      <div v-if="$cookies.get('type_of_user') !== 'miner'" class="flex flex-wrap gap-3">
        <RouterLink :to="`/dashboard/mines/${route.params.mine_id}/tested_mined_batches`"
          class="rounded-xl py-2.5 px-4 bg-yellow-300 shadow-md font-semibold">Mined Batches</RouterLink>
        <RouterLink :to="`/dashboard/mines/${route.params.mine_id}/transactions`"
          class="rounded-xl py-2.5 px-4 bg-yellow-300 shadow-md font-semibold">Transactions</RouterLink>
      </div>
      <div v-if="$cookies.get('type_of_user') === 'miner'" class="flex flex-wrap gap-3">
        <RouterLink to="/dashboard/add_mined_batch"
          class="rounded-xl py-2.5 px-4 bg-yellow-300 shadow-md font-semibold">Add Mined Batch</RouterLink>
        <RouterLink to="/dashboard/add_tested_mined_batch"
          class="rounded-xl py-2.5 px-4 bg-yellow-300 shadow-md font-semibold">Add Tested Mined Batch</RouterLink>
        <RouterLink to="/dashboard/add_transaction"
          class="rounded-xl py-2.5 px-4 bg-yellow-300 shadow-md font-semibold">Add Transaction</RouterLink>
      </div>
    </div>
    <div class="flex gap-4 flex-wrap font-semibold">
      <div :key="card" v-for="card of cards"
        class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-4 bg-white rounded-lg drop-shadow-md min-w-[20rem]">
        <div class="text-xl">{{ card.title }}</div>
        <div class="flex gap-4 capitalize">
          <div v-if="typeof card.value === 'object'" v-for="(value, name) of card.value">
            {{ name }} : {{ value }}
          </div>
          <div class="text-2xl font-semibold" v-else>{{ card.value }}</div>
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
      <!-- <div class="bg-white p-2 text-center rounded-xl max-w-xl w-full">
        Warehouse Overview
        <Doughnut :chart-options="{
          responsive: true,
          maintainAspectRatio: false,
        }" :chart-data="doughnut" />
      </div> -->
    </div>
  </div>
</template>
