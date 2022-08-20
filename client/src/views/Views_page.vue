<script setup>
import Miner from "../stores/Json_files/miner.json";

console.log(Miner);
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
      <div class="flex flex-col gap-6 justify-center">
        <div class="max-width-400">
          <img
            src="https://www.mining-journal.com/w-images/f7275431-73cc-4a9f-aeb8-d55f198e98bb/3/IronOreSamples-500x300.jpg"
            alt="sample_image" />
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-gray-900 font-base">
                  <tbody>
                    <tr class="border-b">
                      <td class=" text-gray-900 font-base px-6 py-4">
                        Batch Id:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].batch_id }}
                      </td>

                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4">
                        Manager Id:
                      </td>

                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].manager_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Officer Id:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].officer_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Mine Id:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].mine_id }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Grade:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].grade }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Fe Percentage:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].fe_percent }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Type of Ore:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].type_of_ore }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Quantity:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].quantity }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Status:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].status }}
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 ">
                        Timestamp:
                      </td>
                      <td class="px-6 py-4 font-bold">
                        {{ Miner[0].time_stamp }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="bg-orange-600 hover:bg-grey text- font-bold py-2 px-4 rounded inline-flex items-center mx-5">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download</span>
      </button>
    </div>

    <!-- <form class="space-y-5 drop-shadow-md">
                <div class="grid gap-6 mb-6 grid-cols-1">
                    <div class="space-y-2">
                        <label class="text-md font-medium text-gray-700">Upload
                            Pdf*</label>
                        <input
                            class="w-full content-center text-base border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-600"
                            @change="oresStore.preview_document" type="file" accept="application/pdf" required>
                    </div>
                </div>
            </form> -->
  </div>
</template>
