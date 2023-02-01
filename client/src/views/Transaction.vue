<script setup>
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";
import axios from "axios";
import { ref } from "vue";
import moment from "moment";

const route = useRoute();
const transaction = ref([]);

const get_transaction = async () => {
  const { data } = await axios.get(
    `/api/mine/transaction?transaction_id=${route.params.transaction_id}`
  );
  transaction.value = data;
};

get_transaction();

const downloadQRCode = async () => {
  await axios.get(
    `/api/registration/government/transaction?transaction_id=${route.params.transaction_id}`
  );
  const qrcode = document.getElementById("qr_code");
  const downloadLink = document.createElement("a");
  downloadLink.href = qrcode
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  downloadLink.download = "qrcode.png";
  downloadLink.click();
};
</script>

<template>
  <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
    <div
      class="max-w-lg w-full p-10 bg-white border shadow-md rounded-2xl text-gray-800 m-5 sm:m-10"
    >
      <div class="font-semibold text-2xl text-yellow-700 w-full text-center">
        Transaction
      </div>
      <div
        class="flex justify-center"
        v-if="$cookies.get('type_of_user') === 'government'"
      >
        <QrcodeVue
          :value="
            JSON.stringify({
              transaction_id: transaction._id,
              transaction_hash: transaction.transaction_hash,
            })
          "
          :size="300"
          level="H"
          :margin="8"
          id="qr_code"
        />
      </div>
      <button
        v-if="$cookies.get('type_of_user') === 'government'"
        class="bg-orange-400 font-semibold py-2 px-4 rounded-lg text-center w-full"
        @click="downloadQRCode"
      >
        Download QR Code
      </button>
      <table class="my-5 min-w-full text-gray-900">
        <tbody>
          <tr>
            <td class="mr-6 py-1 font-bold">Transaction Id:</td>
            <td class="py-1">
              {{ transaction._id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Mine Name:</td>
            <td class="py-1 capitalize">
              {{ transaction.mine_name }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Manager Id:</td>
            <td class="py-1">
              {{ transaction.manager_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">CEO Id:</td>
            <td class="py-1">
              {{ transaction.ceo_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Organization Name:</td>
            <td class="py-1 capitalize">
              {{ transaction.buyer_org_name }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Type of Ore:</td>
            <td class="py-1 capitalize">
              {{ transaction.type_of_ore }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Quantity:</td>
            <td class="py-1">
              {{ transaction.quantity }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Grade:</td>
            <td class="py-1 capitalize">
              {{ transaction.grade }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Price:</td>
            <td class="py-1">
              {{ transaction.price }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Royalty:</td>
            <td class="py-1">
              {{ transaction.royalty }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Vehicle No:</td>
            <td class="py-1 uppercase">
              {{ transaction.vehicle_no }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Status:</td>
            <td class="py-1 capitalize">
              {{ transaction.status }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Dispatched from Mine:</td>
            <td class="py-1">
              {{ moment(transaction.createdAt).format("DD/MM/YYYY hh:mm A") }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Last Location:</td>
            <td class="py-1">
              {{ moment(transaction.updatedAt).format("DD/MM/YYYY hh:mm A") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
