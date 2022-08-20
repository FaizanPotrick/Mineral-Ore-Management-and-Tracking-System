<script setup>
import { QrcodeStream } from "vue3-qrcode-reader";
import useAlertStore from "@/stores/Alert";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

const { open_alert_box } = useAlertStore();
const router = useRouter();
const errors = ref("");
const transaction = ref([]);
const status = ref("");
const loading = ref(false);

const onInit = async (promise) => {
  try {
    await promise;
  } catch (error) {
    errors.value = error.name;
  }
};
const onDecode = async (result) => {
  const resultParse = JSON.parse(result);
  const { status, data } = await axios.get(
    `/api/transaction/verify?transaction_id=${resultParse.transaction_id}&transaction_hash=${resultParse.transaction_hash}`
  );
  if (status === 200) {
    transaction.value = data;
  } else {
    open_alert_box(data.message, data.type);
  }
};

const register_fn = async () => {
  loading.value = true;
  await axios({
    method: "post",
    url: `/api/transaction/${
      $cookies.get("type_of_user") === "organisation"
        ? "organisation"
        : "checkpoint"
    }?transaction_id=${transaction.value._id}`,
    data: {
      status: status.value,
    },
  })
    .then((res) => {
      open_alert_box(res.data.message, res.data.type);
      if (res.status === 200) {
        status.value = "";
      }
      router.push("/dashboard");
    })
    .catch((err) => {
      open_alert_box(err.response.data.message, err.response.data.type);
    });
  loading.value = false;
};
</script>
<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-xl w-full p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl m-5 sm:10 text-gray-800"
    >
      <div class="mb-4">
        <div class="font-semibold text-2xl text-yellow-700">
          Scan the QR Code
        </div>
        <div class="text-gray-500 text-sm">Transactions</div>
      </div>
      <div class="my-6">
        {{ errors }}
      </div>
      <QrcodeStream @decode="onDecode" @init="onInit" />

      <div class="flex flex-col mt-6">
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
      <form class="space-y-5 drop-shadow-md" @submit.prevent="register_fn()">
        <div class="grid gap-6 mb-6 grid-cols-1">
          <div class="space-y-2">
            <label class="text-md font-medium text-gray-700">Status*</label>
            <div class="flex gap-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="delivered"
                  v-model="status"
                  class="w-4 h-4"
                  required
                />
                <label class="ml-2 font-medium">Approve</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="cancelled"
                  v-model="status"
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
<style></style>
