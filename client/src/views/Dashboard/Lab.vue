<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, onBeforeMount } from "vue";

const route = useRoute();
const router = useRouter();
const logs = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/lab${
      route.params.lab_id === undefined ? "" : `?lab_id=${route.params.lab_id}`
    }`
  );
  logs.value = data;
};

dashboard();
onBeforeMount(() => {
  dashboard();
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold text-start w-full">Lab Logs</div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Batch Id</th>
              <th class="py-2">Grade</th>
              <th class="py-2">Type of Ore</th>
              <th class="py-2">Quantity</th>
              <th class="py-2">Status</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="log._id"
              v-for="log in logs"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="router.push(`/dashboard/mined_batches/${log._id}`)"
            >
              <td class="py-2">
                {{ log._id }}
              </td>
              <td class="py-2 capitalize">
                {{ log.grade }}
              </td>
              <td class="py-2 capitalize">
                {{ log.type_of_ore }}
              </td>
              <td class="py-2">
                {{ log.quantity }}
              </td>
              <td class="py-2 capitalize">
                {{ log.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
