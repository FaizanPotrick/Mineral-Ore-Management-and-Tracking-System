<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const route = useRoute();
const title = ref("");
const cards = ref([]);
const fine = ref([]);
const lump = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/mine${
      route.params.mine_id === undefined
        ? ""
        : `?mine_id=${route.params.mine_id}`
    }`
  );
  title.value = data.title;
  cards.value = data.cards;
  fine.value = [data.fine_high, data.fine_medium, data.fine_low];
  lump.value = [data.lump_high, data.lump_medium, data.lump_low];
};

dashboard();
onBeforeMount(() => {
  dashboard();
});

const ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex justify-between">
      <div class="text-2xl text-center font-semibold capitalize">
        {{ title }}
      </div>
      <div
        v-if="
          $cookies.get('type_of_user') === 'government' &&
          route.params.mine_id !== undefined
        "
        class="flex flex-wrap gap-3"
      >
        <RouterLink
          :to="`/dashboard/mines/${route.params.mine_id}/tested_mined_batches`"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Mined Batches</RouterLink
        >
        <RouterLink
          :to="`/dashboard/mines/${route.params.mine_id}/transactions`"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Transactions</RouterLink
        >
      </div>
      <div
        v-if="$cookies.get('type_of_user') === 'mine'"
        class="flex flex-wrap gap-3"
      >
        <RouterLink
          to="/dashboard/registration/mined_batch"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Add Mined Batch</RouterLink
        >
        <RouterLink
          to="/dashboard/registration/tested_mined_batch"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Add Tested Mined Batch</RouterLink
        >
        <RouterLink
          to="/dashboard/registration/transaction"
          class="rounded-lg py-1.5 px-4 bg-yellow-300 shadow-md font-semibold"
          >Add Transaction</RouterLink
        >
      </div>
    </div>
    <div class="flex gap-4 flex-wrap font-semibold">
      <div
        :key="card"
        v-for="card of cards"
        class="flex flex-col gap-2 border-l-4 border-yellow-300 py-5 px-4 bg-white rounded-lg drop-shadow-md min-w-[20rem]"
      >
        <div class="text-xl">{{ card.title }}</div>
        <div class="flex gap-4 capitalize">
          <div
            v-if="typeof card.value === 'object'"
            v-for="(value, name) of card.value"
          >
            {{ name }} : {{ value }}
          </div>
          <div class="text-2xl font-semibold" v-else>{{ card.value }}</div>
        </div>
      </div>
    </div>
    <div class="flex gap-6">
      <div
        class="bg-white p-4 text-center rounded-xl w-full max-w-xl drop-shadow-md text-2xl"
      >
        Fine Transaction Overview
        <apexchart
          type="line"
          :options="ApexOptions"
          :series="[
            {
              name: 'High',
              data: fine[0],
            },
            {
              name: 'Medium',
              data: fine[1],
            },
            {
              name: 'Low',
              data: fine[2],
            },
          ]"
        ></apexchart>
      </div>
      <div
        class="bg-white p-4 text-center rounded-xl w-full max-w-xl drop-shadow-md text-2xl"
      >
        Lump Transaction Overview
        <apexchart
          type="line"
          :options="ApexOptions"
          :series="[
            {
              name: 'High',
              data: lump[0],
            },
            {
              name: 'Medium',
              data: lump[1],
            },
            {
              name: 'Low',
              data: lump[2],
            },
          ]"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
