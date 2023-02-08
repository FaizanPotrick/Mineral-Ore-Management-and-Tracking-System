<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, onBeforeMount } from "vue";

const route = useRoute();
const router = useRouter();
const logs = ref([]);

const dashboard = async () => {
  const { data } = await axios.get(
    `/api/dashboard/checkpoint${
      route.params.checkpoint_id === undefined
        ? ""
        : `?checkpoint_id=${route.params.checkpoint_id}`
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
      <div class="text-2xl font-semibold text-start w-full">
        Check Point Logs
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Transaction Id</th>
              <th class="py-2">Grade</th>
              <th class="py-2">Type of Ore</th>
              <th class="py-2">Quantity</th>
              <th class="py-2">Status</th>
              <th
                class="py-2"
                v-if="$cookies.get('type_of_user') === 'checkpoint'"
              ></th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="log._id"
              v-for="log in logs"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              :class="{
                'bg-red-100/20': log.is_suspicious,
              }"
              @click="router.push(`/dashboard/transactions/${log._id}`)"
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
              <td
                class="flex justify-center items-center gap-2 py-2"
                v-if="$cookies.get('type_of_user') === 'checkpoint'"
              >
                <button
                  class="bg-yellow-400 px-2 py-1 rounded-md text-sm hover:scale-105"
                  @click.stop="
                    router.push(`/dashboard/registration/suspicious/${log._id}`)
                  "
                >
                  Suspect
                </button>
                <button
                  class="bg-yellow-400 px-2 py-1 rounded-md text-sm hover:scale-105"
                  @click.stop="
                    async () => {
                      await axios.post(
                        `/api/registration/checkpoint/transaction/lab?transaction_id=${log._id}`
                      );
                    }
                  "
                >
                  Send to Lab
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
