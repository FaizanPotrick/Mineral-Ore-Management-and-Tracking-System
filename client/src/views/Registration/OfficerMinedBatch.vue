<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAlertStore from "@/stores/Alert";

const { open_alert_box } = useAlertStore();
const route = useRoute();
const router = useRouter();
const minded_batch = ref([]);
const approve_mined_batch = ref({
  status: "",
  gov_lab_report: {},
});
const loading = ref(false);

const store_document = (event) => {
  approve_mined_batch.value.gov_lab_report = event.target.files[0];
};

const register_fn = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append("gov_lab_report", approve_mined_batch.value.gov_lab_report);
  formData.append("status", approve_mined_batch.value.status);

  await axios({
    method: "post",
    url: `/api/registration/approve_mined_batch?batch_id=${route.params.batch_id}`,
    data: formData,
  })
    .then((res) => {
      open_alert_box(res.data.message, res.data.type);
      if (res.status === 200) {
        approve_mined_batch.value = {
          status: "",
          gov_lab_report: {},
        };
      }
      router.push("/dashboard/mined_batches");
    })
    .catch((err) => {
      open_alert_box(err.response.data.message, err.response.data.type);
    });
  loading.value = false;
};

const get_mined_batch = async () => {
  const { data } = await axios.get(
    `/api/mined_batch?batch_id=${route.params.batch_id}`
  );
  minded_batch.value = data;
};

get_mined_batch();
</script>

<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800"
    >
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">
          Mined Batch Details
        </div>
      </div>
      <div class="flex gap-2 justify-between">
        <div class="flex flex-col p-3">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-[400px] table-auto">
                  <tbody>
                    <tr class="bg-gray-200 border-b">
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        Type of Ore:
                      </td>
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        {{ minded_batch.type_of_ore }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        Grade:
                      </td>
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        {{ minded_batch.grade }}
                      </td>
                    </tr>
                    <tr class="bg-gray-200 border-b">
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        Fe % :
                      </td>
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        {{ minded_batch.fe_percentage }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        Quantity of Ore:
                      </td>
                      <td
                        class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        {{ minded_batch.quantity }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="max-width-400">
          <img :src="minded_batch.sample_image_url" alt="sample_image" />
        </div>
      </div>
      <form class="space-y-5 drop-shadow-md" @submit.prevent="register_fn()">
        <div class="grid gap-6 mb-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-md font-medium text-gray-700">Upload Pdf</label>
            <input
              class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
              @change="store_document"
              type="file"
              accept="application/pdf"
            />
          </div>
        </div>
        <div class="grid gap-6 mb-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-md font-medium text-gray-700">Status*</label>
            <div class="flex gap-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="approved"
                  v-model="approve_mined_batch.status"
                  class="w-4 h-4"
                  required
                />
                <label class="ml-2 font-medium">Approve</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="rejected"
                  v-model="approve_mined_batch.status"
                  class="w-4 h-4"
                  required
                />
                <label class="ml-2 font-medium">Reject</label>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-3 py-5">
          <button
            type="submit"
            :class="{
              'hover:bg-yellow-600/80': !loading,
            }"
            class="w-full flex text-lg justify-center items-center bg-yellow-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md"
            :disabled="loading"
          >
            <span v-if="!loading" class="h-6"> Submit </span>
            <span v-else>
              <svg
                class="w-6 h-6 animate-spin text-yellow-600 fill-white"
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
input[type="file"]::-webkit-file-upload-button,
input[type="file"]::file-selector-button {
  @apply bg-yellow-600 text-white font-medium border-0 py-2 pl-4 pr-4 mr-4;
}
</style>
