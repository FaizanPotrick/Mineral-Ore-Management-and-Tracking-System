<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const transactions = ref([]);
const get_transaction = async () => {
  const { data } = await axios.get(
    `/api/transactions${
      route.params.mine_id !== undefined
        ? `?mine_id=${route.params.mine_id}`
        : $cookies.get("type_of_user") === "organisation"
        ? "/organisation"
        : "/miner"
    }`
  );
  transactions.value = data;
};
get_transaction();
</script>
<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Transations</div>
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
              <th class="px-2 py-4">Transaction Id</th>
              <th
                class="px-2 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                Manager Id
              </th>
              <th class="px-2 py-4">Grade</th>
              <th class="px-2 py-4">Fe Percentage</th>
              <th class="px-2 py-4">Type of Ore</th>
              <th class="px-2 py-4">Quantity</th>
              <th class="px-2 py-4">Status</th>
              <th class="px-2 py-4">Timestamp</th>
              <th
                v-if="
                  $cookies.get('type_of_user') === 'organisation' &&
                  route.params.mine_id === undefined
                "
                class="px-2 py-4"
              >
                Form
              </th>
              <th v-else class="px-2 py-4"></th>
            </tr>
          </thead>
          <tbody class="font-normal text-gray-600 whitespace-nowrap">
            <tr
              :key="mine._id"
              v-for="mine in transactions"
              class="text-center"
            >
              <td class="px-2 py-4">
                <abbr style="text-decoration:none" :title="mine._id">
                ...{{ mine._id.slice(19) }}
                </abbr>
              </td>
              <td
                class="px-2 py-4"
                v-if="$cookies.get('type_of_user') === 'officer'"
              >
                {{ mine.manager_id }}
              </td>
              <td class="px-2 py-4">
                {{ mine.grade }}
              </td>
              <td class="px-2 py-4">
                {{ mine.fe_percentage }}
              </td>
              <td class="px-2 py-4">
                {{ mine.type_of_ore }}
              </td>
              <td class="px-2 py-4">
                {{ mine.quantity }}
              </td>
              <td class="px-2 py-4">
                {{ mine.status }}
              </td>
              <td class="px-2 py-4">
                {{ mine.createdAt.slice(-12,-5) }}
              </td>
              <td
                v-if="
                  $cookies.get('type_of_user') === 'officer' &&
                  route.params.mine_id === undefined
                "
                class="px-2 py-4"
              >
                <RouterLink
                  :to="
                    '/dashboard/transactions/' +
                    mine._id +
                    '/approve_transaction'
                  "
                  class="hover:text-yellow-700"
                >
                  <!-- <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg> -->
                </RouterLink>
              </td>
              <td v-else class="px-2 py-4">
                <RouterLink
                  :to="
                    $cookies.get('type_of_user') !== 'miner'
                      ? '/dashboard/mines/' +
                        route.params.mine_id +
                        '/transactions/' +
                        mine._id
                      : '/dashboard/transactions/' + mine._id
                  "
                  class="hover:text-yellow-700"
                >
                  <!-- <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    ></path>
                  </svg> -->
                   <button
                    type="button"
                    class="inline-block px-4 py-2  border-2 bg-blue-600 hover:bg-blue-800 text-white font-medium text-xs leading-normal uppercase rounded-lg"
                  >
                    View
                  </button>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
