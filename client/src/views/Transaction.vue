<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mined_batch = ref([]);

const mined_batch_fn = async () => {
  const { data } = await axios.get(
    `/api/mined_batch?batch_id=${route.params.batch_id}`
  );
  mined_batch.value = data;
};

mined_batch_fn();
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800"
    >
      <div class="mb-4 text-center">
        <div class="font-semibold text-2xl text-yellow-700">
          Transaction Batch
        </div>
      </div>
      <div class="flex flex-col gap-6 justify-center">
        <div class="max-width-400">
          <img :src="mined_batch.sample_image_url" alt="sample_image" />
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
                        {{ mined_batch._id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Manager Id:</td>

                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.manager_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">CEO Id:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.officer_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Buyer_Organization_ID:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.mine_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Type of Ore:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.grade }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Fe Percentage:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.fe_percentage }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Quantity:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.type_of_ore }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Grade:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.quantity }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Price:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.status }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">Status:</td>
                      <td class="px-6 py-4 font-bold">
                        {{ mined_batch.createdAt }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
