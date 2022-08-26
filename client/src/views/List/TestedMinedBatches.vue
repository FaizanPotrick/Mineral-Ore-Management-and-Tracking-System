<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const tested_mined_batches = ref([]);
const filter_batches = ref([]);
const search = ref("");
const status = ["delivered", "dispatched", "holding", "approving"];
const grade = ["low", "medium", "high"];
const type_of_ore = ["fine", "lump", "iron_pellets"];
const checked_list = ref([]);

const get_mined_batches = async () => {
  const { data } = await axios.get(
    '/api/tested_mined_batches/miner'
  );
  tested_mined_batches.value = data;
  filter_batches.value = data;
};
get_mined_batches();

const filterList = () => {
  const data = filter_batches.value.filter((item) => {
    if (!checked_list.value.length) return filter_batches.value;
    if (
      item.status.includes(checked_list.value) ||
      item.grade.includes(checked_list.value) ||
      item.type_of_ore.includes(checked_list.value)
    )
      return true;
  });
  tested_mined_batches.value = data;
};

const searchList = () => {
  const data = filter_batches.value.filter((item) => {
    if (search.value === "") {
      return filter_batches.value;
    }
    else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (
      item.type_of_ore.toLowerCase().includes(search.value.toLowerCase())
    )
      return true;
    else if (item.manager_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.grade.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.status.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.fe_percentage.toString().includes(search.value)) return true;
    else if (item.quantity.toString().includes(search.value)) return true;
    else if (item.createdAt.toLowerCase().includes(search.value.toLowerCase()))
      return true;
  });

  tested_mined_batches.value = data;
};

</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mined Batches</div>
        <div class="flex flex-wrap items-center">
          <div class="hidden flex-wrap items-center lg:flex md:flex">
            <div class="px-3">
              <h3 class="mb-1 mt-8 font-semibold text-gray-900">Status</h3>
              <ul class="w-42 text-sm font-medium text-gray-900 bg-white">
                <li v-for="status in status" class="w-full rounded-t-lg">
                  <div class="flex justify-center items-center">
                    <input type="radio" v-model="checked_list" v-bind:value="status" @keyup.enter="filterList()"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label class="py-1 ml-2 w-full text-sm font-medium text-gray-900">{{ status }}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div class="px-3">
              <h3 class="mb-1 font-semibold text-gray-900">Grade</h3>
              <ul class="w-35 text-sm font-medium text-gray-900 bg-white">
                <li v-for="grade in grade" class="w-full rounded-t-lg">
                  <div class="flex items-center">
                    <input type="radio" v-model="checked_list" v-bind:value="grade" @keyup.enter="filterList()"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label class="py-1 ml-2 w-full text-sm font-medium text-gray-900">{{ grade }}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div class="px-3">
              <h3 class="mb-1 font-semibold text-gray-900">Type of Ore</h3>
              <ul class="w-35 text-sm font-medium text-gray-900 bg-white">
                <li v-for="type_of_ore in type_of_ore" class="w-full rounded-t-lg">
                  <div class="flex items-center">
                    <input type="radio" v-model="checked_list" v-bind:value="type_of_ore" @keyup.enter="filterList()"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label class="py-1 ml-2 w-full text-sm font-medium text-gray-900">{{ type_of_ore }}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <button type="submit" @click="filterList()"
                class="text-white mx-2 bg-yellow-500 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2">
                Filter
              </button>
            </div>
          </div>
          <div class="hidden sm:block">
            <input type="search" class="max-w-sm w-8vw px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search"
              v-model="search" @keyup.enter="searchList()" />
            <button type="submit" @click="searchList()"
              class="absolute top-18 right-5 p-2.5 text-sm font-medium text-white bg-yellow-500 rounded-r-lg border border-yellow-600 hover:bg-orange-400">
              <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-4">Batch Id</th>
              <th class="py-4">Manager Id</th>
              <th class="py-4">Grade</th>
              <th class="py-4">Fe Percentage</th>
              <th class="py-4">Type of Ore</th>
              <th class="py-4">Quantity</th>
              <th class="py-4">Status</th>
              <th class="py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr :key="tested_mined_batch._id" v-for="tested_mined_batch in tested_mined_batches"
              class="text-center hover:bg-yellow-100/20 cursor-pointer" @click="router.push(
                $cookies.get('type_of_user') !== 'miner'
                  ? `/dashboard/mines/${route.params.mine_id}/tested_mined_batches/${tested_mined_batch._id}`
                  : `/dashboard/tested_mined_batches/${tested_mined_batch._id}`
              )">
              <td class="py-4">
                <abbr style="text-decoration: none" :title="tested_mined_batch._id">
                  ...{{ tested_mined_batch._id.slice(10) }}
                </abbr>
              </td>
              <td class="py-4">
                {{ tested_mined_batch.manager_id }}
              </td>
              <td class="py-4 capitalize">
                {{ tested_mined_batch.grade }}
              </td>
              <td class="py-4">
                {{ tested_mined_batch.fe_percentage }}
              </td>
              <td class="py-4 capitalize">
                {{ tested_mined_batch.type_of_ore }}
              </td>
              <td class="py-4">
                {{ tested_mined_batch.quantity }}
              </td>
              <td class="py-4 capitalize">
                {{ tested_mined_batch.status }}
              </td>
              <td class="py-4">
                {{
                    moment(tested_mined_batch.createdAt).format("HH:MM A/DD MMM YYYY")
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
