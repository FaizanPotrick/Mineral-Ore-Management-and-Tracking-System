<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const transaction = ref([]);

const transaction_fn = async () => {
  const { data } = await axios.get(
    `/api/transaction?transaction_id=${route.params.transaction_id}`
  );
  transaction.value = data;
};

transaction_fn();
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800"
    >
      <div class="mb-4 text-center">
        <div class="font-semibold text-2xl text-yellow-700">Transaction</div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <div class="max-width-400">
          <!-- <img :src="transaction.sample_image_url" alt="sample_image" /> -->
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-gray-900 font-base">
                  <tbody>
                    <tr class="border-b">
                      <td class="text-gray-900 font-base px-6 py-4">
                        Transcation Id:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction._id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Manager Id:</td>

                      <td class="px-6 py-4 font-bold">
                        {{ transaction.manager_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">CEO Id:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.ceo_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Buyer_Organization_ID:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.mine_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Type of Ore:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.grade }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Fe Percentage:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.fe_percentage }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Quantity:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.type_of_ore }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Grade:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.quantity }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Price:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.status }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Status:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ transaction.createdAt }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        class="bg-orange-600 hover:bg-grey text- font-bold py-2 px-4 rounded inline-flex items-center mx-5"
        :href="transaction.invoice_url"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </a>
    </div>
  </div>
</template>
