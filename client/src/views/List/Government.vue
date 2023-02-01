<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const governments = ref([]);

const get_data = async () => {
  const { data } = await axios.get(
    `/api/government/officers/${$cookies.get("type_of_region")}`
  );
  governments.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="flex justify-between items-center w-full">
        <div class="text-2xl font-semibold">Officers</div>
      </div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Region Id</th>
              <th class="py-2">Officer Id</th>
              <th class="py-2">Region Type</th>
              <th class="py-2">State</th>
              <th class="py-2">District</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="officer._id"
              v-for="officer in governments"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="
                router.push(
                  `/dashboard/governments/${officer.type_of_region}/${officer._id}`
                )
              "
            >
              <td class="py-2">{{ officer._id }}</td>
              <td class="py-2">
                {{ officer.officer_id }}
              </td>
              <td class="py-2 capitalize">
                {{ officer.type_of_region }}
              </td>
              <td class="py-2 capitalize">
                {{ officer.state }}
              </td>
              <td class="py-2 capitalize">
                {{
                  officer.type_of_region === "state" ? "-" : officer.district
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
