<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const checkpoints = ref([]);

const get_data = async () => {
  const { data } = await axios.get(
    `/api/government/checkpoints/${$cookies.get("type_of_region")}`
  );
  checkpoints.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Check Points</div>

      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">CheckPoint Id</th>
              <th class="py-2">Officer Id</th>
              <th class="py-2">Region Id</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="checkpoint._id"
              v-for="checkpoint in checkpoints"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="router.push(`/dashboard/checkpoints/${checkpoint._id}`)"
            >
              <td class="py-2">
                {{ checkpoint._id }}
              </td>
              <td class="py-2">
                {{ checkpoint.officer_id }}
              </td>
              <td class="py-2">
                {{ checkpoint.region_id }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
