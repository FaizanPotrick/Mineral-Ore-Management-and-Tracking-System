<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const suspicious = ref([]);

const det_data = async () => {
  const { data } = await axios.get("/api/government/suspicious");
  suspicious.value = data;
};

det_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Suspicious</div>
      <div class="w-full rounded-md overflow-hidden drop-shadow-lg">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-red-500 text-white">
            <tr>
              <th class="py-2">Transaction Id</th>
              <th class="py-2">Mine Id</th>
              <th class="py-2">Type Of activity</th>
              <th class="py-2">Reason</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="transaction._id"
              v-for="transaction in suspicious"
              class="text-center"
              :class="{
                'hover:bg-red-100/20 cursor-pointer':
                  transaction.transaction_id,
              }"
              @click="
                () => {
                  if (transaction.transaction_id) {
                    router.push(
                      `/dashboard/suspicious/${transaction.transaction_id}`
                    );
                  }
                }
              "
            >
              <td class="py-2">
                {{ transaction.transaction_id || "-" }}
              </td>
              <td class="py-2">{{ transaction.mine_id }}</td>
              <td class="py-2 capitalize">
                {{ transaction.type_of_activity }}
              </td>
              <td class="py-2 capitalize">
                {{ transaction.reason }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
