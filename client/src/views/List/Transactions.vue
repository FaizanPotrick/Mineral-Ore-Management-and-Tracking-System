<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const transactions = ref([]);
const filter_transactions = ref([]);
const search = ref("");
const get_transaction = async () => {
  const { data } = await axios.get(
    `/api/transactions/${route.params.mine_id !== undefined
      ? `officer?mine_id=${route.params.mine_id}`
      : $cookies.get("type_of_user") === "organisation"
        ? "organisation"
        : "miner"
    }`
  );
  transactions.value = data;
  filter_transactions.value = data;
};
get_transaction();

const searchList = () => {
  const data = filter_transactions.value.filter((item) => {
    if (search.value === "") {
      return filter_transactions.value;
    }
    else if (item._id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.manager_id.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.grade.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.type_of_ore.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.status.toLowerCase().includes(search.value.toLowerCase()))
      return true;
    else if (item.fe_percentage.toString().includes(search.value)) return true;
    else if (item.quantity.toString().includes(search.value)) return true;
    else if (item.createdAt.toLowerCase().includes(search.value.toLowerCase()))
      return true;
  });

  transactions.value = data;
};

</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Transactions</div>
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
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="border-b whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-4">Transaction Id</th>
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
            <tr :key="transaction._id" v-for="transaction in transactions"
              class="text-center hover:bg-yellow-100/20 cursor-pointer" @click="
                router.push(
                  $cookies.get('type_of_user') !== 'miner'
                    ? `/dashboard/mines/${route.params.mine_id}/transactions/${transaction._id}`
                    : `/dashboard/transactions/${transaction._id}`
                )
              ">
              <td class="py-4">
                <abbr style="text-decoration: none" :title="transaction._id">
                  ...{{ transaction._id.slice(10) }}
                </abbr>
              </td>
              <td class="py-4">
                {{ transaction.manager_id }}
              </td>
              <td class="py-4 capitalize">
                {{ transaction.grade }}
              </td>
              <td class="py-4">
                {{ transaction.fe_percentage }}
              </td>
              <td class="py-4 capitalize">
                {{ transaction.type_of_ore }}
              </td>
              <td class="py-4">
                {{ transaction.quantity }}
              </td>
              <td class="py-4 capitalize">
                {{ transaction.status }}
              </td>
              <td class="py-4">
                {{
                    moment(transaction.createdAt).format("HH:MM A/DD MMM YYYY")
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
