<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const suspicious = ref([]);

const get_suspicious = async () => {
  const { data } = await axios.get(
    `/api/transaction/suspicious?transaction_id=${route.params.transaction_id}`
  );
  suspicious.value = data;
};

get_suspicious();
</script>

<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-lg w-full p-10 bg-white border shadow-md rounded-2xl text-gray-800 m-5 sm:m-10"
    >
      <div class="font-semibold text-2xl text-yellow-700 w-full text-center">
        Suspicious
      </div>
      <table
        :key="sus._id"
        v-for="sus in suspicious"
        class="my-5 min-w-full text-gray-900"
      >
        <tbody>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">
              Transaction Id:
            </td>
            <td class="py-1">
              {{ sus.transaction_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">Mine Id:</td>
            <td class="py-1">
              {{ sus.mine_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">Region Id:</td>
            <td class="py-1">
              {{ sus.region_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">
              Type of Activity:
            </td>
            <td class="py-1 capitalize">
              {{ sus.type_of_activity }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">
              Price Difference:
            </td>
            <td class="py-1">
              {{ sus.price_difference }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">Reason:</td>
            <td class="py-1 capitalize">
              {{ sus.reason }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold whitespace-nowrap">Timestamp:</td>
            <td class="py-1">
              {{ moment(sus.createdAt).format("DD/MM/YYYY hh:mm A") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
