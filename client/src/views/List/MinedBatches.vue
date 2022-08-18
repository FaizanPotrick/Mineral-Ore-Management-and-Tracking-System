<script setup>
import useMinedBatchStore from "@/stores/MinedBatchStore";
import Miner from "../../stores/Json_files/miner.json";
import { ref } from "vue";

const search = ref("");
const checked_list = [];
function filter() {
  if (!this.checked_list.length) return Miner;

  return Miner.filter((item) => this.checked_list.includes(item.grade));
}

function filterList() {
  return Miner.filter((item) => {
    return item.grade.toLowerCase().includes(search.value.toLowerCase());
    // if (item.Name.toLowerCase().includes(search.value.toLowerCase())) {
    //   return item.Name;
    // } else if (item.Type.toLowerCase().includes(search.value.toLowerCase())) {
    //   return item.Type;
    // } else if (item.Grade.toLowerCase().includes(search.value.toLowerCase())) {
    //   return item.Grade;
    // } else if (
    //   item.batch_id.toLowerCase().includes(search.value.toLowerCase())
    // ) {
    //   return item.batch_id;
    // } else if (
    //   item.quantity.toLowerCase().includes(search.value.toLowerCase())
    // ) {
    //   return item.quantity;
    // } else if (item.Price.toLowerCase().includes(search.value.toLowerCase())) {
    //   return item.Price;
    // } else if (
    //   item.Time_Stamp.toLowerCase().includes(search.value.toLowerCase())
    // ) {
    //   return item.Time_Stamp;
    // }
  });
}

useMinedBatchStore().get_mines();
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mines</div>

        <h3>Grade</h3>
        <ul>
          <li v-for="location in Miner.grade">
            <input
              type="checkbox"
              v-model="checked_list"
              v-on:click="filter"
              v-bind:value="location"
            />
            {{ location }}
          </li>
        </ul>
        <span>Checked locations: {{ checked_list }}</span>

        <input
          type="search"
          v-model="search"
          class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Search"
        />
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr class="text-center">
              <th class="px-6 py-4">Batch Id</th>
              <th class="px-6 py-4">Manager Id</th>
              <th class="px-6 py-4">Officer Id</th>
              <th class="px-6 py-4">Mine Id</th>
              <th class="px-6 py-4">Grade</th>
              <th class="px-6 py-4">Fe Percentage</th>
              <th class="px-6 py-4">Type of Ore</th>
              <th class="px-6 py-4">Quantity</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Timestamp</th>
              <th class="px-6 py-4">View</th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr
              :key="mine._id"
              v-for="mine in filterList()"
              class="text-center"
            >
              <td class="px-6 py-4">
                {{ mine.batch_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.manager_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.officer_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.mine_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.grade }}
              </td>
              <td class="px-6 py-4">
                {{ mine.fe_percent }}
              </td>
              <td class="px-6 py-4">
                {{ mine.type_of_ore }}
              </td>
              <td class="px-6 py-4">
                {{ mine.quantity }}
              </td>
              <td class="px-6 py-4">
                {{ mine.status }}
              </td>
              <td class="px-6 py-4">
                {{ mine.time_stamp }}
              </td>
              <td class="px-6 py-4">
                <RouterLink
                  :to="'/dashboard/mines/' + mine._id"
                  class="hover:text-yellow-700"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
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
