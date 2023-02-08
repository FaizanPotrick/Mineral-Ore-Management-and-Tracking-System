<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";
import moment from "moment";

const route = useRoute();
const tested_mined_batch = ref([]);

const get_tested_mined_batch = async () => {
  const { data } = await axios.get(
    `/api/mine/tested_mined_batch?batch_id=${route.params.batch_id}`
  );
  tested_mined_batch.value = data;
};

get_tested_mined_batch();

const downloadQRCode = () => {
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
        Tested Mined Batch
      </div>
      <div
        class="flex justify-center"
        v-if="$cookies.get('type_of_user') === 'mine'"
      >
        <QrcodeVue
          :value="
            JSON.stringify({
              batch_id: tested_mined_batch._id,
              batch_hash: tested_mined_batch.batch_hash,
            })
          "
          :size="300"
          level="H"
          :margin="8"
          id="qr_code"
        />
      </div>
      <div class="flex justify-between items-center gap-4">
        <button
          v-if="$cookies.get('type_of_user') === 'mine'"
          class="bg-orange-400 font-semibold py-2 px-4 rounded-lg text-center w-full"
          @click="downloadQRCode"
        >
          Download QR Code
        </button>
        <a
          class="bg-orange-400 font-semibold py-2 px-4 rounded-lg text-center w-full"
          :href="`http://localhost:3000/api/mine/tested_mined_batch/image/${tested_mined_batch._id}`"
          target="_blank"
          >Sample Image</a
        >
      </div>
      <table class="my-5 min-w-full text-gray-900">
        <tbody>
          <tr>
            <td class="mr-6 py-1 font-bold">Batch Id:</td>
            <td class="py-1">
              {{ tested_mined_batch._id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Mine Id:</td>
            <td class="py-1">
              {{ tested_mined_batch.mine_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Manager Id:</td>
            <td class="py-1">
              {{ tested_mined_batch.manager_id }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-1 font-bold">Grade:</td>
            <td class="py-1 capitalize">
              {{ tested_mined_batch.grade }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Fe Percentage:</td>
            <td class="py-2">
              {{ tested_mined_batch.fe_percentage }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Type of Ore:</td>
            <td class="py-1 capitalize">
              {{ tested_mined_batch.type_of_ore }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Quantity:</td>
            <td class="py-1">
              {{ tested_mined_batch.quantity }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Waste:</td>
            <td class="py-1">
              {{ tested_mined_batch.waste }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Status:</td>
            <td class="py-1 capitalize">
              {{ tested_mined_batch.status }}
            </td>
          </tr>
          <tr>
            <td class="mr-6 py-2 font-bold">Timestamp:</td>
            <td class="py-1">
              {{
                moment(tested_mined_batch.createdAt).format(
                  "DD/MM/YYYY hh:mm A"
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
