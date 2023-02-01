<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const mines = ref([]);

const get_data = async () => {
  const { data } = await axios.get(
    `/api/government/mines/${$cookies.get("type_of_region")}`
  );
  mines.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Mines</div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Mine Id</th>
              <th class="py-2">Mine Name</th>
              <th class="py-2">Manager Id</th>
              <th class="py-2">Region Id</th>
              <th class="py-2">Lease Expiry</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="mine._id"
              v-for="mine in mines"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="router.push(`/dashboard/mines/${mine._id}`)"
            >
              <td class="py-2">
                {{ mine._id }}
              </td>
              <td class="py-2 capitalize">
                {{ mine.mine_name }}
              </td>
              <td class="py-2">
                {{ mine.manager_id }}
              </td>
              <td class="py-2">
                {{ mine.region_id }}
              </td>
              <td class="py-2">
                {{ mine.lease_period.to }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
