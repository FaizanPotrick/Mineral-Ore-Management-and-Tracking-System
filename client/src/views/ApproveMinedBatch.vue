<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";
import moment from "moment";

const route = useRoute();
const tested_mined_batch = ref([]);

const transaction_fn = async () => {
    const { data } = await axios.get(
        `/api/tested_mined_batch?tested_mined_batch_id=${route.params.tested_mined_batch_id}`
    );
    tested_mined_batch.value = data;
};

transaction_fn();

const downloadQRCode = () => {
    const qrcode = document.getElementById("qr_code");
    const pngUrl = qrcode
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    //TODO: Addition details for the transaction to be displayed is pending in pdf
};
</script>

<template>
    <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
        <div class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800">
            <div class="mb-4 text-center">
                <div class="font-semibold text-2xl text-yellow-700">Transaction</div>
            </div>
            <div class="flex flex-col gap-6 justify-center">
                <div v-if="$cookies.get('type_of_user') === 'miner'">
                    <div class="flex justify-center">
                        <QrcodeVue :value="
                            JSON.stringify({
                                tested_mined_batch_id: tested_mined_batch._id,
                                tested_mined_batch_hash: tested_mined_batch.tested_mined_batch_hash,
                            })
                        " :size="300" level="H" :margin="10" id="qr_code" />
                    </div>
                    <button class="bg-orange-600 font-bold py-2 px-4 rounded text-center" @click="downloadQRCode">
                        QR Code Link
                    </button>
                </div>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-gray-900 font-base">
                                    <tbody>
                                        <tr class="border-b">
                                            <td class="text-gray-900 font-base px-6 py-4">
                                                Batch Id:
                                            </td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch._id }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Mine Id:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.mine_id }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Manager Id:</td>

                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.manager_id }}
                                            </td>
                                        </tr>

                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Grade:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.grade }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Fe Percentage:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.fe_percentage }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Type of Ore:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.type_of_ore }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Quantity:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.quantity }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Status:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{ tested_mined_batch.status }}
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-4">Timestamp:</td>
                                            <td class="px-6 py-4 font-bold">
                                                {{
                                                        moment(tested_mined_batch.createdAt).format(
                                                            "DD/MM/YYYY hh:mm:ss"
                                                        )
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="bg-orange-600 hover:bg-grey text- font-bold py-2 px-4 rounded inline-flex items-center mx-5"
                :href="tested_mined_batch.mine_lab_report_url">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span>Download</span>
            </a>
        </div>
    </div>
</template>
