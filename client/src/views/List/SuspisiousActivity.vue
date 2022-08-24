<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const router = useRouter();
const suspisious_activities = ref([]);

const get_suspisious_activity = async () => {
  const { data } = await axios.get(
    '/api/suspicious_activity/officer'
  );
  console.log(data)
  suspisious_activities.value = data;
};

get_suspisious_activity();
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <div
      class="w-full flex flex-col justify-center items-center gap-4 p-5 rounded-xl bg-white text-gray-900 drop-shadow-md">
      <div class="flex justify-between items-center w-full">
        <div class="text-3xl font-semibold">Check Point Transations</div>
        <input type="search" class="max-w-sm w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search" />
      </div>
      <div class="w-full overflow-hidden drop-shadow-md">
        <table class="w-full">
          <tbody class="whitespace-nowrap">
            <tr :key="transaction._id" v-for="transaction in suspisious_activities"
              class="text-center hover:bg-yellow-100/20 cursor-pointer border my-5">
              <td class="py-4">
                {{ transaction.transaction_id }}
              </td>
              <td class="py-4 capitalize">
                {{ transaction.type_of_activity }}
              </td>
              <td class="py-4">
                {{ transaction.reason }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
