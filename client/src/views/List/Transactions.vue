<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const transactions = ref([]);

const get_data = async () => {
  const { data } = await axios.get(
    `/api/mine/transactions/${
      $cookies.get("type_of_user") === "government"
        ? `?mine_id=${route.params.mine_id}`
        : ""
    }`
  );
  transactions.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Transactions</div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Transaction Id</th>
              <th class="py-2">Manager Id</th>
              <th class="py-2">Grade</th>
              <th class="py-2">Type of Ore</th>
              <th class="py-2">Quantity</th>
              <th class="py-2">Status</th>
              <th class="py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="transaction._id"
              v-for="transaction in transactions"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="
                router.push(
                  $cookies.get('type_of_user') !== 'mine'
                    ? `/dashboard/mines/${route.params.mine_id}/transactions/${transaction._id}`
                    : `/dashboard/transactions/${transaction._id}`
                )
              "
            >
              <td class="py-2">
                {{ transaction._id }}
              </td>
              <td class="py-2">
                {{ transaction.manager_id }}
              </td>
              <td class="py-2 capitalize">
                {{ transaction.grade }}
              </td>

              <td class="py-2 capitalize">
                {{ transaction.type_of_ore }}
              </td>
              <td class="py-2">
                {{ transaction.quantity }}
              </td>
              <td class="py-2 capitalize">
                {{ transaction.status }}
              </td>
              <td class="py-2">
                {{
                  moment(transaction.createdAt).format("hh:mm A/DD MMM YYYY")
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
