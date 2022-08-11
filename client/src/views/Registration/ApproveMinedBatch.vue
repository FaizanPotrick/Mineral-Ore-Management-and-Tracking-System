<script setup>
// import useOrganizationStore from "@/stores/Registration/OrganizationStore";
// import useAlertStore from "@/stores/Alert";
// import useValidationStore from "@/stores/Validation";

// const {
//     organization_name,
//     address,
//     ceo_name,
//     ceo_email_address,
//     ceo_phone_no,
//     ceo_aadhar_card,
//     gst_no,
//     register_fn,
// } = useOrganizationStore();
</script>
<template>
    <div class="flex justify-center items-center min-h-[86vh] bg-yellow-50">
        <div class="max-w-5xl p-10 bg-white border border-gray-400/20 shadow-md rounded-2xl sm:10 text-gray-800">
            <div class="mb-4">
                <div class="font-semibold text-2xl text-yellow-700">
                    Officer Checking
                </div>
                <div class="text-gray-500 text-md">Miner details.</div>

            </div>
            <div class="flex flex-wrap gap-6 justify-between">
                <div class="flex flex-col p-3">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-[400px] table-auto">
                                    <thead class="bg-white border-b">
                                        <!-- <tr>
                                        <th scope="col" class="text-md font-semibold text-gray-900 px-6 py-4 text-left">
                                            Details
                                        </th>
                                        <th scope="col" class="text-md font-semibold text-gray-900 px-6 py-4 text-left">

                                        </th>
                                    </tr> -->
                                    </thead>
                                    <tbody>
                                        <tr class="bg-gray-200 border-b">
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Type of Ore:
                                            </td>
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Fine
                                            </td>

                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Grade:
                                            </td>
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Medium
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-200 border-b">
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Fe % :
                                            </td>
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                70
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b">
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Quantity of Ore:
                                            </td>
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                100 tonn.
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-200 border-b">
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Status:
                                            </td>
                                            <td class="text-md text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                Pending
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-width-400">
                    <h3 class="font-medium text-black ">Sample image</h3>
                    <img src="https://www.mining-journal.com/w-images/f7275431-73cc-4a9f-aeb8-d55f198e98bb/3/IronOreSamples-450x400.jpg"
                        alt="sample_image">
                </div>

            </div>


            <form class="space-y-5 drop-shadow-md">
                <div class="grid gap-6 mb-6 grid-cols-1">
                    <div class="space-y-2">
                        <label class="text-md font-medium text-gray-700">Upload
                            Pdf*</label>
                        <input
                            class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                            @change="oresStore.preview_document" type="file" accept="application/pdf" required>
                    </div>
                </div>

                <div class="grid gap-6 mb-6 grid-cols-2">
                    <div class="space-y-3">
                        <button type="submit"
                            class=" w-full flex text-lg justify-center items-center bg-green-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md">
                            <span class="h-6">
                                Approve
                            </span>
                        </button>
                    </div>
                    <div class="space-y-3">
                        <button type="submit"
                            class="w-full flex text-lg justify-center items-center bg-red-600 text-gray-100 p-2.5 rounded-full font-semibold shadow-md">
                            <span class="h-6">
                                Disapprove
                            </span>

                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>
<style>
input[type=file]::-webkit-file-upload-button,
input[type=file]::file-selector-button {
    @apply bg-yellow-600 text-white font-medium border-0 py-2 pl-4 pr-4 mr-4;
}
</style>