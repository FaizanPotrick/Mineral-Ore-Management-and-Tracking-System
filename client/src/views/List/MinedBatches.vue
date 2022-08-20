<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const minded_batches = ref([]);

const get_mined_batches = async () => {
  const { data } = await axios.get(
    `/api/mined_batches/${
      route.params.mine_id !== undefined
        ? `officer?mine_id=${route.params.mine_id}`
        : $cookies.get("type_of_user") === "officer"
        ? "officer/district"
        : $cookies.get("type_of_user")
    }`
  );
  minded_batches.value = data;
};

get_mined_batches();
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Mined Batches</div>
        <input
          type="search"
          class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Search"
        />
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr class="text-center">
              <th class="px-6 py-4">Batch Id</th>
              <th
                class="px-6 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                Manager Id
              </th>
              <th class="px-6 py-4">Grade</th>
              <th class="px-6 py-4">Fe Percentage</th>
              <th class="px-6 py-4">Type of Ore</th>
              <th class="px-6 py-4">Quantity</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Timestamp</th>
              <th
                v-if="
                  $cookies.get('type_of_user') === 'officer' &&
                  route.params.mine_id === undefined
                "
                class="px-6 py-4"
              >
                Form
              </th>
              <th v-else class="px-6 py-4">View</th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr
              :key="mine._id"
              v-for="mine in minded_batches"
              class="text-center"
            >
              <td class="px-6 py-4">
                {{ mine._id }}
              </td>
              <td
                class="px-6 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                {{ mine.manager_id }}
              </td>
              <td class="px-6 py-4">
                {{ mine.grade }}
              </td>
              <td class="px-6 py-4">
                {{ mine.fe_percentage }}
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
                {{ mine.createdAt }}
              </td>
              <td
                v-if="
                  $cookies.get('type_of_user') === 'officer' &&
                  route.params.mine_id === undefined
                "
                class="px-6 py-4"
              >
                <RouterLink
                  :to="
                    '/dashboard/mined_batches/' +
                    mine._id +
                    '/approve_mined_batch'
                  "
                  class="hover:text-yellow-700"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg>
                </RouterLink>
              </td>
              <td v-else class="px-6 py-4">
                <RouterLink
                  :to="
                    $cookies.get('type_of_user') !== 'miner'
                      ? '/dashboard/mines/' +
                        route.params.mine_id +
                        '/mined_batches/' +
                        mine._id
                      : '/dashboard/mined_batches/' + mine._id
                  "
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
