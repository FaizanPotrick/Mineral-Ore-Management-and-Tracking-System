<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const suspicious_activities = ref([]);
// const filter_suspicious = ref([]);
// const search = ref("");

const get_suspicious_activity = async () => {
  const { data } = await axios.get("/api/suspicious_activity/officer");
  console.log(data);
  suspicious_activities.value = data;
  // filter_suspicious.value = data;
};

get_suspicious_activity();
// const searchList = () => {
//   const data = filter_batches.value.filter((item) => {
//     if (search.value === "") {
//       return filter_batches.value;
//     } else if (
//       item.type_of_ore.toLowerCase().includes(search.value.toLowerCase())
//     )
//       return true;
//     else if (item.transaction_id.toLowerCase().includes(search.value.toLowerCase()))
//       return true;
//     else if (item.type_of_activity.toLowerCase().includes(search.value.toLowerCase()))
//       return true;
//     else if (item.reason.toLowerCase().includes(search.value.toLowerCase()))
//       return true;
//   });

//   suspicious_activities.value = data;
// };
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div
        class="flex justify-between items-center w-full p-4 rounded-md bg-red-500 text-white"
      >
        <div class="text-3xl font-semibold">Suspicious Activity</div>
        <!-- <div class="hidden sm:block">
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
        </div> -->
      </div>
      <div class="w-full rounded-md overflow-hidden drop-shadow-lg">
        <table class="w-full border-2 border-gray-300">
          <thead class="whitespace-nowrap">
            <tr class="border border-solid border-gray-300">
              <th class="py-4 font-bold">Transaction Id</th>
              <th class="py-4 font-bold">Mine Id</th>
              <th class="py-4 font-bold">Region Id</th>
              <th class="py-4 font-bold">Type Of activity</th>
              <th class="py-4 font-bold">Price Difference</th>
              <th class="py-4 font-bold">Reason</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="transaction._id"
              v-for="transaction in suspicious_activities"
              class="text-center hover:bg-yellow-100/20 cursor-pointer border my-5"
              @click="
                router.push(
                  `/dashboard/suspicious_transcation/${transaction.transaction_id}`
                )
              "
            >
              <td class="py-4">
                {{ transaction.transaction_id }}
              </td>
              <td class="py-4">...{{ transaction._id.slice(15) }}</td>
              <td class="py-4">...{{ transaction.region_id.slice(15) }}</td>
              <td class="py-4 capitalize">
                {{ transaction.type_of_activity }}
              </td>
              <td class="py-4">
                {{ transaction.price_difference }}
              </td>
              <td class="py-4 font-extrabold">
                {{ transaction.reason }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
