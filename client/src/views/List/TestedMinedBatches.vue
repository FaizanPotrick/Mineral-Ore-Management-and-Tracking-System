<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const tested_mined_batches = ref([]);

const get_data = async () => {
  const { data } = await axios.get(
    `/api/mine/tested_mined_batches${
      $cookies.get("type_of_user") === "mine"
        ? ""
        : `?mine_id=${route.params.mine_id}`
    }`
  );
  tested_mined_batches.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Tested Mined Batches</div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Batch Id</th>
              <th class="py-2">Manager Id</th>
              <th class="py-2">Quantity</th>
              <th class="py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="batch._id"
              v-for="batch in tested_mined_batches"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="
                router.push(
                  $cookies.get('type_of_user') !== 'mine'
                    ? `/dashboard/mines/${route.params.mine_id}/tested_mined_batches/${batch._id}`
                    : `/dashboard/tested_mined_batches/${batch._id}`
                )
              "
            >
              <td class="py-2">
                {{ batch._id }}
              </td>
              <td class="py-2">
                {{ batch.manager_id }}
              </td>
              <td class="py-2">
                {{ batch.quantity }}
              </td>
              <td class="py-2">
                {{ moment(batch.createdAt).format("hh:mm A/DD MMM YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
