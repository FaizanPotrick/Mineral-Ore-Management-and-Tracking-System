<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const mined_batches = ref([]);
const filter_batches = ref([]);
const search = ref("");

const get_mined_batches = async () => {
  const { data } = await axios.get(
    `/api/mined_batches/${route.params.mine_id !== undefined
      ? `officer?mine_id=${route.params.mine_id}`
      : $cookies.get("type_of_user") === "officer"
        ? "officer/district"
        : $cookies.get("type_of_user")
    }`
  );
  mined_batches.value = data;
  filter_batches.value = data;
};
get_mined_batches();

const searchList = () => {
  const data = filter_batches.value.filter((item) => {
    if (search.value === "") {
      return filter_batches.value;
    }
    else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.manager_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.quantity.toString().includes(search.value)) return true;
    // else if (item.createdAt.toString().includes(search.value.toLowerCase()))
    //   return true;
  });

  mined_batches.value = data;
};
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mined Batches</div>
        <div class="flex flex-wrap items-center">
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
              <th class="py-4">Quantity</th>
              <th class="py-4">Timestamp</th>
              <th class="py-4"></th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr :key="mined_batch._id" v-for="mined_batch in mined_batches" class="text-center">
              <td class="py-4">
                <abbr style="text-decoration: none" :title="mined_batch._id">
                  {{ mined_batch._id }}
                </abbr>
              </td>
              <td class="py-4">
                {{ mined_batch.manager_id }}
              </td>

              <td class="py-4">
                {{ mined_batch.quantity }}
              </td>
              <td class="py-4">
                {{
                    moment(mined_batch.createdAt).format("HH:MM A/DD MMM YYYY")
                }}
              </td>
              <td v-if="
              $cookies.get('type_of_user') === 'miner' && mined_batch.status === 'pending'"
                class="py-4 flex justify-center">
                <RouterLink :to="`/dashboard/mined_batches/${mined_batch._id}/testing_mined_batch`"
                  class="hover:text-yellow-700 bg-yellow-300 px-2 py-1 rounded-md shadow-md font-semibold">
                  Form
                </RouterLink>
              </td>
              <td v-else class="py-4 flex justify-center">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
