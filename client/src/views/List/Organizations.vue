<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
const organizations = ref([]);

const get_data = async () => {
  const { data } = await axios.get("/api/government/organizations");
  organizations.value = data;
};

get_data();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md"
    >
      <div class="text-2xl font-semibold w-full">Organizations</div>
      <div class="w-full border rounded-xl overflow-hidden drop-shadow-md">
        <table class="w-full">
          <thead class="whitespace-nowrap bg-yellow-400">
            <tr>
              <th class="py-2">Organization Id</th>
              <th class="py-2">Organization Name</th>
              <th class="py-2">CEO Id</th>
              <th class="py-2">GST No</th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <tr
              :key="organization._id"
              v-for="organization in organizations"
              class="text-center hover:bg-yellow-100/20 cursor-pointer"
              @click="
                router.push(`/dashboard/organizations/${organization._id}`)
              "
            >
              <td class="py-2">
                {{ organization._id }}
              </td>
              <td class="py-2 capitalize">
                {{ organization.organization_name }}
              </td>
              <td class="py-2">
                {{ organization.ceo_id }}
              </td>
              <td class="py-2">{{ organization.gst_no }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
