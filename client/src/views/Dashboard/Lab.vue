<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const mined_batches = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/lab${
      route.params.lab_id === undefined ? "" : `?lab_id=${route.params.lab_id}`
    }`
  );
  mined_batches.value = data;
};

dashboard();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Lab Mined Batches</div>
        <input
          type="search"
          class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Search"
        />
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
            <tr
              :key="minedbatch._id"
              v-for="minedbatch in mined_batches"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="router.push(`/dashboard/mined_batches/${minedbatch._id}`)"
            >
              <td class="py-4">
                <abbr style="text-decoration: none" :title="minedbatch._id">
                  ...{{ minedbatch._id.slice(15) }}
                </abbr>
              </td>
              <td class="py-4">
                {{ minedbatch.manager_id.slice(4) }}
              </td>
              <td class="py-4 capitalize">
                {{ minedbatch.grade }}
              </td>
              <td class="py-4">
                {{ minedbatch.fe_percentage }}
              </td>
              <td class="py-4 capitalize">
                {{ minedbatch.type_of_ore }}
              </td>
              <td class="py-4">
                {{ minedbatch.quantity }}
              </td>
              <td class="py-4 capitalize">
                {{ minedbatch.status }}
              </td>
              <td class="py-4">
                {{ moment(minedbatch.createdAt).format("HH:MM A/DD MMM YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
